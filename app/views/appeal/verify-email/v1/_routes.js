const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Change the service name URL so it goes to the beginning
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'+req.originalUrl.split('/')[2]+'/'

  next()
})

router.post('/confirm-email', function (req, res) {
  res.redirect('enter-code--confirm-email?newcode=');
})

router.post('/enter-code--confirm-email', function (req, res) {

  // route back to another appeal form depending on what the appeal type is
  // appealIs = what kind of appeal is it

  let appealtype = req.session.data['appealIs']

  switch (appealtype) {
    case 'advert':
    case 'CASadvert':
      res.redirect('/appeal/cas-adverts/v1/');
      break;
    case 'CASplanning':
      res.redirect('/appeal/cas-planning/v1/');
      break;
    case 'fullplanning':
      res.redirect('/appeal/full/v5/before-you-continue');
      break;
    case 'expedited':
      res.redirect('/appeal/s78e/v2/before-you-continue');
      break;
    case 'HASplanning':
      res.redirect('/appeal/has/v3/before-you-continue');
      break;
    default:
      res.redirect('/appeal/full/v5/before-you-continue');
  }


})

router.get('/resend-code', function (req, res) {
  let path = req.baseUrl.replace(/^\//g, '')

  res.render(path+'/enter-code', { resent: true })
})


// Add your routes above the module.exports line
module.exports = router
