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


// page routes
router.post('/appellant-check', function (req, res) {

  let appellantCheck = req.session.data['appellant-check']

  if (appellantCheck === 'individuals') {
    res.redirect('appellant-name')
  } else {
    res.redirect('organisation-name')
  }
})

router.post('/organisation-name', function (req, res) {
  res.redirect('your-contact-details');
})

router.post('/appellant-name', function (req, res) {
  res.redirect('appellant-names');
})


router.post('/appellant-names', function (req, res) {

  let appellantNames = req.session.data['add-more-names']

  if (appellantNames === 'Yes') {
    res.redirect('appellant-name?multiplenames=yes')
  } else {
    res.redirect('agent-check-joint-application')
  }
})

router.post('/agent-check-joint-application', function (req, res) {
 if (req.session.data['agent-check-joint-application'] == 'other') {
  res.redirect('your-contact-details')
 } else {
   res.redirect('contact-phone-number')
 }
})


router.post('/your-contact-details', function (req, res) {
  res.redirect('contact-phone-number')
})

router.post('/contact-phone-number', function (req, res) {
  res.redirect('agent-notice')
})

// page routes



// Add your routes above the module.exports line
module.exports = router
