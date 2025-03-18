const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Comment on a planning appeal',
  res.locals['caption'] = 'Comment on a planning appeal'
  next()
})

router.post('/age-declaration', function (req, res) {
  if (req.session.data['age-declaration'] == 'No') {
    res.redirect('postcode-check')
  } else {
    res.redirect('your-name')
  }
})

router.post('/your-name', function (req, res) {
  if (req.session.data['interested-first-name']) {
    res.redirect('email-check')
  } else {
    res.locals['interested-first-name'] = 'Sam',
    res.locals['interested-last-name'] = 'Fisher'
    res.redirect('email-check?interested-first-name=Sam&interested-last-name=Fisher')
  }
})

router.post('/email-check', function (req, res) {
  if (req.session.data['email-check'] == 'No') {
    res.redirect('address-check')
  } else {
    res.redirect('your-email')
  }
})

router.post('/your-email', function (req, res) {
  res.redirect('address-check')
})

router.post('/address-check', function (req, res) {
  if (req.session.data['address-check'] == 'No') {
    res.redirect('add-comments')
  } else {
    res.redirect('address')
  }
})

router.post('/address', function (req, res) {
  res.redirect('add-comments')
})

router.post('/postcode-check', function (req, res) {
  if (req.session.data['postcode-check'] == 'No') {
    res.redirect('add-comments')
  } else {
    res.redirect('postcode')
  }
})

router.post('/postcode', function (req, res) {
  res.redirect('add-comments')
})

router.post('/add-comments', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/documents-check', function (req, res) {
  if (req.session.data['adding-documents'] == 'Yes') {
    res.redirect('documents-upload')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/documents-upload', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/check-your-answers', function (req, res) {
  res.redirect('confirmation')
})

// Add your routes above the module.exports line
module.exports = router
