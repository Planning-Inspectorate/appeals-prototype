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
  if (req.session.data['enforcementStatus'] == 'No') {
    res.redirect('appeal-type');
  } else {
    res.redirect('errors/no-enforcement');
  }
})

//Appeal type

router.post('/appeal-type', function (req, res) { // routing for different appeal types

  let type = req.session.data['appeal-type']

  switch (type) {
    case 'Minor commercial development':
      res.redirect('commercial-check');
      break;
    default:
      res.redirect('planning/decision');
  }

})

// commercial check

router.post('/commercial-check', function (req, res) { // routing for different appeal types

  // removed the 'more' option in the form - code still works
  if (req.session.data['commercial-check'] == 'None of these') {
    res.redirect('planning/decision?appealType=PlanningCAS');
  } else {
    res.redirect('planning/decision?appealType=FullPlanning');
  }

})


router.post('/planning/decision', function (req, res) {

  // decision was received:

  if (req.session.data['decision'] == 'Granted' || req.session.data['decision'] == 'Refused' ) {

    // then check that the appeal type is not MCD
    if (req.session.data['appeal-type'] != 'Minor commercial development') {

      // then set vars for appeal type, based on decision
      // if the appeal type was ‘Displaying an advert’
      if (req.session.data['appeal-type'] == 'Displaying an advertisement') {
        if (req.session.data['decision'] == 'Granted') {
          res.redirect('decision-date?appealType=Advert');
        } else {
          res.redirect('decision-date?appealType=CASAdvert');
        }
      } else { // S78
        res.redirect('decision-date?appealType=FullPlanning');
      }

    } else {

      res.redirect('decision-date');

    }

  // decision was not received:
  } else {

    // then check that the appeal type is Displaying an advert
    if (req.session.data['appeal-type'] == 'Displaying an advertisement') {

      // then set vars for appeal type, based on decision
      res.redirect('decision-due-date?appealType=Advert');

    } else {

      res.redirect('decision-due-date');

    }

  }

})

router.post('/planning/decision-date', function (req, res) {
  res.redirect('cya')
})

router.post('/planning/decision-due-date', function (req, res) {
  res.redirect('cya')
})

// CHECK YOUR ANSWERS

router.post('/planning/cya', function (req, res) {

  if (req.session.data['appealType'] == 'FullPlanning') {
    res.redirect('/appeal/full/v5/before-you-continue');
  } else if (req.session.data['appealType'] == 'CAS') {
    res.redirect('/appeal/has/v3/before-you-continue');
  } else {
    res.redirect('/appeal/cas-adverts/v1/');
  }

})

// Add your routes above the module.exports line
module.exports = router
