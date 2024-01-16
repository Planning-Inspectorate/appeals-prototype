const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Add return to task list
  res.locals['return'] = true

  next()
})

router.post('/final-planning-obligation-check', function (req, res) {
  if (req.session.data['adding-planning-obligation'] == 'No') {
    res.redirect('check-your-answers')
  } else {
    res.redirect('upload-planning-obligation')
  }
})

router.post('/upload-planning-obligation', function (req, res) {
  res.redirect('check-your-answers')
})


router.post('/check-your-answers', function (req, res) {
  res.redirect('confirmation')
})


// Add your routes above the module.exports line
module.exports = router
