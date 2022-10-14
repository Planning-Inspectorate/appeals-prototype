const express = require('express')
const router = new express.Router()





// CYA links post back to the end
// Doesn't work for complex questions that would require other things to be shown but a quick prototype hack is better than nothing
router.post('*', function(req, res, next){
  if (req.session.data['byscya']) {
    delete req.session.data['byscya']
    res.redirect('cya');
  } else if (req.session.data['cya']) {
    delete req.session.data['cya']
    res.redirect('../task-list');
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
  res.redirect('../save-and-return/email-address')
})





//
// PREPARE APPEAL
//
router.post('/appeal-details/:page', function (req, res, next) {
  req.session.data['appeal-details-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (
    req.session.data['contact-details-complete']
    && req.session.data['appellant-check-complete']
    && req.session.data['lpa-reference-complete']
    && req.session.data['enforcement-notice-complete']
    && req.session.data['address-complete']
    && req.session.data['site-visibility-complete']
    && req.session.data['health-and-safety-complete']
    && req.session.data['site-usage-complete']
    && req.session.data['procedure-complete']
  ){
    req.session.data['appeal-details-completed'] = 'true'
  }

  next()
})

router.post('/appeal-details/contact-details', function (req, res) {
  // If they leave it blank add an example email so the no email set isn't triggered
  if (!req.session.data['applicant-email']) {
    req.session.data['applicant-email'] = 'example@email.com'
  }

  // If no email was set they'll be directed here, this will return them to the save and return journey or carry on with the appeal
  if (req.session.data['saving']) {
    delete req.session.data['saving']
    res.redirect('../save-and-return/confirm')
  } else {
    res.redirect('appellant-check')
  }
})

router.post('/appeal-details/appellant-check', function (req, res) {
  if (req.session.data['appellant-check'] == 'Another individual') {
    res.redirect('appellant-name')
  } else if (req.session.data['appellant-check'] == 'A company') {
    res.redirect('company-name')
  } else {
    res.redirect('lpa-reference')
  }
})

router.post('/appeal-details/appellant-name', function (req, res) {
  res.redirect('lpa-reference')
})

router.post('/appeal-details/company-name', function (req, res) {
  res.redirect('lpa-reference')
})

router.post('/appeal-details/lpa-reference', function (req, res) {
  res.redirect('enforcement-notice')
})

router.post('/appeal-details/enforcement-notice', function (req, res) {
  res.redirect('address')
})

router.post('/appeal-details/address', function (req, res) {
  res.redirect('site-visibility')
})

router.post('/appeal-details/site-visibility', function (req, res) {
  res.redirect('health-and-safety')
})

router.post('/appeal-details/health-and-safety', function (req, res) {
  res.redirect('site-usage')
})

router.post('/appeal-details/site-usage', function (req, res) {
  if (req.session.data['section'] == '192' || req.session.data['section'] == '26H') {
    res.redirect('proposed-usage')
  } else {
    res.redirect('procedure')
  }
})

router.post('/appeal-details/proposed-usage', function (req, res) {
  res.redirect('proposal-started')
})

router.post('/appeal-details/proposal-started', function (req, res) {
  res.redirect('procedure')
})

router.post('/appeal-details/procedure', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry' || req.session.data['procedure'] == 'Hearing') {
    res.redirect('procedure--reason')
  } else {
    res.redirect('../uploads/application')
  }
})

router.post('/appeal-details/procedure--reason', function (req, res) {
  if (req.session.data['procedure'] == 'Inquiry') {
    res.redirect('procedure--length')
  } else {
    res.redirect('../uploads/application')
  }
})

router.post('/appeal-details/procedure--length', function (req, res) {
  res.redirect('procedure--witnesses')
})

router.post('/appeal-details/procedure--witnesses', function (req, res) {
  res.redirect('../uploads/application')
})





//
// UPLOADS
//
router.post('/uploads/:page', function (req, res, next) {
  req.session.data['uploads-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (
    req.session.data['application-complete']
    && req.session.data['plans-complete']
    && req.session.data['new-plans-check-complete']
    && req.session.data['other-check-complete']
  ){
    req.session.data['uploads-completed'] = 'true'
  }

  next()
})

router.post('/uploads/application', function (req, res) {
  res.redirect('plans')
})

router.post('/uploads/plans', function (req, res) {
  if (req.session.data['decision-check'] == 'Yes') {
    res.redirect('decision-letter')
  } else {
    res.redirect('appeal-statement')
  }
})

router.post('/uploads/decision-letter', function (req, res) {
  res.redirect('appeal-statement')
})

router.post('/uploads/appeal-statement', function (req, res) {
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
    res.redirect('../task-list')
  }
})

router.post('/uploads/other', function (req, res) {
  res.redirect('../task-list')
})





//
// SAVE AND RETURN
//
router.post('/save-and-return/email-address', function (req, res) {
  res.redirect('confirm')
})

router.post('/save-and-return/confirmed', function (req, res) {
  res.redirect('../task-list')
})





// Add your routes above the module.exports line
module.exports = router