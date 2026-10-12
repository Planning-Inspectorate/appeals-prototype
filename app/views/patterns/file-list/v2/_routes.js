const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

//
// HELPERS
//

// Where this prototype is mounted
const BASE = '/patterns/file-list/v2'

// If the user came from the manage folder page, send them back there.
// Returns true if a redirect happened, so the caller can stop.
function returnToManageFolder(req, res) {
  const returnTo = req.session.data['returnTo']
  const field = req.session.data['field']

  // Clear the flag so later uploads don't bounce back by mistake
  delete req.session.data['returnTo']

  if (returnTo === 'manage-folder') {
    const query = field ? '?field=' + encodeURIComponent(field) : ''
    res.redirect(BASE + '/manage-folder' + query)
    return true
  }
  return false
}

// Send the user to the task list variant (1, 10 or 11 documents)
// they were last on. Falls back to the 1 document task list.
function redirectToTaskList(req, res) {
  res.redirect(req.session.data['lastTaskList'] || BASE + '/task-list-1.html')
}

router.get('*', function(req, res, next){

  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  // Add return to task list
  res.locals['return'] = true

  req.session.data ||= {}
  const data = req.session.data

  // Upload pages only return to manage folder if the link that got the
  // user there says so (?returnTo=manage-folder&field=...). Otherwise clear
  // any stale flag so the normal journey isn't hijacked.
  if (/-upload(\.html)?$/.test(req.path)) {
    if (req.query.returnTo === 'manage-folder') {
      data['returnTo'] = 'manage-folder'
      if (req.query.field) data['field'] = req.query.field
    } else {
      delete data['returnTo']
    }
  }

  // Use these in templates instead of hard-coded links
  res.locals['taskListUrl'] = data['lastTaskList'] || BASE + '/task-list-1.html'

  next()
})

router.post('/access/enter-code', function (req, res) {
  redirectToTaskList(req, res)
})

//
// TASK LIST (task-list-1, task-list-10, task-list-11)
//
// The bare /task-list page doesn't exist, so send people to the last variant
router.get(/^\/task-list(\.html)?$/, function (req, res) {
  redirectToTaskList(req, res)
})

router.get(/^\/task-list-(1|10|11)(\.html)?$/, function(req, res, next){
  // Clear session data if coming from index page
  if (req.query.clear === 'true') {
    req.session.data = {}
  }

  req.session.data ||= {}
  const data = req.session.data

  // Remember which task list variant the user was last on.
  // Done after the clear so it isn't wiped, and the query string is
  // stripped so ?clear=true isn't stored.
  data['lastTaskList'] = req.originalUrl.split('?')[0]

  // On load, show constraints as in progress unless already completed
  if (data['constraints-completed'] != 'true') {
    data['constraints-started'] = 'true'
  }

  // Constraints is the only section, so the count is 0 or 1
  res.locals.count = data['constraints-completed'] == 'true' ? 1 : 0
  next()
})



//
// CONSTRAINTS
//
router.post('/constraints/:page', function (req, res, next) {
  req.session.data['constraints-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (
    req.session.data['correct-type-of-appeal-check-complete']
    && req.session.data['listed-building-check-complete']
    && req.session.data['affected-listed-building-check-complete']
    && req.session.data['scheduled-monument-complete']
    && req.session.data['conservation-check-complete']
    && req.session.data['protected-species-complete']
    && req.session.data['green-belt-complete']
    && req.session.data['national-landscape-complete']
    && req.session.data['designated-sites-complete']
    && req.session.data['tree-order-check-complete']
    && req.session.data['traveller-complete']
    && req.session.data['right-of-way-check-complete']
  ){
    req.session.data['constraints-completed'] = 'true'
  }

  next()
})

router.post('/constraints/correct-type-of-appeal-check', function (req, res) {
  res.redirect('listed-building-check');
})

router.post('/constraints/listed-building-check', function (req, res) {
  if (req.session.data['listed-building-check'] == 'Yes') {
    res.redirect('listed-building-details');
  } else {
    res.redirect('affected-listed-building-check');
  }
})

router.post('/constraints/listed-building-details', function (req, res) {
  res.redirect('listed-buildings');
})

router.post('/constraints/listed-buildings', function (req, res) {
  if (req.session.data['listed-buildings'] == 'Yes') {
    res.redirect('listed-building-details?extrabuildings=yes');
  } else {
    res.redirect('affected-listed-building-check');
  }
})

router.post('/constraints/affected-listed-building-check', function (req, res) {
  if (req.session.data['affected-listed-building-check'] == 'Yes') {
    res.redirect('affected-listed-building-details');
  } else {
    res.redirect('scheduled-monument');
  }
})

router.post('/constraints/affected-listed-building-details', function (req, res) {
  res.redirect('affected-listed-buildings');
})

router.post('/constraints/affected-listed-buildings', function (req, res) {
  if (req.session.data['affected-listed-buildings'] == 'Yes') {
    res.redirect('affected-listed-building-details?extrabuildingsaffected=yes');
  } else {
    res.redirect('scheduled-monument')
  }
})

router.post('/constraints/scheduled-monument', function (req, res) {
  res.redirect('conservation-check')
})

router.post('/constraints/conservation-check', function (req, res) {
  if (req.session.data['conservation-check'] == 'Yes') {
    res.redirect('conservation-upload');
  } else {
    res.redirect('protected-species');
  }
})

router.post('/constraints/conservation-upload', function (req, res) {
  if (returnToManageFolder(req, res)) return
  res.redirect('protected-species')
})

router.post('/constraints/protected-species', function (req, res) {
  res.redirect('green-belt')
})

router.post('/constraints/green-belt', function (req, res) {
  res.redirect('national-landscape')
})

router.post('/constraints/national-landscape', function (req, res) {
  res.redirect('designated-sites')
})

router.post('/constraints/designated-sites', function (req, res) {
  res.redirect('tree-order-check')
})

router.post('/constraints/tree-order-check', function (req, res) {
  if (req.session.data['tree-order-check'] == 'Yes') {
    res.redirect('tree-order-upload');
  } else {
    res.redirect('traveller');
  }
})

router.post('/constraints/tree-order-upload', function (req, res) {
  if (returnToManageFolder(req, res)) return
  res.redirect('traveller')
})

router.post('/constraints/traveller', function (req, res) {
  res.redirect('right-of-way-check')
})

router.post('/constraints/right-of-way-check', function (req, res) {
  if (req.session.data['right-of-way-check'] == 'Yes') {
    req.session.data['constraints-completed'] = 'false'
    res.redirect('right-of-way-upload');
  } else {
    res.redirect('complete');
  }
})

router.post('/constraints/right-of-way-upload', function (req, res) {
  if (returnToManageFolder(req, res)) return
  res.redirect('complete')
})

// Constraints is the only section, so finishing it goes back to the task list
router.get('/constraints/complete', function (req, res) {
  redirectToTaskList(req, res)
})

//
// SAVE AND RETURN
//
router.get('/save-and-return/', function (req, res) {
  if (req.session.data['applicant-email']) {
    req.session.data['save-email'] = req.session.data['applicant-email']
  } else {
    req.session.data['save-email'] = 'email@example.com'
  }

  if (req.session.data['save-email-confirmed']) {
    res.redirect('saved')
  } else {
    res.redirect('confirm')
  }
})


// Add your routes above the module.exports line
module.exports = router