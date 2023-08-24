const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// SETTING UP
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.get('*', function(req, res, next){

  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  // Add return to task list
  res.locals['return'] = true

  next()
})

router.post('*', function(req, res, next){
  if (req.session.data['cya']) {
    delete req.session.data['cya']
    res.redirect('../task-list');
  } else {
    next()
  }
})

router.get('/task-list', function(req, res, next){
  let count = 0
  if (req.session.data['constraints-completed'] == 'true') { count++ }
  if (req.session.data['notified-completed'] == 'true') { count++ }
  if (req.session.data['consultation-completed'] == 'true') { count++ }
  if (req.session.data['po-report-completed'] == 'true') { count++ }
  if (req.session.data['site-access-completed'] == 'true') { count++ }
  if (req.session.data['appeal-process-completed'] == 'true') { count++ }

  res.locals.count = count
  next()
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// CONSTRAINTS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// router.post('/constraints/:page', function (req, res, next) {
//   req.session.data['constraints-started'] = 'true'
//   req.session.data[`${req.params.page}-complete`] = 'true'
//
//   if (
//     req.session.data['listed-building-check-complete']
//     && req.session.data['affected-listed-building-check-complete']
//     && req.session.data['scheduled-monument-complete']
//     && req.session.data['conservation-check-complete']
//     && req.session.data['protected-species-complete']
//     && req.session.data['green-belt-complete']
//     && req.session.data['outstanding-natural-beauty-complete']
//     && req.session.data['designated-sites-complete']
//     && req.session.data['tree-order-check-complete']
//     && req.session.data['traveller-complete']
//     && req.session.data['right-of-way-check-complete']
//   ){
//     req.session.data['constraints-completed'] = 'true'
//   }
//
//   next()
// })

router.post('/constraints/appropriate', function (req, res) {
  req.session.data['appropriate-complete'] = 'true'
  req.session.data['constraints-started'] = 'true'
  res.redirect('affected-listed-building-check')
})

router.post('/constraints/affected-listed-building-check', function (req, res) {
  req.session.data['affected-listed-building-check-complete'] = 'true'
  if (req.session.data['affected-listed-building-check'] == 'Yes') {
    res.redirect('affected-listed-building-details');
  } else {
    res.redirect('conservation-check')
  }
})

router.post('/constraints/affected-listed-building-details', function (req, res) {
  res.redirect('affected-listed-buildings?listed-building=yes')
})

router.post('/constraints/affected-listed-buildings', function (req, res) {
  req.session.data['affected-listed-buildings-complete'] = 'true'
  if (req.session.data['affected-listed-buildings'] == 'Yes') {
    res.redirect('affected-listed-building-details?extrabuildingsaffected=yes');
  } else {
    res.redirect('conservation-check')
  }
})

router.post('/constraints/conservation-check', function (req, res) {
  req.session.data['conservation-check-complete'] = 'true'
  if (req.session.data['conservation-check'] == 'Yes') {
    res.redirect('conservation-upload');
  } else {
    res.redirect('green-belt')
  }
})

router.post('/constraints/conservation-upload', function (req, res) {
  req.session.data['conservation-upload-complete'] = 'true'
  res.redirect('green-belt')
})

// Final question in this section
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
router.post('/constraints/green-belt', function (req, res) {

  // Mark all constraints answers as complete
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

  // Is the appeal appropriate
  // ░░░░░░░░░░░░░░░░░░░░░░░░░
  req.session.data['appropriate-complete'] = 'true'

  // Listed buildings
  // ░░░░░░░░░░░░░░░░
  req.session.data['affected-listed-building-check-complete'] = 'true'
  if (req.session.data['affected-listed-building-check'] == 'Yes') {
    req.session.data['affected-listed-buildings-complete'] = 'true'
  }

  // Conservation check
  // ░░░░░░░░░░░░░░░░░░
  req.session.data['conservation-check-complete'] = 'true'
  if (req.session.data['conservation-check'] == 'Yes') {
    req.session.data['conservation-upload-complete'] = 'true'
  }

  // Green belt
  // ░░░░░░░░░░
  req.session.data['green-belt-complete'] = 'true'

  // Mark the constraints section as complete
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  req.session.data['constraints-completed'] = 'true'

  // Next stection
  // ░░░░░░░░░░░░░
  res.redirect('../notified/notified-who')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// NOTIFIED PEOPLE
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/notified/notified-who', function (req, res) {
  req.session.data['notified-started'] = 'true'
  req.session.data['notified-who-complete'] = 'true'

  res.redirect('../notified/site-notice-check')
})

router.post('/notified/site-notice-check', function (req, res) {

  req.session.data['site-notice-check-complete'] = 'true'

  if (req.session.data['site-notice-check'] == 'Yes') {
    res.redirect('site-notice-upload');
  } else {
    res.redirect('letters-check')
  }
})

router.post('/notified/site-notice-upload', function (req, res) {

  req.session.data['site-notice-uploaded'] = 'true'

  // checkbox routing
  res.redirect('letters-check')

})

router.post('/notified/letters-check', function (req, res) {

  req.session.data['letters-check-complete'] = 'true'

  if (req.session.data['letters-check'] == 'Yes') {
    res.redirect('letters-upload');
  } else {
    res.redirect('press-advert-check')
  }
})

router.post('/notified/letters-upload', function (req, res) {

  req.session.data['letters-uploaded'] = 'true'

  res.redirect('press-advert-check')

})

router.post('/notified/press-advert-check', function (req, res) {

  req.session.data['press-advert-check-complete'] = 'true'

  if (req.session.data['press-advert-check'] == 'Yes') {
    res.redirect('press-advert-upload');
  } else {
    req.session.data['notified-completed'] = 'true'
    res.redirect('../consultation/other-parties-check');
  }
})

router.post('/notified/press-advert-upload', function (req, res) {
  req.session.data['advert-uploaded'] = 'true'
  req.session.data['notified-completed'] = 'true'
  res.redirect('../consultation/other-parties-check');

})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// CONSULTATION AND REPRESENTATIONS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/consultation/other-parties-check', function (req, res) {

  req.session.data['other-parties-checked'] = 'true'
  req.session.data['consultation-started'] = 'true'

  if (req.session.data['other-parties-check'] == 'Yes') {
    req.session.data['consultation-completed'] = 'false'
    res.redirect('other-parties-upload');
  } else {
    req.session.data['consultation-completed'] = 'true'
    res.redirect('../po-report/report-upload');
  }
})

router.post('/consultation/other-parties-upload', function (req, res) {
  req.session.data['other-parties-uploaded'] = 'true'
  req.session.data['consultation-completed'] = 'true'
  res.redirect('../po-report/report-upload');
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// PO REPORT
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/po-report/report-upload', function (req, res) {
  req.session.data['po-report-uploaded'] = 'true'
  req.session.data['po-report-completed'] = 'true'
  res.redirect('../site-access/site-entry')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// SITE ACCESS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.post('/site-access/site-entry', function (req, res) {
  req.session.data['site-entry-complete'] = 'true'
  req.session.data['site-access-started'] = 'true'
  res.redirect('neighbours-land')
})

router.post('/site-access/neighbours-land', function (req, res) {
  req.session.data['neighbours-land-complete'] = 'true'
  if (req.session.data['neighbours-land'] == 'Yes') {
    res.redirect('neighbours-address');
  } else {
    res.redirect('health-and-safety')
  }
})

router.post('/site-access/neighbours-address', function (req, res) {
  req.session.data['neighbours-address-complete'] = 'true'
  res.redirect('neighbours')
})

// router.post('/site-access/neighbours-contact-details', function (req, res) {
//   req.session.data['neighbours-contact-complete'] = 'true'
//   res.redirect('neighbours')
// })


router.post('/site-access/neighbours', function (req, res) {
  if (req.session.data['add-neighbours'] == 'Yes') {
    res.redirect('neighbours-address?affectedneighbours=yes');
  } else {
    res.redirect('health-and-safety')
  }
})

router.post('/site-access/health-and-safety', function (req, res) {

  req.session.data['health-and-safety-complete'] = 'true'

  // Mark all site access answers as complete
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

  // Site entry
  // ░░░░░░░░░░
  req.session.data['site-entry-complete'] = 'true'

  // Neighbours land
  // ░░░░░░░░░░░░░░░
  req.session.data['neighbours-land-complete'] = 'true'
  if (req.session.data['neighbours-land'] == 'Yes') {
    req.session.data['neighbours-address-complete'] = 'true'
    req.session.data['neighbours-contact-complete'] = 'true'
  }

  // Mark the site access section as complete
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  req.session.data['site-access-completed'] = 'true'

  // Next stection
  // ░░░░░░░░░░░░░
  res.redirect('../appeal-process/other-appeals-check');
})



// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// APPEAL PROCESS
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// router.post('/appeal-process/procedure', function (req, res) {
//   req.session.data['procedure-complete'] = 'true'
//   req.session.data['appeal-process-started'] = 'true'
//   if (req.session.data['procedure'] == 'Inquiry' || req.session.data['procedure'] == 'Hearing') {
//     res.redirect('procedure--reason');
//   } else {
//     res.redirect('other-appeals');
//   }
//
// })
//
// router.post('/appeal-process/procedure--reason', function (req, res) {
//   req.session.data['procedure-reason-complete'] = 'true'
//   res.redirect('other-appeals');
// })

router.post('/appeal-process/other-appeals-check', function (req, res) {
  req.session.data['other-appeals-check-complete'] = 'true'
  if (req.session.data['other-appeals-radio'] == 'Yes') {
    res.redirect('other-appeal-reference');
  } else {
    res.redirect('extra-conditions');
  }
})

router.post('/appeal-process/other-appeal-reference', function (req, res) {
  req.session.data['other-appeal-reference-complete'] = 'true'
  res.redirect('other-appeals');
})

router.post('/appeal-process/other-appeals', function (req, res) {
  req.session.data['other-appeals-complete'] = 'true'
  if (req.session.data['other-appeals'] == 'Yes') {
    res.redirect('other-appeal-reference?extraotherappeal=yes');
  } else {
    res.redirect('extra-conditions');
  }
})




router.post('/site-access/neighbours-contact-details', function (req, res) {
  req.session.data['neighbours-contact-complete'] = 'true'
  res.redirect('neighbours')
})

router.post('/appeal-process/extra-conditions', function (req, res) {

  req.session.data['extra-conditions-complete'] = 'true'

  // Mark all site access answers as complete
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  req.session.data['other-appeals-complete'] = 'true'

  // Mark the appeal process section as complete
  // ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
  req.session.data['appeal-process-completed'] = 'true'

  // Next stection
  // ░░░░░░░░░░░░░
  res.redirect('../task-list')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// SAVE AND RETURN
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

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
