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

  // reset values and show new
  if (req.session.data['email'] == 1) {
  // email is true
    if (req.session.data['post'] == 1) {
      // both post and email
      if (req.session.data['from'] == 'appeals') {
        res.redirect('/manage/appeals/v3/?action=notified&emailed=1&posted=1&notice=6&post=&email=')
      } else {
        res.redirect('/manage/appeals/v3/appeal-details?action=notified&emailed=1&posted=1&notice=6&post=&email=')
      }
    } else {
      // email only
      if (req.session.data['from'] == 'appeals') {
        res.redirect('/manage/appeals/v3/?action=notified&emailed=1&notice=3&post=&email=')
      } else {
        res.redirect('/manage/appeals/v3/appeal-details?action=notified&emailed=1&notice=3&post=&email=')
      }
    }

  } else {
    // post only
    if (req.session.data['from'] == 'appeals') {
      res.redirect('/manage/appeals/v3/?action=notified&posted=1&notice=3&post=&email=')
    } else {
      res.redirect('/manage/appeals/v3/appeal-details?action=notified&posted=1&notice=3&post=&email=')
    }

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
