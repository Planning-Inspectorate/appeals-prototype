const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage my appeals'

  next()
})

router.post('/email', function (req, res) {
  res.redirect('/manage/access/v1/enter-code?start=start')
})

router.post('/access-email', function (req, res) {
  res.redirect('enter-code?start=access-email')
})

router.post('/enter-code', function (req, res) {
  res.redirect('/manage/appeals/v5/?action=&questionnaire=&submitted-appeals=yes&current-appeals=yes&new-appeals=yes')
})


// Add your routes above the module.exports line
module.exports = router
