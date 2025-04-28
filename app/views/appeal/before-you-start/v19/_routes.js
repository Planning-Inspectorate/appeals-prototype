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
    res.redirect('planning/application-date?appealIs=planning%20CAS');
  } else {
    res.redirect('planning/application-date?appealIs=full%20planning');
  }

})

router.post('/planning/application-date', function (req, res) {
  res.redirect('decision');
})

router.post('/planning/decision', function (req, res) {

  // decision was received:

  if (req.session.data['decision'] == 'Granted' || req.session.data['decision'] == 'Refused' ) {

    // then check that the appeal type is not MCD
    if (req.session.data['planning-type'] != 'Minor commercial development') {

      // then set vars for appeal type, based on decision
      // if the appeal type was ‘Displaying an advert’
      if (req.session.data['planning-type'] == 'Displaying an advertisement') {
        if (req.session.data['decision'] == 'Granted') {
          res.redirect('decision-date?appealIs=advert');
        } else {
          res.redirect('decision-date?appealIs=CAS%20advert');
        }
      } else { // S78
        res.redirect('decision-date?appealIs=full%20planning');
      }

    } else {

      res.redirect('decision-date');

    }

  // decision was not received:
  } else {

    // then check that the appeal type is Displaying an advert
    if (req.session.data['planning-type'] == 'Displaying an advertisement') {

      // then set vars for appeal type, based on decision
      res.redirect('decision-due-date?appealIs=advert');

    } else {

      res.redirect('decision-due-date');

    }

  }

})

router.post('/planning/decision-date', function (req, res) {

  let type = req.session.data['planning-type']
  let appmonth = req.session.data['application-date-month']
  let appyear = req.session.data['application-date-year']
  let decision = req.session.data['decision']

  console.log(typeof appmonth)

  // check appeal type for expedited appeal
  if (type == 'Full planning' || type == 'Outline planning' || type == 'Reserved matters') {

    // check date of application for after legislation is live
    if (parseInt(appmonth) > 8 && parseInt(appyear) > 2024) {

      // check decision has been received
      if (decision != 'I have not received a decision') {

        res.redirect('cya?appealIs=expedited')

      } else {
        res.redirect('cya')
      }

    } else {
      res.redirect('cya')
    }

  } else {
    res.redirect('cya')
  }

})

router.post('/planning/decision-due-date', function (req, res) {

  let type = req.session.data['planning-type']
  let appmonth = req.session.data['application-date-month']
  let appyear = req.session.data['application-date-year']
  let decision = req.session.data['decision']

  console.log(typeof appmonth)

  // check appeal type for expedited appeal
  if (type == 'Full planning' || type == 'Outline planning' || type == 'Reserved matters') {

    // check date of application for after legislation is live
    if (parseInt(appmonth) > 8 && parseInt(appyear) > 2024) {

      // check decision has been received
      if (decision != 'I have not received a decision') {

        res.redirect('cya?appealIs=expedited')

      } else {
        res.redirect('cya')
      }

    } else {
      res.redirect('cya')
    }

  } else {
    res.redirect('cya')
  }

})

// CHECK YOUR ANSWERS

router.post('/planning/cya', function (req, res) {

  if (req.session.data['appealIs'] == 'full%20planning') {
    res.redirect('/appeal/full/v5/before-you-continue');
  } else if (req.session.data['appealIs'] == 'CAS') {
    res.redirect('/appeal/has/v3/before-you-continue');
  } else {
    res.redirect('/appeal/cas-adverts/v1/');
  }

})

// Add your routes above the module.exports line
module.exports = router
