const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Comment on a planning appeal',
  res.locals['caption'] = 'Comment on a planning appeal'
  next()
})

router.post('/your-name', function (req, res) {

  // name defaults
  let firstname = req.session.data['interested-first-name']
  let lastname = req.session.data['interested-last-name']

  // route depending on value
  if (firstname == null ) {
    res.locals['firstname'] = 'Sam',
    res.locals['lastname'] = 'Fisher'
  }

  res.redirect('your-email')
})

router.post('/your-email', function (req, res) {
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
