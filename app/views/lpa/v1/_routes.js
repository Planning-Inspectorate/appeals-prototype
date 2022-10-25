const express = require('express')
const router = new express.Router()

// Set variables
router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Example'
  next()
})

// email
router.post('/email', function (req, res) {
  res.redirect('enter-code?start=direct')
})

// enter code
router.post('/enter-code', function (req, res) {
  if (req.session.data['start'] == 'invite') {
    res.redirect('no-appeals')
  } else if (req.session.data['start'] == 'added') {
    res.redirect('no-appeals')
  } else if (req.session.data['start'] == 'questionnaire') {
      res.redirect('/lpa-questionnaire/v10/task-list')
  } else {
    res.redirect('appeals?appeals=new')
  }
})

// give access
router.post('/give-access', function (req, res) {
  res.redirect('check-email')
})

// check email
router.post('/check-email', function (req, res) {
  res.redirect('access?action=added&shared=yes')
})

// confirm remove
router.post('/confirm-remove', function (req, res) {
  res.redirect('access?action=removed&shared=')
})

// Add your routes above the module.exports line
module.exports = router
