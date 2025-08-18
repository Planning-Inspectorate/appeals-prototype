const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  next()
})

// do you want to upload docs?
router.post('/index', function (req, res) {
  if (req.session.data['appeals-list'] == 'Active') {
    res.redirect('/?appeals-list=Active')
  } else if (req.session.data['appeals-list'] == 'Waiting') {
    res.redirect('/?appeals-list=Waiting')
  } else if (req.session.data['appeals-list'] == 'Withdrawn') {
    res.redirect('/?appeals-list=Withdrawn')
  } else {
    res.redirect('/?appeals-list=Decided')
  }
})

// Add your routes above the module.exports line
module.exports = router
