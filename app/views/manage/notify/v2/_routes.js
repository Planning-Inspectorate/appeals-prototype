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
  } else if (req.session.data['sendby'] == 'print') {
    res.redirect('/manage/appeals/v3/?action=printed')
  } else {
    res.redirect('send-email')
  }
})

router.post('/send-email', function (req, res) {
  res.redirect('check-list?email=1')
  // email is set to true to help the checklist page know what to show
})

router.post('/check-list', function (req, res) {
  // return user to the place where they started the notify action
  if (req.session.data['from'] == 'appeal') {
    res.redirect('/manage/appeals/v3/appeal-details?action=notified')
  } else {
    res.redirect('/manage/appeals/v3/?action=notified')
  }
})

router.post('/postcode-search', function (req, res) {
  res.redirect('select-address')
})

router.post('/select-address', function (req, res) {
  res.redirect('check-list?post=1')
  // post is set to true to help the checklist page know what to show
})

router.post('/address-list', function (req, res) {
  res.redirect('/manage/appeals/v3/?action=notified')
})


// Add your routes above the module.exports line
module.exports = router
