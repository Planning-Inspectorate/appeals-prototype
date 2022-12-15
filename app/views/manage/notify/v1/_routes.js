const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your planning inspectorate appeals'

  next()
})

router.post('/send-new', function (req, res) {
  if (req.session.data['sendby'] == 'letters') {
    res.redirect('send-letters')
  } else {
    res.redirect('send-email')
  }
})


// Add your routes above the module.exports line
module.exports = router
