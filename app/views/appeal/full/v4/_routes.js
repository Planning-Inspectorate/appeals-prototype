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

  // Check if agricultural questions are complete
  if (
    req.session.data['agricultural-holding-complete']
    && req.session.data['agricultural-holding'] != 'No'
  ){
    req.session.data['agricultural-completed'] = 'true'
  } else if (req.session.data['agricultural-holding'] == 'No'){
    if (
      req.session.data['agricultural-tenant'] == 'Yes'
      && req.session.data['agricultural-others'] == 'No'
    ){
      req.session.data['agricultural-completed'] = 'true'
    } else if (
      req.session.data['agricultural-tenant'] == 'Yes'
      && req.session.data['agricultural-others'] == 'Yes'
      && req.session.data['agricultural-notified-complete']
    ){
      req.session.data['agricultural-completed'] = 'true'
    } else if (
      req.session.data['agricultural-tenant'] == 'No'
      && req.session.data['agricultural-notified-complete']
    ){
      req.session.data['agricultural-completed'] = 'true'
    } else {
      req.session.data['agricultural-completed'] = 'false'
    }
  } else {
    req.session.data['agricultural-completed'] = 'false'
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
    && req.session.data['address-complete']
    && req.session.data['ownership-completed'] == 'true'
    && req.session.data['agricultural-completed'] == 'true'
    && req.session.data['site-visibility-complete']
    && req.session.data['health-and-safety-complete']
    && req.session.data['procedure-completed'] == 'true'
  ){
    res.locals.data['prepare-appeal-completed'] = 'true'
  } else {
    res.locals.data['prepare-appeal-completed'] = 'false'
  }


  // Check if ownership upload questions are complete
  if (
    (req.session.data['ownership-certificate-check'] == 'Yes'
    && req.session.data['ownership-certificate-complete'])
    ||
    (req.session.data['ownership-certificate-check-complete']
    && req.session.data['ownership-certificate-check'] != 'Yes')
  ){
    req.session.data['ownership-cert-completed'] = 'true'
  } else {
    req.session.data['ownership-cert-completed'] = 'false'
  }

  // Check if design access upload questions are complete
  if (
    (req.session.data['design-access-check'] == 'Yes'
    && req.session.data['design-access-complete'])
    ||
    (req.session.data['design-access-check-complete']
    && req.session.data['design-access-check'] != 'Yes')
  ){
    req.session.data['design-access-completed'] = 'true'
  } else {
    req.session.data['design-access-completed'] = 'false'
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

  // Check if obligation upload questions are complete
  if (
    req.session.data['planning-obligation-check'] == 'Yes'
  ){
    if (
      (req.session.data['planning-obligation-status'] == 'Finalised and ready to submit'
      && req.session.data['planning-obligation-complete'])
      ||
      (req.session.data['planning-obligation-status'] == 'In draft'
      && req.session.data['planning-obligation-complete'])
      ||
      (req.session.data['planning-obligation-check-complete']
      && req.session.data['planning-obligation-check'] != ('Finalised and ready to submit' || 'In draft'))
    ){
     req.session.data['obligation-completed'] = 'true'
    }
  } else if (
    req.session.data['planning-obligation-check-complete']
    && req.session.data['planning-obligation-check'] != 'Yes'
  ){
    req.session.data['obligation-completed'] = 'true'
  } else {
    req.session.data['obligation-completed'] = 'false'
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
    && req.session.data['application-desc-correct-complete']
    && req.session.data['description-detail-complete']
    && req.session.data['plans-complete']
    && req.session.data['ownership-cert-completed'] == 'true'
    && req.session.data['design-access-completed'] == 'true'
    && req.session.data['decision-letter-complete']
    && req.session.data['appeal-statement-complete']
    && req.session.data['new-plans-completed'] == 'true'
    && req.session.data['obligation-completed'] == 'true'
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
  } else {
    res.redirect('lpa-reference')
  }
})

router.post('/prepare-appeal/appellant-name', function (req, res) {
  res.redirect('lpa-reference')
})

router.post('/prepare-appeal/lpa-reference', function (req, res) {
  res.redirect('address')
})

router.post('/prepare-appeal/address', function (req, res) {
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
  res.redirect('procedure')
})

router.post('/prepare-appeal/procedure', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry' || req.session.data['procedure'] == 'Hearing') {
    res.redirect('procedure--reason')
  } else {
    res.redirect('complete')
  }
})

router.post('/prepare-appeal/procedure--reason', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry') {
    res.redirect('procedure--length')
  } else {
    res.redirect('complete')
  }
})

router.post('/prepare-appeal/procedure--length', function (req, res) {
  res.redirect('procedure--witnesses')
})

router.post('/prepare-appeal/procedure--witnesses', function (req, res) {
  res.redirect('complete')
})

router.get('/prepare-appeal/complete', function (req, res) {
  if (!res.locals.data['upload-documents-completed']) {
    res.redirect('../upload-documents/application')
  } else {
    res.redirect('../task-list')
  }
})







//
// UPLOAD DOCUMENTS
//
router.post('/upload-documents/:page', function (req, res, next) {
  req.session.data['upload-documents-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  next()
})

router.post('/upload-documents/application', function (req, res) {
  res.redirect('application-desc-correct')
})

router.post('/upload-documents/application-desc-correct', function (req, res) {
  res.redirect('description-of-development')
})

router.post('/upload-documents/description-of-development', function (req, res) {
  res.redirect('plans')
  req.session.data['description-detail-complete'] = 'true'
})

router.post('/upload-documents/plans', function (req, res) {
  res.redirect('ownership-certificate-check')
})

router.post('/upload-documents/ownership-certificate-check', function (req, res) {
  if (req.session.data['ownership-certificate-check'] == 'Yes') {
    res.redirect('ownership-certificate')
  } else {
    res.redirect('design-access-check')
  }
})

router.post('/upload-documents/ownership-certificate', function (req, res) {
  res.redirect('design-access-check')
})

router.post('/upload-documents/design-access-check', function (req, res) {
  if (req.session.data['design-access-check'] == 'Yes') {
    res.redirect('design-access')
  } else {
    res.redirect('decision-letter')
  }
})

router.post('/upload-documents/design-access', function (req, res) {
  res.redirect('decision-letter')
})

router.post('/upload-documents/decision-letter', function (req, res) {
  res.redirect('appeal-statement')
})

router.post('/upload-documents/appeal-statement', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry' || req.session.data['procedure'] == 'Hearing') {
    res.redirect('common-ground')
  } else {
    res.redirect('new-plans-check')
  }
})

router.post('/upload-documents/common-ground', function (req, res) {
  res.redirect('new-plans-check')
})

router.post('/upload-documents/new-plans-check', function (req, res) {
  if (req.session.data['new-plans-check'] == 'Yes') {
    res.redirect('new-plans')
  } else {
    res.redirect('planning-obligation-check')
  }
})

router.post('/upload-documents/new-plans', function (req, res) {
  res.redirect('planning-obligation-check')
})

router.post('/upload-documents/planning-obligation-check', function (req, res) {
  if (req.session.data['planning-obligation-check'] == 'Yes') {
    res.redirect('planning-obligation-status')
  } else {
    res.redirect('other-check')
  }
})

router.post('/upload-documents/planning-obligation-status', function (req, res) {
  if (req.session.data['planning-obligation-status'] == 'Finalised and ready to submit' || req.session.data['planning-obligation-status'] == 'In draft') {
    res.redirect('planning-obligation')
  } else {
    res.redirect('other-check')
  }
})

router.post('/upload-documents/planning-obligation', function (req, res) {
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








// Add your routes above the module.exports line
module.exports = router
