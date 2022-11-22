const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Find and comment on planning appeals'
  next()
})

router.post('/guidance', function (req, res) {
  res.redirect('find-appeal')
})

router.post('/find-appeal', function (req, res) {
  if (req.session.data['appeal-number'] == 'appealNumber') {
    res.redirect('appeal-search-number')
  } else {
    res.redirect('appeal-search-postcode')
  }
})

router.post('/documents-upload', function (req, res) {
  res.redirect('check-your-answers')
})

// Add your routes above the module.exports line
module.exports = router
