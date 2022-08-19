const express = require('express')
const router = new express.Router()

router.post('*', function(req, res, next){
  if (req.session.data['cya']) {
    delete req.session.data['cya']
    res.redirect('../cya/');
  } else {
    next()
  }
})





//
// BEFORE YOU START
//
router.post('/before-you-start/', function (req, res) {
  res.redirect('appeal-type')
})

router.post('/before-you-start/appeal-type', function (req, res) {
  res.redirect('lpa')
})

router.post('/before-you-start/lpa', function (req, res) {
  res.redirect('reason')
})

router.post('/before-you-start/reason', function (req, res) {
  res.redirect('section')
})

router.post('/before-you-start/section', function (req, res) {
  if (req.session.data['section'] == '26H') {
    res.redirect('date')
  } else {
    res.redirect('cya')
  }
})

router.post('/before-you-start/date', function (req, res) {
  res.redirect('cya')
})

router.post('/before-you-start/cya', function (req, res) {
  res.redirect('../contact-details/')
})





//
// CONTACT DETAILS
//
router.post('/contact-details/', function (req, res) {
  res.redirect('appelant-name')
})

router.post('/contact-details/appelant-name', function (req, res) {
  if (req.session.data['appelant-check'] == 'No') {
    res.redirect('agent-details')
  } else {
    res.redirect('../site-details/')
  }
})

router.post('/contact-details/agent-details', function (req, res) {
  res.redirect('../site-details/')
})






//
// SITE DETAILS
//
router.post('/site-details/', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/site-details/site-visibility', function (req, res) {
  res.redirect('health-and-safety')
})

router.post('/site-details/health-and-safety', function (req, res) {
  res.redirect('../appeal-details/')
})





//
// APPEAL DETAILS
//
router.post('/appeal-details/', function (req, res) {
  if (req.session.data['section'] == '192' || req.session.data['section'] == '26H') {
    res.redirect('proposal')
  } else {
    res.redirect('site-usage')
  }
})

router.post('/appeal-details/proposal', function (req, res) {
  res.redirect('site-usage')
})

router.post('/appeal-details/site-usage', function (req, res) {
  res.redirect('enforcement-notice')
})

router.post('/appeal-details/enforcement-notice', function (req, res) {
  res.redirect('procedure')
})

router.post('/appeal-details/procedure', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry' || req.session.data['procedure'] == 'Hearing') {
    res.redirect('procedure--reason')
  } else {
    res.redirect('../uploads/common-ground')
  }
})

router.post('/appeal-details/procedure--reason', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry') {
    res.redirect('procedure--length')
  } else {
    res.redirect('../uploads/common-ground')
  }
})

router.post('/appeal-details/procedure--length', function (req, res) {
  res.redirect('../uploads/common-ground')
})





//
// UPLOADS
//
router.post('/uploads/common-ground', function (req, res) {
  res.redirect('appeal-statement')
})

router.post('/uploads/appeal-statement', function (req, res) {
  res.redirect('application')
})

router.post('/uploads/application', function (req, res) {
  res.redirect('plans')
})

router.post('/uploads/plans', function (req, res) {
  res.redirect('decision-letter')
})

router.post('/uploads/decision-letter', function (req, res) {
  res.redirect('new-plans-check')
})

router.post('/uploads/new-plans-check', function (req, res) {
  if (req.session.data['new-plans-check'] == 'Yes') {
    res.redirect('new-plans')
  } else {
    res.redirect('other-check')
  }
})

router.post('/uploads/new-plans', function (req, res) {
  res.redirect('other-check')
})

router.post('/uploads/other-check', function (req, res) {
  if (req.session.data['other-check'] == 'Yes') {
    res.redirect('other')
  } else {
    res.redirect('../cya/')
  }
})

router.post('/uploads/other', function (req, res) {
  res.redirect('../cya/')
})




// Add your routes above the module.exports line
module.exports = router