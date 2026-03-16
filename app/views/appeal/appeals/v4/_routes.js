const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  next()
})

router.post('/consent', function (req, res) {
  res.redirect('reason')
})

router.post('/reason', function (req, res) {
  if (req.session.data['whychangeaccess'] == 'I want to update my own details') {
    res.redirect('new-email')
  } else {
    res.redirect('who-receives')
  }
})

router.post('/who-receives', function (req, res) {
  if (req.session.data['whowillreceiveinvite'] == 'The appellant') {
    res.redirect('new-email')
  } else {
    res.redirect('contact-details')
  }
})

router.post('/new-email', function (req, res) {
  res.redirect('phone-number')
})

router.post('/phone-number', function (req, res) {
  res.redirect('check-email')
})

router.post('/check-email', function (req, res) {
  req.flash('success', 'Access invitation sent')
  res.redirect('appellant-submission-full')
})

router.post('/confirm-email', function (req, res) {
  res.redirect('enter-code--confirm-email')
})

// Add your routes above the module.exports line
module.exports = router