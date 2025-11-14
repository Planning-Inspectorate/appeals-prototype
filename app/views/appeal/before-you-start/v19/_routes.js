const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Change the service name URL so it goes to the beginning
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'+req.originalUrl.split('/')[2]+'/'

  next()
})

// CYA links post back to the end
// Doesn't work for complex questions that would require other things to be shown but a quick prototype hack is better than nothing
router.post('*', function(req, res, next){
  if (req.session.data['cya']) {
    delete req.session.data['cya']
    res.redirect('cya');
  } else {
    next()
  }
})

router.post('/', function (req, res) {
  res.redirect('lpa')
})

router.post('/lpa', function (req, res) {
  res.redirect('enforcement')
})

router.post('/enforcement', function (req, res) {
  if (req.session.data['enforcementStatus'] != 'Yes') {
    res.redirect('planning-type');
  } else {
    res.redirect('errors/no-enforcement');
  }
})

//Appeal type

router.post('/planning-type', function (req, res) { // routing for different appeal types

  if (req.session.data['planning-type'] == 'Minor commercial development') {
    res.redirect('commercial-check');
  } else {
    res.redirect('planning/application-date');
  }

})

// commercial check

router.post('/commercial-check', function (req, res) { // routing for different appeal types
  // removed the 'more' option in the form - code still works
  if (req.session.data['commercial-check'] != 'Yes') {
    res.redirect('planning/application-date?appealIs=CASplanning');
  } else {
    res.redirect('planning/application-date?appealIs=fullplanning');
  }
})

router.post('/planning/application-date', function (req, res) {
  res.redirect('decision');
})


router.post('/planning/decision', function (req, res) {
  const decision = req.session.data['decision'];
  const planningType = req.session.data['planning-type'];
  const appYear = parseInt(req.session.data['application-date-year']);

  // Decision received (Granted or Refused)
  if (decision === 'Granted' || decision === 'Refused') {

    // Handle Householder appeal explicitly
    if (planningType === 'Householder') {
      return res.redirect('decision-date?appealIs=HASplanning');
    }

    // Handle Advertisement appeals
    if (planningType === 'Displaying an advertisement') {
      return res.redirect(
        decision === 'Granted'
          ? 'decision-date?appealIs=advert'
          : 'decision-date?appealIs=CASadvert'
      );
    }

    // Handle S78 types (Full, Outline, Reserved matters)
    if (['Full planning', 'Outline planning', 'Reserved matters'].includes(planningType)) {
      if (appYear > 2025) {
        return res.redirect('decision-date?appealIs=expedited'); // Part 1 appeal
      } else {
        return res.redirect('decision-date?appealIs=fullplanning'); // Regular S78
      }
    }

    // Other planning types (not advert, not S78, not Householder)
    return res.redirect('decision-date?appealIs=other');

  } else {
    // Decision not received yet
    if (planningType === 'Displaying an advertisement') {
      return res.redirect('decision-due-date?appealIs=advert');
    }
    return res.redirect('decision-due-date?appealIs=fullplanning');
  }
});


router.post('/planning/decision-date', function (req, res) {
  res.redirect('cya')
})

router.post('/planning/decision-due-date', function (req, res) {
  res.redirect('cya')
})

// CHECK YOUR ANSWERS

router.post('/planning/cya', function (req, res) {

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
      res.redirect('/appeal/verify-email/v1/confirm-email');
      break;
    case 'expedited':
      res.redirect('/appeal/verify-email/v1/confirm-email');
      break;
    case 'HASplanning':
      res.redirect('/appeal/has/v3/before-you-continue');
      break;
    default:
      res.redirect('/appeal/generic/v3/before-you-continue');
  }

})

// Add your routes above the module.exports line
module.exports = router
