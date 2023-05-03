const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Change the service name URL so it goes to the beginning
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'+req.originalUrl.split('/')[2]+'/'

  next()
})

router.post('/return-check', function (req, res) {
  if (req.session.data['return-check'] == 'Return to a saved appeal') {
    res.redirect('return-email');
  } else {
    res.redirect('before-you-start');
  }
})

router.post('/before-you-start', function (req, res) {
  res.redirect('before-you-start--cya');
})

router.post('/before-you-start--cya', function (req, res) {
  res.redirect('confirm-email');
})

router.post('/confirm-email', function (req, res) {
  res.redirect('enter-code--confirm-email?newcode=');
})

router.post('/enter-code--confirm-email', function (req, res) {
  res.redirect('email-confirmed');
})

router.post('/return-email', function (req, res) {
  res.redirect('enter-code');
})

router.post('/enter-code', function (req, res) {
  res.redirect('/appeal/lbc/v2/before-you-continue');
})

router.get('/resend-code', function (req, res) {
  let path = req.baseUrl.replace(/^\//g, '')

  res.render(path+'/enter-code', { resent: true })
})

router.post('/resend-code', function (req, res) {
  res.redirect('your-appeals');
})

router.post('/email-confirmed', function (req, res) {
  res.redirect('/appeal/lbc/v2/before-you-continue');
})


// Add your routes above the module.exports line
module.exports = router
