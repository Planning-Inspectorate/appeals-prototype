const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Comment on a planning appeal'
  next()
})

router.post('/guidance', function (req, res) {
  res.redirect('find-appeal')
})

router.post('/find-appeal', function (req, res) {
  if (req.session.data['appeal-number'] == 'appealNumber') {
    res.redirect('appeal-search-number')
  } else {
    res.redirect('appeal-search-address')
  }
})

router.post('/appeal-search-number', function (req, res) {
  res.redirect('appeal-details?status=open')
})

router.post('/appeal-search-address', function (req, res) {
  res.redirect('open-appeals?address=postcode')
})

router.post('/documents-upload', function (req, res) {
  res.redirect('check-your-answers')
})

// Add your routes above the module.exports line
module.exports = router
