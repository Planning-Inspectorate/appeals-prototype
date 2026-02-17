const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  next()
})


router.post('/new-email', function (req, res) {
  res.redirect('check-email')
})

router.post('/check-email', function (req, res) {
  req.flash('success', 'Access invite sent')
  res.redirect('appellant-submission-full')
})

// Add your routes above the module.exports line
module.exports = router
