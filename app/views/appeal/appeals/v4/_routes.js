const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  next()
})

router.post('/consent', function (req, res) {
  res.redirect('/who-receives')
})

router.post('/who-receives', function (req, res) {
  if (req.session.data['whowillreceiveinvite'] == 'The agent') {
    res.redirect('contact-details')
  } else {
    res.redirect('new-email')
  }
})

router.post('/contact-details', function (req, res) {
  res.redirect('new-email')
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