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

  // Check if whole prepare section is complete
  if (
    req.session.data['contact-details-complete']
    && req.session.data['appellant-completed'] == 'true'
    && req.session.data['lpa-reference-complete']
    && req.session.data['address-complete']
    && req.session.data['ownership-completed'] == 'true'
    && req.session.data['site-visibility-complete']
    && req.session.data['health-and-safety-complete']
  ){
    res.locals.data['prepare-appeal-completed'] = 'true'
  } else {
    res.locals.data['prepare-appeal-completed'] = 'false'
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
    res.redirect('site-visibility')
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
    res.redirect('site-visibility')
  }
})

router.post('/prepare-appeal/owners-notified', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/prepare-appeal/site-visibility', function (req, res) {
  res.redirect('health-and-safety')
})

router.post('/prepare-appeal/health-and-safety', function (req, res) {
  res.redirect('complete')
})

router.get('/prepare-appeal/complete', function (req, res) {
  if (!req.session.data['upload-documents-completed']) {
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
  res.redirect('decision-letter')
})

router.post('/upload-documents/decision-letter', function (req, res) {
  res.redirect('appeal-statement')
})

router.post('/upload-documents/appeal-statement', function (req, res) {
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