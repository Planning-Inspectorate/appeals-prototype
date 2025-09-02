const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

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

router.get('/task-list', function(req, res, next) {

  // check if the last question of the 1st section is complete
  // if (req.session.data['other-appeals-check-complete']
  //  || req.session.data['other-appeals-complete']
  // ) {
  //   req.session.data['prepare-completed'] = 'true'
  // } else {
  //   req.session.data['prepare-completed'] = 'false'
  // }

  // check if all of the sections are complete
  // if (req.session.data['your-details-complete']
  //  && req.session.data['site-details-complete']
  //  && req.session.data['your-application-complete']
  //  && req.session.data['your-appeal-complete']
  // ) {
  //  req.session.data['prepare-completed'] = 'true'
  // } else {
  //  req.session.data['prepare-completed'] = 'false'
  // }

  // check if all of the sections are complete
  // if (req.session.data['application-complete']
  //  && req.session.data['ownership-complete']
  //  && req.session.data['statement-of-common-ground-complete']
  //  && req.session.data['upload-plans-complete']
  // ) {
  //   req.session.data['upload-documents-completed'] = 'true'
  // } else {
  //   req.session.data['upload-documents-completed'] = 'false'
  // }

  // Set up the section count and increase if each section is done
  // let count = 0
  // if (res.locals.data['prepare-completed'] == 'true') { count++ }
  // if (res.locals.data['upload-documents-completed'] == 'true') { count++ }
  // res.locals.count = count

  next()
})


// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// PREPARE APPEAL
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/prepare-appeal/:page', function (req, res, next) {
  req.session.data[`${req.params.page}-complete`] = 'true'
  next()
})

// YOUR DETAILS
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/prepare-appeal/appellant-check', function (req, res) {
  if (req.session.data['appellant-check'] == 'A company') {
    res.redirect('appellant-company?your-details-started=true')
  } else if (req.session.data['appellant-check'] == 'A person') {
    res.redirect('appellant-name?your-details-started=true')
  } else {
    // joint application
    res.redirect('add-appellant-name?your-details-started=true')
  }
})

router.post('/prepare-appeal/appellant-company', function (req, res) {
  res.redirect('contact-phone-number?agent-notice=yes')
})

router.post('/prepare-appeal/appellant-name', function (req, res) {
  res.redirect('agent-check')
})

router.post('/prepare-appeal/agent-check', function (req, res) {
  if (req.session.data['agent-check'] == 'Yes') {
    res.redirect('contact-phone-number')
  } else {
    res.redirect('agent-notice')
  }
})

router.post('/prepare-appeal/add-appellant-name', function (req, res) {
  res.redirect('appellant-names')
})

router.post('/prepare-appeal/appellant-names', function (req, res) {
  if (req.session.data['add-more-names'] == 'Yes') {
    res.redirect('add-appellant-name?multiplenames=yes')
  } else {
    // move on to check whether they are an agent
    res.redirect('agent-check-joint-application')
  }
})

router.post('/prepare-appeal/agent-check-joint-application', function (req, res) {
  if (req.session.data['agent-check'] == 'Yes') {
    res.redirect('contact-phone-number')
  } else {
    res.redirect('agent-notice')
  }
})

// agent interuption page
router.post('/prepare-appeal/agent-notice', function (req, res) {
  res.redirect('contact-phone-number')
})

router.post('/prepare-appeal/contact-phone-number', function (req, res) {
  res.redirect('confirm-phone-number')
})

router.post('/prepare-appeal/confirm-phone-number', function (req, res) {
  res.redirect('../task-list?your-details-complete=true')
})

router.post('/prepare-appeal/request-a-new-phone-number-code', function (req, res) {
  res.redirect('confirm-phone-number')
})

// SITE DETAILS
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/prepare-appeal/address', function (req, res) {
  res.redirect('site-area?site-details-started=true')
})

router.post('/prepare-appeal/site-area', function (req, res) {
  res.redirect('green-belt?site-details-started=true')
})

router.post('/prepare-appeal/green-belt', function (req, res) {
  res.redirect('own-all')
})

router.post('/prepare-appeal/own-all', function (req, res) {
  if (req.session.data['own-all'] == 'No') {
    res.redirect('own-some')
  } else {
    res.redirect('agricultural-holding')
  }
})

router.post('/prepare-appeal/own-some', function (req, res) {
  res.redirect('own-others')
})

router.post('/prepare-appeal/own-others', function (req, res) {
  if (req.session.data['own-others'] == 'Some' || req.session.data['own-others'] == 'No') {
    res.redirect('owners-searched')
  } else {
    res.redirect('owners-notified')
  }
})

router.post('/prepare-appeal/owners-searched', function (req, res) {
  res.redirect('owners-advertised')
})

router.post('/prepare-appeal/owners-advertised', function (req, res) {
  if (req.session.data['own-others'] == 'Some') {
    res.redirect('owners-notified')
  } else {
    res.redirect('agricultural-holding')
  }
})

router.post('/prepare-appeal/owners-notified', function (req, res) {
  res.redirect('agricultural-holding')
})

router.post('/prepare-appeal/agricultural-holding', function (req, res) {
  if (req.session.data['agricultural-holding'] == 'Yes') {
    res.redirect('agricultural-tenant')
  } else {
    res.redirect('site-visibility')
  }
})

router.post('/prepare-appeal/agricultural-tenant', function (req, res) {
  if (req.session.data['agricultural-tenant'] == 'Yes') {
    res.redirect('agricultural-others')
  } else {
    res.redirect('agricultural-notified')
  }
})

router.post('/prepare-appeal/agricultural-others', function (req, res) {
  if (req.session.data['agricultural-others'] == 'Yes') {
    res.redirect('agricultural-notified')
  } else {
    res.redirect('site-visibility')
  }
})

router.post('/prepare-appeal/agricultural-notified', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/prepare-appeal/site-visibility', function (req, res) {
  res.redirect('health-and-safety')
})

router.post('/prepare-appeal/health-and-safety', function (req, res) {
  res.redirect('../task-list?site-details-complete=true')
})

// YOUR APPLICATION
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/prepare-appeal/application-reference', function (req, res) {
  res.redirect('application-date?your-application-started=true')
})

router.post('/prepare-appeal/application-date', function (req, res) {
  res.redirect('description-of-development')
})

router.post('/prepare-appeal/description-of-development', function (req, res) {
  res.redirect('application-desc-changed')
})

router.post('/prepare-appeal/application-desc-changed', function (req, res) {
  res.redirect('../task-list?your-application-complete=true')
})



// YOUR APPEAL
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/prepare-appeal/grounds', function (req, res) {
  res.redirect('procedure?your-appeal-started=true')
})

router.post('/prepare-appeal/procedure', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry' || req.session.data['procedure'] == 'Hearing') {
    res.redirect('procedure--reason')
  } else {
    res.redirect('appeal-summary')
  }
})

router.post('/prepare-appeal/procedure--reason', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry') {
    res.redirect('procedure--length')
  } else {
    res.redirect('appeal-summary')
  }
})

router.post('/prepare-appeal/procedure--length', function (req, res) {
  res.redirect('procedure--witnesses')
})

router.post('/prepare-appeal/procedure--witnesses', function (req, res) {
  res.redirect('appeal-summary')
})

router.post('/prepare-appeal/appeal-summary', function (req, res) {
  res.redirect('other-appeals-check')
})

router.post('/prepare-appeal/other-appeals-check', function (req, res) {
  if (req.session.data['other-appeals-radio'] == 'Yes') {
    res.redirect('other-appeal-reference')
  } else {
    res.redirect('../task-list?your-appeal-complete=true')
  }
})

router.post('/prepare-appeal/other-appeal-reference', function (req, res) {
  res.redirect('other-appeals')
})

router.post('/prepare-appeal/other-appeals', function (req, res) {
  if (req.session.data['other-appeals'] == 'Yes') {
    res.redirect('other-appeal-reference?extraotherappeal=yes')
  } else {
    res.redirect('../task-list?your-appeal-complete=true')
  }
})





// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// UPLOAD DOCUMENTS
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒


router.post('/upload-documents/:page', function (req, res, next) {
  req.session.data[`${req.params.page}-complete`] = 'true'
  next()
})


// YOUR APPLICATION
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/upload-documents/application', function (req, res) {
  res.redirect('environment-statement-check')
})

router.post('/upload-documents/environment-statement-check', function (req, res) {
  if (req.session.data['environment-statement-check'] == 'No') {
    // if the description of development changed, the next screen is to upload the
    // description of development agreement
    if (req.session.data['application-desc-changed'] != 'No') {
      res.redirect('description-of-development-agreement?application-started=true')
    } else {
      res.redirect('decision-letter?application-started=true')
    }
  } else {
    res.redirect('environment-statement')
  }
})

router.post('/upload-documents/environment-statement', function (req, res) {
  // if the description of development changed, the next screen is to upload the
  // description of development agreement
  if (req.session.data['application-desc-changed'] != 'No') {
    res.redirect('description-of-development-agreement?application-started=true')
  } else {
    res.redirect('decision-letter?application-started=true')
  }
})

router.post('/upload-documents/description-of-development-agreement', function (req, res) {
  // if the appellant didn’t receive a decision letter
  // do not ask them to upload their decision letter
  if (req.session.data['non-determined']) {
    res.redirect('planning-obligation-check')
  } else {
    res.redirect('decision-letter')
  }
})

router.post('/upload-documents/decision-letter', function (req, res) {
  res.redirect('planning-obligation-check')
})

router.post('/upload-documents/planning-obligation-check', function (req, res) {
  if (req.session.data['planning-obligation-check'] == 'Yes') {
    res.redirect('planning-obligation-status')
  } else {
    res.redirect('../task-list?application-complete=true')
  }
})

router.post('/upload-documents/planning-obligation-status', function (req, res) {
  if (req.session.data['planning-obligation-status'] == 'Not started yet') {
    res.redirect('../task-list?application-complete=true')
  } else {
    res.redirect('planning-obligation')
  }
})

router.post('/upload-documents/planning-obligation', function (req, res) {
  res.redirect('../task-list?application-complete=true')
})

// OWNERSHIP
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/upload-documents/ownership-certificate-check', function (req, res) {
  if (req.session.data['ownership-certificate-check'] == 'Yes') {
    res.redirect('ownership-certificate?ownership-started=true')
  } else {
    res.redirect('../task-list?ownership-complete=true')
  }
})

router.post('/upload-documents/ownership-certificate', function (req, res) {
  res.redirect('../task-list?ownership-complete=true')
})

// APPEAL DOCUMENTS
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/upload-documents/statement-of-common-ground', function (req, res) {
  res.redirect('costs-check?appeal-documents-started=true')
})

router.post('/upload-documents/costs-check', function (req, res) {
  if (req.session.data['costs-check'] == 'Yes') {
    res.redirect('costs?appeal-documents-started=true')
  } else {
    res.redirect('../task-list?appeal-documents-complete=true')
  }
})

router.post('/upload-documents/costs', function (req, res) {
  res.redirect('../task-list?appeal-documents-complete=true')
})

// Add your routes above the module.exports line
module.exports = router
