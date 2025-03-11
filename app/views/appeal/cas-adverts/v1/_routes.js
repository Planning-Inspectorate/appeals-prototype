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
    res.redirect('appeal-type')
  } else {
    res.redirect('errors/no-enforcement');
  }
})

router.post('/other-planning-types', function (req, res) {
  if (req.session.data['unsupported-appeals'] == 'No') {
    res.redirect('appeal-type');
  } else {
    res.redirect('errors/certain-types')
  }
})

router.post('/listed-building-appeal', function (req, res) {
  if (req.session.data['lbcStatus'] == 'No') {
    res.redirect('planning/type')
  } else {
    res.redirect('listed-building-options')
  }
})

//

router.post('/listed-building-options', function (req, res) {

  // removed the 'more' option in the form - code still works

  const data = req.session.data
  let lbcOption = req.session.data['appeal-option']

  if (! lbcOption) {                                          // no option given
    res.redirect('listed-building-options?error=true')
  } else if (lbcOption.includes('planning')) {                // otherwise, if it contains 'planning'
    if (lbcOption.includes('lbc')) {                          // …and 'lbc'
      res.redirect('planning/type?type=both')
    } else {
      res.redirect('planning/type?type=planning')             // otherwise it's planning related to lbc
    }
  } else {                                                    // if no planning and no more
    res.redirect('planning/decision?type=section20')          // this is lbc only
  }
})

router.post('/listed-building-consent', function (req, res) {
  if (req.session.data['lbcConsent'] == 'Yes') {
    res.redirect('planning/decision?type=lbc');
  } else {
    res.redirect('appeal-type?lbcConsent=No');
  }

})




// PLANNING
router.post('/planning/type', function (req, res) {
  let type = req.session.data['planning-type']

  switch (type) {
    case 'Full planning':
      res.redirect('decision?type=full');
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

// LB grade

router.post('/lb-grade', function (req, res) {
    res.redirect('./lb-preserve-grant-loan');
})

// LB use same answers
router.post('/lb-use-same-answers', function (req, res) {
  if (req.session.data['same-answers'] == 'yes') {
    res.redirect('./lb-grade')
  } else {
    res.redirect('./task-list');
  }
})

// LB decision

router.post('/planning/lb-decision', function (req, res) {
  res.redirect('../common/lb-decision-date');
})

// LB decision date

router.post('/common/lb-decision-date', function (req, res) {
  res.redirect('../planning/decision');
})

// LB preserve grant or loan

router.post('/lb-preserve-grant-loan', function (req, res) {
  res.redirect('./task-list');
})

// CHECK YOUR ANSWERS

router.post('*/cya', function (req, res) {
  res.redirect('../task-list');
})

//Appeal type

router.post('/appeal-type', function (req, res) { // routing for different appeal types

  const data = req.session.data
  let appealType = req.session.data['planning-type']

  if (appealType == 'Minor commercial development') {
    res.redirect('minor-commercial-development-type')
  } else {
    res.redirect('planning/decision');
  }

})

// Minor commercial development type
router.post('/minor-commercial-development-type', function (req, res) { // routing for different minor commercial development types

  const data = req.session.data
  let minorCommercialDevelopmentType = req.session.data['minor-commercial-development-type']

  if (minorCommercialDevelopmentType == 'none') {
    res.redirect('errors/certain-types')  // redirect the user to ACP
  } else if (minorCommercialDevelopmentType == 'planning') {
    res.redirect('cas-planning-type')
  } else {
    res.redirect('planning/decision');
  }

})


// CAS advertising type
router.post('/cas-planning-type', function (req, res) { // routing for different minor commercial development types

  const data = req.session.data
  let casType = req.session.data['cas-planning-type']

  if (casType.includes('none')) {         // if the user selects ‘None of these’
    res.redirect('planning/decision')     // go to the decision date
  } else {
    res.redirect('errors/certain-types')  // redirect the user to ACP
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
