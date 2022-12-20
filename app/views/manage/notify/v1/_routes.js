const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your planning inspectorate appeals'

  next()
})

router.post('/send-new', function (req, res) {
  if (req.session.data['sendby'] == 'letters') {
    res.redirect('postcode-search')
  } else {
    res.redirect('send-email')
  }
})

router.post('/send-email', function (req, res) {
  res.redirect('check-list')
})

router.post('/check-list', function (req, res) {
  if (req.session.data['from'] == 'appeal') {
    res.redirect('/manage/appeals/v3/appeal-details')
  } else {
    res.redirect('/manage/appeals/v3/?action=notified')
  }

})

router.post('/postcode-search', function (req, res) {
  res.redirect('select-address')
})

router.post('/select-address', function (req, res) {
  res.redirect('address-list')
})

router.post('/address-list', function (req, res) {
  res.redirect('/manage/appeals/v3/?action=notified')
})


// Add your routes above the module.exports line
module.exports = router
