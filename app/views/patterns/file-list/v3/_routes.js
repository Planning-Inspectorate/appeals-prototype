const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

//
// HELPERS
//

// Send the user to the task list
function redirectToTaskList(req, res) {
  res.redirect('/patterns/file-list/v3/task-list.html')
}

// If the user came from the manage folder page, send them back there.
// Returns true if a redirect happened, so the caller can stop.
function returnToManageFolder(req, res) {
  const returnTo = req.session.data['returnTo']
  const field = req.session.data['field']

  // Clear the flag so later uploads don't bounce back by mistake
  delete req.session.data['returnTo']

  if (returnTo === 'manage-folder') {
    const query = field ? '?field=' + encodeURIComponent(field) : ''
    res.redirect('/patterns/file-list/v3/manage-folder' + query)
    return true
  }
  return false
}

//
// GLOBAL SETUP FOR EVERY PAGE
//
router.get('*', function (req, res, next) {

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

  // On load, show constraints as in progress unless already completed
  if (data['constraints-completed'] != 'true') {
    data['constraints-started'] = 'true'
  }

  // Constraints is the only section, so the count is 0 or 1
  res.locals.count = data['constraints-completed'] == 'true' ? 1 : 0

  // Make ?field=... available to templates (used by manage-folder)
  res.locals['manageField'] = req.query.field

  next()
})

router.post('/access/enter-code', function (req, res) {
  redirectToTaskList(req, res)
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
  ) {
    req.session.data['constraints-completed'] = 'true'
  }

  next()
})

router.post('/constraints/correct-type-of-appeal-check', function (req, res) {
  res.redirect('listed-building-check')
})

router.post('/constraints/listed-building-check', function (req, res) {
  if (req.session.data['listed-building-check'] == 'Yes') {
    res.redirect('listed-building-details')
  } else {
    res.redirect('affected-listed-building-check')
  }
})

router.post('/constraints/listed-building-details', function (req, res) {
  res.redirect('listed-buildings')
})

router.post('/constraints/listed-buildings', function (req, res) {
  if (req.session.data['listed-buildings'] == 'Yes') {
    res.redirect('listed-building-details?extrabuildings=yes')
  } else {
    res.redirect('affected-listed-building-check')
  }
})

router.post('/constraints/affected-listed-building-check', function (req, res) {
  if (req.session.data['affected-listed-building-check'] == 'Yes') {
    res.redirect('affected-listed-building-details')
  } else {
    res.redirect('scheduled-monument')
  }
})

router.post('/constraints/affected-listed-building-details', function (req, res) {
  res.redirect('affected-listed-buildings')
})

router.post('/constraints/affected-listed-buildings', function (req, res) {
  if (req.session.data['affected-listed-buildings'] == 'Yes') {
    res.redirect('affected-listed-building-details?extrabuildingsaffected=yes')
  } else {
    res.redirect('scheduled-monument')
  }
})

router.post('/constraints/scheduled-monument', function (req, res) {
  res.redirect('conservation-check')
})

router.post('/constraints/conservation-check', function (req, res) {
  if (req.session.data['conservation-check'] == 'Yes') {
    res.redirect('conservation-upload')
  } else {
    res.redirect('protected-species')
  }
})

router.post('/constraints/conservation-upload', function (req, res) {
  const key = 'conservation-upload'
  const existingFiles = req.body[key]
  const existingList = Array.isArray(existingFiles)
    ? existingFiles.filter(Boolean)
    : [existingFiles].filter(Boolean)

  req.session.data[key + '-existing'] = existingList

  const saved = req.session.data[key] || []
  const merged = Array.from(new Set([
    ...(Array.isArray(saved) ? saved : [saved].filter(Boolean)),
    ...existingList
  ]))

  req.session.data[key] = merged

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
    res.redirect('tree-order-upload')
  } else {
    res.redirect('traveller')
  }
})


router.post('/constraints/tree-order-upload', function (req, res) {
  const key = 'tree-order-upload'
  const existingFiles = req.body[key]
  const existingList = Array.isArray(existingFiles)
    ? existingFiles.filter(Boolean)
    : [existingFiles].filter(Boolean)

  req.session.data[key + '-existing'] = existingList

  const saved = req.session.data[key] || []
  const merged = Array.from(new Set([
    ...(Array.isArray(saved) ? saved : [saved].filter(Boolean)),
    ...existingList
  ]))

  req.session.data[key] = merged

  if (returnToManageFolder(req, res)) return
  res.redirect('traveller')
})

router.post('/constraints/traveller', function (req, res) {
  res.redirect('right-of-way-check')
})

router.post('/constraints/right-of-way-check', function (req, res) {
  if (req.session.data['right-of-way-check'] == 'Yes') {
    req.session.data['constraints-completed'] = 'false'
    res.redirect('right-of-way-upload')
  } else {
    res.redirect('complete')
  }
})

router.post('/constraints/right-of-way-upload', function (req, res) {
  const key = 'right-of-way-upload'
  const existingFiles = req.body[key]
  const existingList = Array.isArray(existingFiles)
    ? existingFiles.filter(Boolean)
    : [existingFiles].filter(Boolean)

  req.session.data[key + '-existing'] = existingList

  const saved = req.session.data[key] || []
  const merged = Array.from(new Set([
    ...(Array.isArray(saved) ? saved : [saved].filter(Boolean)),
    ...existingList
  ]))

  req.session.data[key] = merged

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