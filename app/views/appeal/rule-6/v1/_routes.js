const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  next()
})


router.post('/email', function (req, res) {
  res.redirect('enter-code')
})

router.post('/enter-code', function (req, res) {
  if (req.session.data['hub']) {
    res.redirect('your-appeals')
  } else {

    if (req.session.data['current-appeals'] != 'no') {
      res.redirect('appeal-details?questionnaire=complete&lpa-statement=&rule6-statement=due&r6-statement=&ip-comments=&proofs=&lpa-proofs=&appellant-proofs=&timings=&other-timings=&appeal-decided=')
    } else {
      res.redirect('access-revoked')
    }

  }
})

// Add your routes above the module.exports line
module.exports = router
