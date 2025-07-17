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



router.post('/prepare-appeal/appellant-check', function (req, res) {
  if (req.session.data['appellant-check'] == 'Appellant') {
    res.redirect('appellant-name')
  } else {
    res.redirect('contact-details')
  }
})


router.post('/prepare-appeal/contact-details', function (req, res) {
  res.redirect('contact-phone-number')
})

router.post('/prepare-appeal/contact-phone-number', function (req, res) {
  res.redirect('appellant-name')
})

router.post('/prepare-appeal/appellant-name', function (req, res) {
  res.redirect('other-appellants')
})

router.post('/prepare-appeal/add-another-appellant', function (req, res) {
  if (req.session.data['add-another-appellant'] == 'Yes') {
    res.redirect('appellant-contact-details')
  } else {
    res.redirect('address')
  }
})

router.post('/prepare-appeal/appellant-contact-details', function (req, res) {
  res.redirect('add-another-appellant')
})

router.post('/prepare-appeal/address', function (req, res) {
  res.redirect('interest')
})

router.post('/prepare-appeal/interest', function (req, res) {
  res.redirect('description-of-development')
})

router.post('/prepare-appeal/description-of-development', function (req, res) {
  res.redirect('live-site')
})

router.post('/prepare-appeal/live-site', function (req, res) {
  res.redirect('live-site-issue-date')
})

router.post('/prepare-appeal/live-site-issue-date', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/prepare-appeal/site-visibility', function (req, res) {
  res.redirect('health-and-safety')
})

router.post('/prepare-appeal/health-and-safety', function (req, res) {
  res.redirect('enforcement-reference')
})

router.post('/prepare-appeal/enforcement-reference', function (req, res) {
  res.redirect('grounds-facts')
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

router.post('/upload-documents/grounds-facts', function (req, res) {

  const data = req.session.data
  let grounds = req.session.data['grounds-facts']           // make a variable from the checkbox selection

  if (! grounds) {                                          // if no option selected
    res.redirect('grounds-facts?error=true')
  } else if (grounds.includes('ground-a')) {                // otherwise, if it contains the ground a
    res.redirect('fee-paid')                                  // show the fee question
  } else {                                                  // if no ground a
    res.redirect('documents-check')                           // onward
  }
})

router.post('/upload-documents/planning-permission', function (req, res) {
  res.redirect('grounds-supporting-docs')
})

router.post('/upload-documents/grounds-supporting-docs', function (req, res) {
  res.redirect('grounds-supporting-docs-upload')
})

router.post('/upload-documents/grounds-supporting-docs', function (req, res) {
  if (req.session.data['grounds-supporting-docs'] == 'Yes') {
    res.redirect('grounds-supporting-docs-upload')
  } else {
    res.redirect('enforcement-notice')
  }
})

router.post('/upload-documents/grounds-supporting-docs-upload', function (req, res) {
  res.redirect('enforcement-notice')
})

router.post('/upload-documents/enforcement-notice', function (req, res) {
  res.redirect('enforcement-plan')
})

router.post('/upload-documents/enforcement-plan', function (req, res) {
  res.redirect('planning-obligation-check')
})

router.post('/upload-documents/planning-obligation-check', function (req, res) {
  if (req.session.data['planning-obligation-check'] == 'Yes') {
    res.redirect('planning-obligation-status')
  } else {
    res.redirect('apply-appeal-costs')
  }
})

router.post('/upload-documents/planning-obligation-status', function (req, res) {
  if (req.session.data['planning-obligation-status'] == 'Finalised and ready to submit' || req.session.data['planning-obligation-status'] == 'In draft') {
    res.redirect('planning-obligation')
  } else {
    res.redirect('apply-appeal-costs')
  }
})

router.post('/upload-documents/apply-appeal-costs', function (req, res) {
  res.redirect('other-check')
})

router.post('/prepare-appeal/costs-check', function (req, res) {
  if (req.session.data['costs'] == 'Yes') {
    res.redirect('costs')
  } else {
    res.redirect('other-check')
  }
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
