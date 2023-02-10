const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Add return to task list
  res.locals['return'] = true

  next()
})

router.post('/final-comment-check', function (req, res) {
  if (req.session.data['adding-comment'] == 'No') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('final-comments')
  }
})

router.post('/final-comments', function (req, res) {
  res.redirect('documents-check')
})

router.post('/documents-check', function (req, res) {
  if (req.session.data['adding-documents'] == 'No') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('documents-upload')
  }
})

router.post('/documents-upload', function (req, res) {
  res.redirect('check-your-answers')
})




// Add your routes above the module.exports line
module.exports = router
