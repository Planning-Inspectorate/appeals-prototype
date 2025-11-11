const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your planning inspectorate appeals'
  next()
})
// enter code
router.post('/enter-code', function (req, res) {
  res.redirect('enter-statement')
})

// enter statement
router.post('/start', function (req, res) {
  res.redirect('enter-statement')
})

// enter statement
router.post('/enter-statement', function (req, res) {
  res.redirect('documents-check')
})

// do you want to upload docs?
router.post('/documents-check', function (req, res) {
  if (req.session.data['adding-documents'] == 'Yes') {
    res.redirect('documents-upload')
  } else {
    res.redirect('check-your-answers')
  }
})

// upload docs page
router.post('/documents-upload', function (req, res) {
  res.redirect('check-your-answers')
})



// Add your routes above the module.exports line
module.exports = router
