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
  // Check if appellant questions are complete
  if (
    (req.session.data['appellant-check'] == 'Another individual'
    && req.session.data['appellant-name-complete'])
    ||
    (req.session.data['appellant-check-complete']
    && req.session.data['appellant-check'] != 'Another individual')
  ){
    req.session.data['appellant-completed'] = 'true'
  } else {
    req.session.data['appellant-completed'] = 'false'
  }

  // Check if ownership questions are complete
  if (
    req.session.data['own-all-complete']
    && req.session.data['own-all'] != 'No'
  ){
    req.session.data['ownership-completed'] = 'true'
  } else if (
    req.session.data['own-all'] == 'No'
    && req.session.data['own-some-complete']
    && req.session.data['own-others-complete']
  ){
    if (
      req.session.data['own-others'] == 'Yes'
      && req.session.data['owners-notified-complete']
    ){
      req.session.data['ownership-completed'] = 'true'
    } else if (
      req.session.data['own-others'] == 'Some'
      && req.session.data['owners-searched-complete']
      && req.session.data['owners-advertised-complete']
      && req.session.data['owners-notified-complete']
    ){
      req.session.data['ownership-completed'] = 'true'
    } else if (
      req.session.data['own-others'] == 'No'
      && req.session.data['owners-searched-complete']
      && req.session.data['owners-advertised-complete']
    ){
      req.session.data['ownership-completed'] = 'true'
    } else {
      req.session.data['ownership-completed'] = 'false'
    }
  } else {
    req.session.data['ownership-completed'] = 'false'
  }

  // Check if procedure questions are complete
  if (
    req.session.data['procedure'] == 'Written representations' || (
      req.session.data['procedure-complete']
      && req.session.data['procedure'] != 'Hearing'
      && req.session.data['procedure'] != 'Inquiry'
    )
  ){
    req.session.data['procedure-completed'] = 'true'
  } else if (
    req.session.data['procedure'] == 'Hearing'
    && req.session.data['procedure--reason-complete']
  ) {
    req.session.data['procedure-completed'] = 'true'
  } else if (
    req.session.data['procedure'] == 'Inquiry'
    && req.session.data['procedure--reason-complete']
    && req.session.data['procedure--length-complete']
    && req.session.data['procedure--witnesses-complete']
  ) {
    req.session.data['procedure-completed'] = 'true'
  } else {
    req.session.data['procedure-completed'] = 'false'
  }

  // Check if whole prepare section is complete
  if (
    req.session.data['contact-details-complete']
    && req.session.data['appellant-completed'] == 'true'
    && req.session.data['lpa-reference-complete']
    && req.session.data['enforcement-notice-complete']
    && req.session.data['address-complete']
    && req.session.data['site-visibility-complete']
    && req.session.data['health-and-safety-complete']
    && req.session.data['site-usage-complete']
    && req.session.data['procedure-completed'] == 'true'
  ){
    res.locals.data['prepare-appeal-completed'] = 'true'
  } else {
    res.locals.data['prepare-appeal-completed'] = 'false'
  }





  // Check if new plan upload questions are complete
  if (
    (req.session.data['new-plans-check'] == 'Yes'
    && req.session.data['new-plans-complete'])
    ||
    (req.session.data['new-plans-check-complete']
    && req.session.data['new-plans-check'] != 'Yes')
  ){
    req.session.data['new-plans-completed'] = 'true'
  } else {
    req.session.data['new-plans-completed'] = 'false'
  }

  // Check if other upload questions are complete
  if (
    (req.session.data['other-check'] == 'Yes'
    && req.session.data['other-complete'])
    ||
    (req.session.data['other-check-complete']
    && req.session.data['other-check'] != 'Yes')
  ){
    req.session.data['other-completed'] = 'true'
  } else {
    req.session.data['other-completed'] = 'false'
  }

  // Check if whole upload section is complete
  if (
    req.session.data['application-complete']
    && req.session.data['decision-letter-complete']
    && req.session.data['appeal-statement-complete']
    && req.session.data['other-check-complete']
    && req.session.data['new-plans-completed'] == 'true'
    && req.session.data['other-completed'] == 'true'
  ){
    res.locals.data['upload-documents-completed'] = 'true'
  } else {
    res.locals.data['upload-documents-completed'] = 'false'
  }


  // Set up the section count and increase if each section is done
  let count = 0
  if (res.locals.data['prepare-appeal-completed'] == 'true') { count++ }
  if (res.locals.data['upload-documents-completed'] == 'true') { count++ }
  res.locals.count = count

  next()
})





//
// PREPARE APPEAL
//
router.post('/prepare-appeal/:page', function (req, res, next) {
  req.session.data['prepare-appeal-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  next()
})

router.post('/prepare-appeal/contact-details', function (req, res) {
  res.redirect('appellant-check')
})

router.post('/prepare-appeal/appellant-check', function (req, res) {
  if (req.session.data['appellant-check'] == 'Another individual') {
    res.redirect('appellant-name')
  } else if (req.session.data['appellant-check'] == 'A company') {
    res.redirect('company-name')
  } else {
    res.redirect('lpa-reference')
  }
})

router.post('/prepare-appeal/appellant-name', function (req, res) {
  res.redirect('lpa-reference')
})

router.post('/prepare-appeal/company-name', function (req, res) {
  res.redirect('lpa-reference')
})

router.post('/prepare-appeal/lpa-reference', function (req, res) {
  res.redirect('enforcement-notice')
})

router.post('/prepare-appeal/enforcement-notice', function (req, res) {
  res.redirect('address')
})

router.post('/prepare-appeal/address', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/prepare-appeal/site-visibility', function (req, res) {
  res.redirect('health-and-safety')
})

router.post('/prepare-appeal/health-and-safety', function (req, res) {
  res.redirect('site-usage')
})

router.post('/prepare-appeal/site-usage', function (req, res) {
  if (req.session.data['section'] == '192' || req.session.data['section'] == '26H') {
    res.redirect('proposed-usage')
  } else {
    res.redirect('procedure')
  }
})

router.post('/prepare-appeal/proposed-usage', function (req, res) {
  res.redirect('proposal-started')
})

router.post('/prepare-appeal/proposal-started', function (req, res) {
  res.redirect('procedure')
})

router.post('/prepare-appeal/procedure', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry' || req.session.data['procedure'] == 'Hearing') {
    res.redirect('procedure--reason')
  } else {
    res.redirect('../upload-documents/application')
  }
})

router.post('/prepare-appeal/procedure--reason', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry') {
    res.redirect('procedure--length')
  } else {
    res.redirect('../upload-documents/application')
  }
})

router.post('/prepare-appeal/procedure--length', function (req, res) {
  res.redirect('procedure--witnesses')
})

router.post('/prepare-appeal/procedure--witnesses', function (req, res) {
  res.redirect('../upload-documents/application')
})





//
// UPLOADS
//
router.post('/upload-documents/:page', function (req, res, next) {
  req.session.data['upload-documents-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  next()
})

router.post('/upload-documents/application', function (req, res) {
  res.redirect('plans')
})

router.post('/upload-documents/plans', function (req, res) {
  if (req.session.data['decision-check'] == 'Yes') {
    res.redirect('decision-letter')
  } else {
    res.redirect('appeal-statement')
  }
})

router.post('/upload-documents/decision-letter', function (req, res) {
  res.redirect('appeal-statement')
})

router.post('/upload-documents/appeal-statement', function (req, res) {
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

router.post('/upload-documents/other-check', function (req, res) {
  if (req.session.data['other-check'] == 'Yes') {
    res.redirect('other')
  } else {
    res.redirect('../task-list')
  }
})

router.post('/upload-documents/other', function (req, res) {
  res.redirect('../task-list')
})





//
// SAVE AND RETURN
//
router.post('/save-and-return/email-address', function (req, res) {
  res.redirect('confirm')
})

router.post('/save-and-return/confirmed', function (req, res) {
  res.redirect('../task-list')
})





// Add your routes above the module.exports line
module.exports = router