const express = require('express')
const router = new express.Router()





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
  res.redirect('appeal-type')
})

router.post('/appeal-type', function (req, res) {
  let type = req.session.data['appeal-type']

  switch (type) {
    case 'advertisement application':
    case 'discontinueance notice':
      res.redirect('errors/certain-types');
      break;
    case 'enforcement notice':
      res.redirect('enforcement/listed-building-check');
      break;
    case 'lawful development certificate':
      res.redirect('ldc/section-of-law');
      break;
    case 'planning application':
    default:
      res.redirect('planning/type');
  }
})





// PLANNING
router.post('/planning/type', function (req, res) {
  let type = req.session.data['planning-type']

  switch (type) {
    case 'Householder planning':
      res.redirect('decision');
      break;
    case 'Prior approval':
    case 'Removal or variation of conditions':
      res.redirect('existing-home-check');
      break;
    default:
      res.redirect('major-development-check');
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

router.post('/planning/decision*date', function (req, res) {
  res.redirect('enforcement-check')
})

router.post('/planning/enforcement-check', function (req, res) {
  if (req.session.data['enforcement-check'] == 'Yes') {
    res.redirect('../errors/no-enforcement');
  } else {
    res.redirect('cya')
  }
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









// Add your routes above the module.exports line
module.exports = router