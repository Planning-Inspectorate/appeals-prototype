const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'
  next()
})

router.post('/venue-address', function (req, res) {
  res.redirect('check-venue-address')
})

router.post('/check-venue-address', function (req, res) {
  res.redirect('venue-address-confirmation')
})

// Add your routes above the module.exports line
module.exports = router
