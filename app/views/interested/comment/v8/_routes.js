const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Comment on a planning appeal',
  res.locals['caption'] = 'Comment on a planning appeal'
  next()
})

router.post('/your-name', function (req, res) {

  if (req.session.data['interested-first-name']) {
    res.redirect('your-email')
  } else {
    res.locals['interested-first-name'] = 'Sam',
    res.locals['interested-last-name'] = 'Fisher'
    res.redirect('your-email?interested-first-name=Sam&interested-last-name=Fisher')
  }

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
