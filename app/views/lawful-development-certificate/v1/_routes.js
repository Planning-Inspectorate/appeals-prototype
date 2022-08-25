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
  res.redirect('section')
})

// router.post('/before-you-start/reason', function (req, res) {
//   res.redirect('section')
// })

router.post('/before-you-start/section', function (req, res) {
  res.redirect('application-date')
})

router.post('/before-you-start/application-date', function (req, res) {
  res.redirect('decision-check')
})

router.post('/before-you-start/application-date', function (req, res) {
  res.redirect('decision-check')
})

router.post('/before-you-start/decision-check', function (req, res) {
  if (req.session.data['decision-check'] == 'No') {
    res.redirect('cya')
  } else {
    res.redirect('decision-date')
  }
})

router.post('/before-you-start/decision-date', function (req, res) {
  res.redirect('cya')
})

router.post('/before-you-start/cya', function (req, res) {
  res.redirect('../contact-details/')
})





//
// CONTACT DETAILS
//
router.post('/contact-details/', function (req, res) {
  res.redirect('application-check')
})

router.post('/contact-details/application-check', function (req, res) {
  if (req.session.data['application-check'] == 'Another individual') {
    res.redirect('appellant-name')
  } else if (req.session.data['application-check'] == 'A company') {
    res.redirect('company-name')
  } else {
    res.redirect('../site-details/address')
  }
})

router.post('/contact-details/appellant-name', function (req, res) {
  res.redirect('agent-details')
})

router.post('/contact-details/company-name', function (req, res) {
  res.redirect('agent-details')
})

router.post('/contact-details/agent-details', function (req, res) {
  res.redirect('../site-details/address')
})






//
// SITE DETAILS
//
router.post('/site-details/address', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/site-details/site-visibility', function (req, res) {
  res.redirect('health-and-safety')
})

router.post('/site-details/health-and-safety', function (req, res) {
  res.redirect('enforcement-notice')
})

router.post('/site-details/enforcement-notice', function (req, res) {
  res.redirect('site-usage')
})

router.post('/site-details/site-usage', function (req, res) {
  if (req.session.data['section'] == '192' || req.session.data['section'] == '26H') {
    res.redirect('../appeal-details/proposed-usage')
  } else {
    res.redirect('../appeal-details/lpa-reference')
  }
})





//
// APPEAL DETAILS
//
router.post('/appeal-details/proposed-usage', function (req, res) {
  res.redirect('proposal-started')
})

router.post('/appeal-details/proposal-started', function (req, res) {
  res.redirect('lpa-reference')
})

router.post('/appeal-details/lpa-reference', function (req, res) {
  res.redirect('procedure')
})

router.post('/appeal-details/procedure', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry' || req.session.data['procedure'] == 'Hearing') {
    res.redirect('procedure--reason')
  } else {
    res.redirect('../uploads/appeal-statement')
  }
})

router.post('/appeal-details/procedure--reason', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry') {
    res.redirect('procedure--length')
  } else {
    res.redirect('../uploads/common-ground-check')
  }
})

router.post('/appeal-details/procedure--length', function (req, res) {
  res.redirect('procedure--witnesses')
})

router.post('/appeal-details/procedure--witnesses', function (req, res) {
  res.redirect('../uploads/common-ground-check')
})





//
// UPLOADS
//
router.post('/uploads/common-ground-check', function (req, res) {
  if (req.session.data['common-ground-check'] == 'Yes') {
    res.redirect('common-ground')
  } else {
    res.redirect('appeal-statement')
  }
})

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





//
// SAVE AND RETURN
//
router.get('/save-and-return/', function (req, res) {
  if (req.session.data['appellant-email']) {
    req.session.data['save-email'] = req.session.data['appellant-email']
  } else if (req.session.data['agent-email']) {
    req.session.data['save-email'] = req.session.data['agent-email']
  } else {
    res.redirect('email')
  }

  if (req.session.data['save-email-confirmed']) {
    res.redirect('saved')
  } else if (req.session.data['save-email']) {
    res.redirect('confirm')
  } else {
    res.redirect('error')
  }
})

router.post('/save-and-return/email', function (req, res) {
  if (!req.session.data['save-email']) {
    req.session.data['save-email'] = 'example@email.com'
  }

  res.redirect('confirm')
})




// Add your routes above the module.exports line
module.exports = router