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
  res.redirect('planning/type')
})

// PLANNING TYPE
router.post('/planning/type', function (req, res) {
  let type = req.session.data['planning-type']

  switch (type) {
    case 'Full planning':
      res.redirect('any-of-following?type=full');
      break;
    case 'Householder planning':
      res.redirect('decision?type=has');
      break;
    case 'Listed building consent':
      res.redirect('major-development-check');
      break;
    case 'Prior approval':
    case 'Removal or variation of conditions':
      res.redirect('existing-home-check');
      break;
    default:
      res.redirect('major-development-check');
  }
})

// any of the following filter
router.post('/planning/any-of-following', function (req, res) {
  let type = req.session.data['planning-type']

  switch (type) {
    case 'Full planning':
      res.redirect('any-of-following?type=full');
      break;
    case 'Householder planning':
      res.redirect('decision?type=has');
      break;
    case 'Listed building consent':
      res.redirect('major-development-check');
      break;
    case 'Prior approval':
    case 'Removal or variation of conditions':
      res.redirect('existing-home-check');
      break;
    default:
      res.redirect('major-development-check');
  }
})

router.post('/planning/listed-building', function (req, res) {
  if (req.session.data['type'] == 'full') {
    res.redirect('major-development-check');
  } else {
    res.redirect('decision');
  }
})

router.post('/planning/existing-home-check', function (req, res) {
  if (req.session.data['existing-home-check'] == 'No') {
    res.redirect('major-development-check');
  } else {
    res.redirect('decision');
  }
})

router.post('/planning/major-development-check', function (req, res) {
  if (req.session.data['major-development-check'] == 'Yes') {
    res.redirect('../errors/no-major');
  } else {
    res.redirect('decision')
  }
})

router.post('/planning/decision', function (req, res) {
  if (req.session.data['decision'] == 'I have not received a decision') {
    res.redirect('decision-due-date');
  } else {
    res.redirect('decision-date');
  }
})

router.post('/planning/decision-date', function (req, res) {
  res.redirect('cya')
})

// LAWFUL DEVELOPMENT CERTIFICATE

router.post('/ldc/section-of-law', function (req, res) {
  res.redirect('application-date')
})

router.post('/ldc/application-date', function (req, res) {
  res.redirect('decision-check')
})

router.post('/ldc/decision-check', function (req, res) {
  if (req.session.data['decision-check'] == 'No') {
    res.redirect('cya')
  } else {
    res.redirect('decision-date')
  }
})

router.post('/ldc/decision-date', function (req, res) {
  res.redirect('cya')
})

// ENFORCEMENT

router.post('/planning/enforcement-check', function (req, res) {
  if (req.session.data['enforcementStatus'] == 'No') {
    res.redirect('listed-building-appeal')
  } else {
    res.redirect('errors/no-enforcement');
  }
})

router.post('/enforcement/listed-building-check', function (req, res) {
  res.redirect('issue-date')
})

router.post('/enforcement/issue-date', function (req, res) {
  res.redirect('effective-date')
})

router.post('/enforcement/effective-date', function (req, res) {
  res.redirect('cya')
})



// CHECK YOUR ANSWERS

router.post('*/cya', function (req, res) {
  if (req.session.data['bys-next']) {
    res.redirect(req.session.data['bys-next']);
  } else {
    res.redirect('cya');
  }
})



// CYA continue button (not working right now)
// Need to link this to the various appeal submission journeys
router.post('/planning/cya', function (req, res) {
  let type = req.session.data['planning-type']

  switch (type) {
    case 'Full planning':
      res.redirect('/full/v3/tasklist?type=full');
      break;
    case 'Householder planning':
      res.redirect('/has/v2/tasklist?type=full');
      break;
    case 'Listed building consent':
      if (req.session.data['type'] == 'both') {
        res.redirect(req.session.data['both']);
      } else {
        res.redirect('cya');
      }
      res.redirect('lbc/v1/task-list');
      break;
    case 'Prior approval':
    case 'Removal or variation of conditions':
      res.redirect('existing-home-check');
      break;
    default:
      res.redirect('major-development-check');
  }
})


// Add your routes above the module.exports line
module.exports = router
