const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Change the service name URL so it goes to the beginning
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'+req.originalUrl.split('/')[2]+'/'

  next()
})

router.post('/before-you-continue', function (req, res) {
  res.redirect('upload-proofs');
})

router.post('/upload-proofs', function (req, res) {
  res.redirect('witness-check');
})

router.post('/witness-check', function (req, res) {
  if (req.session.data['witness-check'] == 'Yes') {
    res.redirect('upload-witness-proofs');
  } else {
    res.redirect('check-your-answers');
  }
})

router.post('/upload-witness-proofs', function (req, res) {
  res.redirect('check-your-answers');
})

router.post('/check-your-answers', function (req, res) {
  res.redirect('confirmation');
})

// Add your routes above the module.exports line
module.exports = router
