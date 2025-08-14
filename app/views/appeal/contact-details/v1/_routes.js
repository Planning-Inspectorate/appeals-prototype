const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Change the service name URL so it goes to the beginning
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'+req.originalUrl.split('/')[2]+'/'

  // include link to return to task list
  res.locals['return'] = true

  next()
})



// CYA links post back to the end

router.post('/who-applied', function (req, res) {

  let applicant = req.session.data['who-applied']

  if (applicant == 'You') {
    res.redirect('appellant-contact-details');
  } else if (applicant == 'Another individual') {
    res.redirect('appellant-name');
  } else {
    res.redirect('organisation-name');
  }

})

router.post('/appellant-name', function (req, res) {
  res.redirect('agent-contact-details');
})

router.post('/organisation-name', function (req, res) {
  res.redirect('agent-contact-details');
})

router.post('/appellant-contact-details', function (req, res) {
  res.redirect('contact-phone-number');
})

router.post('/agent-contact-details', function (req, res) {
  res.redirect('contact-phone-number');
})

router.post('/contact-phone-number', function (req, res) {


  let appeal = req.session.data['appeal']

  if (appeal == 'S78E') {
    res.redirect('/appeal/s78e/v1/prepare-appeal/address');
  } else {
    res.redirect('/');
  }

})

// Add your routes above the module.exports line
module.exports = router
