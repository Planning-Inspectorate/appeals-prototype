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

router.get('/task-list', function(req, res, next){
  let count = 0
  if (req.session.data['contact-completed'] == 'true') { count++ }
  if (req.session.data['grounds-completed'] == 'true') { count++ }
  if (req.session.data['land-completed'] == 'true') { count++ }
  if (req.session.data['procedure-completed'] == 'true') { count++ }
  if (req.session.data['upload-completed'] == 'true') { count++ }

  res.locals.count = count
  next()
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
    res.redirect('appellant-company?contact-started=true')
  } else if (req.session.data['appellant-check'] == 'A person') {
    res.redirect('appellant-name?contact-started=true')
  } else {
    // joint application
    res.redirect('add-appellant-name?contact-started=true')
  }
})

router.post('/prepare-appeal/appellant-company', function (req, res) {
  req.session.data['appellant-company-name-complete'] = true;
  res.redirect('your-contact-details')
})

router.post('/prepare-appeal/appellant-name', function (req, res) {
  res.redirect('agent-check')
})

router.post('/prepare-appeal/agent-check', function (req, res) {
  if (req.session.data['agent-check'] == 'Yes') {
    res.redirect('contact-phone-number')
  } else {
    res.redirect('your-contact-details')
  }
})

router.post('/prepare-appeal/your-contact-details', function (req, res) {
  res.redirect('contact-phone-number')
})

//router.post('/prepare-appeal/contact-phone-number', function (req, res) {
 // if (req.session.data['agent-check'] == 'Yes') {
//    res.redirect('../task-list?contact-completed=true')
//  } else {
//    res.redirect('agent-notice')
 // }
//})

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
 if (req.session.data['agent-check-joint-application'] == 'other') {
  res.redirect('your-contact-details')
 } else {
   res.redirect('contact-phone-number')
 }
})

router.post('/prepare-appeal/contact-phone-number', function (req, res) {
  req.session.data['telephone-number'] = req.body['telephone-number'];
  req.session.data['telephone-number-complete'] = true;
  res.redirect('agent-notice')
})

// agent interuption page

router.post('/prepare-appeal/agent-notice', function (req, res) {
  res.redirect('../task-list?contact-completed=true')
})


// SITE DETAILS
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/prepare-appeal/address', function (req, res) {
  res.redirect('address-check?land-started=true')
})

router.post('/prepare-appeal/address-check', function (req, res) {
  if (req.session.data['address-check'] == 'Yes') {
    res.redirect('interest-in-site')
  } else {
    res.redirect('contact-address')
  }
})

router.post('/prepare-appeal/contact-address', function (req, res) {
  req.session.data['contact-address'] = req.body['contact-address'];
  req.session.data['contact-address-complete'] = true;
  res.redirect('interest-in-site')
})

router.post('/prepare-appeal/interest-in-site', function (req, res) {
  if (req.session.data['interest-in-site'] == 'Other') {
    res.redirect('permission')
  } else {
    res.redirect('site-visibility')
  }
})

router.post('/prepare-appeal/permission', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/prepare-appeal/description-of-land', function (req, res) {
  res.redirect('application-desc-changed')
})

router.post('/prepare-appeal/application-desc-changed', function (req, res) {
  res.redirect('granted-or-refused')
})

router.post('/prepare-appeal/live-on-land', function (req, res) {
  res.redirect('did-you-live-on-land')
})

router.post('/prepare-appeal/did-you-live-on-land', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/prepare-appeal/site-visibility', function (req, res) {
  req.session.data['site-visibility__details'] = req.body['site-visibility__details'];
  req.session.data['site-visibility__details-complete'] = true;
  res.redirect('health-and-safety')
})

router.post('/prepare-appeal/health-and-safety', function (req, res) {
    res.redirect('../task-list?land-completed=true')
})
  
router.post('/prepare-appeal/enforcement-number', function (req, res) {
    res.redirect('../task-list?site-details-complete=true')
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


// YOUR APPLICATION
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/prepare-appeal/application-date', function (req, res) {
  res.redirect('description-of-land')
})

router.post('/prepare-appeal/description-of-land', function (req, res) {
  res.redirect('application-desc-changed')
})

router.post('/prepare-appeal/application-desc-changed', function (req, res) {
  res.redirect('../task-list?your-application-complete=true')
})



// YOUR APPEAL
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/prepare-appeal/procedure', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry') {
    res.redirect('reason-inquiry?procedure-started=true')
  } else if (req.session.data['procedure'] == 'Hearing'){
    res.redirect('reason-hearing?procedure-started=true')
  }
  else {
    res.redirect('other-appeals-check?procedure-started=true')
  }
})

router.post('/prepare-appeal/reason-hearing', function (req, res) {
  req.session.data['hearing'] = req.body['hearing'];
  req.session.data['hearing-complete'] = true;
  res.redirect('other-appeals-check')
})

router.post('/prepare-appeal/reason-inquiry', function (req, res) {
  req.session.data['inquiry'] = req.body['inquiry'];
  req.session.data['inquiry-complete'] = true;
  res.redirect('inquiry-days')
})

router.post('/prepare-appeal/inquiry-days', function (req, res) {
  req.session.data['inquiry-days'] = req.body['inquiry-days'];
  req.session.data['inquiry-days-complete'] = true;
  res.redirect('inquiry-witnesses')
})

router.post('/prepare-appeal/inquiry-witnesses', function (req, res) {
  req.session.data['witnesses'] = req.body['witnesses'];
  req.session.data['witnesses-complete'] = true;
  res.redirect('other-appeals-check')
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
  if (req.session.data['other-appeals-check'] == 'Yes') {
    res.redirect('other-appeal-reference')
  } else {
    res.redirect('../task-list?procedure-completed=true')
  }
})

router.post('/prepare-appeal/other-appeal-reference', function (req, res) {
  res.redirect('other-appeals')
})

router.post('/prepare-appeal/other-appeals', function (req, res) {
  if (req.session.data['other-appeals'] == 'Yes') {
    res.redirect('other-appeal-reference?extraotherappeal=yes')
  } else {
    res.redirect('../task-list?procedure-completed=true')
  }
})

// ---------------------------------------------
// Grounds of Appeal Routing
// ---------------------------------------------

router.post('/prepare-appeal/description-of-breach', function (req, res) {
  req.session.data['description-detail'] = req.body['description-detail'];
  req.session.data['description-detail-complete'] = true;
  res.redirect('grounds?grounds-started=true')
})

// POST route for grounds of appeal
router.post('/prepare-appeal/grounds', function (req, res) {
  const grounds = req.session.data['grounds'];
    res.redirect('facts-b')
})

router.post('/prepare-appeal/facts-b', function (req, res) {
  req.session.data['ground-b-reasons'] = req.body['ground-b-reasons'];
  req.session.data['ground-b-reasons-complete'] = true;
  res.redirect('supporting-check-b')
})

router.post('/prepare-appeal/supporting-check-b', function (req, res) {
  if (req.session.data['supporting-check-b'] == 'Yes') {
    res.redirect('supporting-upload-b')
  } else {
    res.redirect('../task-list?grounds-completed=true')
  }
})

router.post('/prepare-appeal/fee-check', function (req, res) {
  if (req.session.data['fee-check'] == 'Yes') {
    res.redirect('fee-upload')
  } else {
    res.redirect('all-or-part')
  }
})

router.post('/prepare-appeal/supporting-upload-b', function (req, res) {
  req.session.data['_supporting-docs'] = req.body['_supporting-docs'];
  req.session.data['_supporting-docs-complete'] = true;
  res.redirect('../task-list?grounds-completed=true')
})

router.post('/prepare-appeal/fee-upload', function (req, res) {
  req.session.data['fee-receipt'] = req.body['fee-receipt'];
  req.session.data['fee-receipt-complete'] = true;
  res.redirect('all-or-part')
})

router.post('/prepare-appeal/granted-or-refused', function (req, res) {
  if (req.session.data['granted-or-refused'] == 'I have not received a decision') {
    res.redirect('decision-due-date')
  } else {
    res.redirect('decision-letter-date')
  }
})

router.post('/prepare-appeal/decision-letter-date', function (req, res) {
  res.redirect('appeal-decision')
})

router.post('/prepare-appeal/decision-due-date', function (req, res) {
  res.redirect('facts-a')
})

router.post('/prepare-appeal/appeal-decision', function (req, res) {
  if (req.session.data['appeal-decision'] == 'Yes') {
    res.redirect('appeal-decision-date')
  } else {
    res.redirect('facts-a')
  }
})

router.post('/prepare-appeal/appeal-decision', function (req, res) {
  res.redirect('appeal-decision-date')
})

router.post('/prepare-appeal/appeal-decision-date', function (req, res) {
  res.redirect('facts-a')
})

router.post('/prepare-appeal/all-or-part', function (req, res) {
    req.session.data['all-or-part'] = req.body['all-or-part'];
  req.session.data['all-or-part-complete'] = true;
  res.redirect('application-reference')
})

router.post('/prepare-appeal/application-reference', function (req, res) {
  res.redirect('application-date')
})

router.post('/prepare-appeal/application-date', function (req, res) {
  res.redirect('description-of-development')
})

router.post('/prepare-appeal/description-of-development', function (req, res) {
  res.redirect('granted-or-refused')
})

router.post('/prepare-appeal/facts-a', function (req, res) {
  req.session.data['ground-a-reasons'] = req.body['ground-a-reasons'];
  req.session.data['ground-a-reasons-complete'] = true;
  res.redirect('supporting-check')
})

router.post('/prepare-appeal/reasons-a', function (req, res) {
  res.redirect('planning-permission')
})

router.post('/prepare-appeal/planning-permission', function (req, res) {
  res.redirect('supporting-check')
})

router.post('/prepare-appeal/supporting-check', function (req, res) {
  if (req.session.data['supporting-check'] == 'Yes') {
    req.session.data['_supporting-docsd'] = req.body['_supporting-docs'];
    req.session.data['_supporting-docs-complete'] = true;
    res.redirect('supporting-upload')
  } else {
    res.redirect('../task-list?grounds-completed=true')
  }
})

router.post('/prepare-appeal/supporting-upload', function (req, res) {
  res.redirect('../task-list?grounds-completed=true')
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

router.post('/upload-documents/upload-comms', function (req, res) {
  res.redirect('upload-enforcement-notice?upload-started=true')
})

router.post('/upload-documents/application', function (req, res) {
  // if the description of development changed, the next screen is to upload the
  // description of development agreement
  if (req.session.data['application-desc-changed'] != 'No') {
    res.redirect('description-of-development-agreement?application-started=true')
  } else if (req.session.data['fee-check'] != 'No') {
    res.redirect('decision-letter?application-started=true')
  } else {
    res.redirect('planning-obligation-check?application-started=true')
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
    res.redirect('costs-check')
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
  res.redirect('costs-check')
})

router.post('/upload-documents/costs-check', function (req, res) {
  if (req.session.data['costs-check'] == 'Yes') {
    res.redirect('costs')
  } else {
    res.redirect('other-check')
  }
})

router.post('/upload-documents/costs', function (req, res) {
  res.redirect('other-check')
})

router.post('/upload-documents/other-check', function (req, res) {
  if (req.session.data['other-check'] == 'Yes') {
    res.redirect('other')
  } else {
    res.redirect('../task-list?upload-completed=true')
  }
})

router.post('/upload-documents/other', function (req, res) {
  res.redirect('../task-list?upload-completed=true')
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

router.post('/upload-documents/appeal-statement-check', function (req, res) {
  if (req.session.data['appeal-statement-check'] == 'Yes') {
    res.redirect('appeal-statement?appeal-documents-started=true')
  } else {
    // determine whether we need to show statement of common ground
    if (req.session.data['procedure'] == 'Hearing') {
      res.redirect('statement-of-common-ground?appeal-documents-started=true')
    } else if (req.session.data['procedure'] == 'Inquiry') {
      res.redirect('statement-of-common-ground?appeal-documents-started=true')
    } else {
      res.redirect('costs-check?appeal-documents-started=true')
    }

  }
})

router.post('/upload-documents/appeal-statement', function (req, res) {
  // determine whether we need to show statement of common ground
  if (req.session.data['procedure'] == 'Hearing') {
    res.redirect('statement-of-common-ground?appeal-documents-started=true')
  } else if (req.session.data['procedure'] == 'Inquiry') {
    res.redirect('statement-of-common-ground?appeal-documents-started=true')
  } else {
    res.redirect('costs-check?appeal-documents-started=true')
  }
})

router.post('/upload-documents/statement-of-common-ground', function (req, res) {
  res.redirect('costs-check')
})



// PLANS, DRAWINGS AND SUPPORTING DOCUMENTS
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/upload-documents/design-access-check', function (req, res) {
  if (req.session.data['design-access-check'] == 'Yes') {
    res.redirect('design-access?upload-plans-started=true')
  } else {
    res.redirect('plans?upload-plans-started=true')
  }
})

router.post('/upload-documents/design-access', function (req, res) {
  res.redirect('plans')
})

router.post('/upload-documents/plans', function (req, res) {
  res.redirect('new-plans-check')
})

router.post('/upload-documents/new-plans-check', function (req, res) {
  if (req.session.data['new-plans-check'] == 'Yes') {
    res.redirect('new-plans')
  } else {
    res.redirect('other-check')
  }
})

router.post('/upload-documents/new-plans', function (req, res) {
  res.redirect('other-check')
})

// Helper: check if Ground A applies
const isGroundA = (grounds) => grounds?.includes?.('groundA');

// ------------------------------
// Upload Enforcement Notice
// ------------------------------
router.post('/upload-documents/upload-enforcement-notice', (req, res) => {
  res.redirect('upload-enforcement-plan?upload-started=true');
});

router.post('/upload-documents/upload-enforcement-plan', (req, res) => {
  res.redirect('costs-check');
});

// ------------------------------
// Upload Enforcement Plan
// (MAIN LOGIC VERSION — not the task-list one)
// ------------------------------
router.post('/upload-documents/upload-enforcement-plan', (req, res) => {
  const grounds = req.session.data.grounds;
  if (isGroundA(grounds)) {
    return res.redirect('application-upload');
  }
  if (req.session.data['application-desc-changed'] === 'Yes') {
    return res.redirect('upload-desc-change');
  }
  return res.redirect('costs-check');
});

// ------------------------------
// Application Upload
// ------------------------------
router.post('/upload-documents/application-upload', (req, res) => {
  const grounds = req.session.data.grounds;
  if (req.session.data['application-desc-changed'] === 'Yes') {
    return res.redirect('upload-desc-change');
  }
  if (isGroundA(grounds)) {
    return res.redirect('planning-obligation-check');
  }
  return res.redirect('costs-check');
});

// ------------------------------
// Upload Description Change
// ------------------------------
router.post('/upload-documents/upload-desc-change', (req, res) => {
  req.session.data['desc-change'] = req.body['desc-change'];
  req.session.data['desc-change-complete'] = true;
  const decision = req.session.data['granted-or-refused'];
  if (decision === 'Granted with conditions' || decision === 'Refused') {
    return res.redirect('decision-upload');
  }
  return res.redirect('planning-obligation-check');
});

// ------------------------------
// Decision Upload
// ------------------------------
router.post('/upload-documents/decision-upload', (req, res) => {
  const grounds = req.session.data.grounds;

  if (isGroundA(grounds)) {
    return res.redirect('planning-obligation-check');
  }

  return res.redirect('costs-check');
});

// ------------------------------
// Planning Obligation Check
// ------------------------------
router.post('/upload-documents/planning-obligation-check', (req, res) => {
  res.redirect('planning-obligation-status');
});

// ------------------------------
// Upload Enforcement Plan — FINAL route
// (Previously duplicated — now clearly separate)
// ------------------------------
router.post('/upload-documents/upload-enforcement-plan-final', (req, res) => {
  res.redirect('../task-list?your-application-complete=true');
});






// BEFORE YOU START
// ▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒

router.post('/before-you-start/before-you-start', function (req, res) {
  res.redirect('lpa')
})

router.post('/before-you-start/lpa', function (req, res) {
  res.redirect('enforcement-notice')
})

router.post('/before-you-start/enforcement-notice', function (req, res) {
  if (req.session.data['enforcementNotice'] == 'No') {
    res.redirect('../../../before-you-start/v19/planning-type')
  } else {
    res.redirect('listed-building-check')
  }
})

router.post('/before-you-start/listed-building-check', function (req, res) {
  if (req.session.data['listed-building-check'] == 'Yes') {
    res.redirect('existing-service')
  } else {
    res.redirect('issue-date')
  }
})

router.post('/before-you-start/issue-date', function (req, res) {
  res.redirect('effective-date')
})

router.post('/before-you-start/effective-date', function (req, res) {
  res.redirect('contact-check')
})

router.post('/before-you-start/contact-check', function (req, res) {
  if (req.session.data['contact-check'] == 'No') {
    res.redirect('cannot-appeal')
  } else {
    res.redirect('contact-date')
  }
})

router.post('/before-you-start/contact-date', function (req, res) {
  res.redirect('upload-comms')
})

router.post('/before-you-start/upload-comms', function (req, res) {
  res.redirect('cya')
})

router.post('/before-you-start/cya', function (req, res) {
  res.redirect('application-ref')
})

router.post('/before-you-start/application-ref', function (req, res) {
  res.redirect('email')
})

router.post('/before-you-start/email', function (req, res) {
  res.redirect('enter-code--confirm-email')
})

router.post('/before-you-start/enter-code--confirm-email', function (req, res) {
  res.redirect('email-confirmed')
})

router.post('/before-you-start/email-confirmed', function (req, res) {
  res.redirect('start')
})

router.post('/before-you-start/start', function (req, res) {
  res.redirect('../task-list')
})

// Add your routes above the module.exports line
module.exports = router
