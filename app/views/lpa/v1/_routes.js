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
  res.redirect('use-code')
})

// use code
router.post('/use-code', function (req, res) {
  res.redirect('appeals')
})

// enter code
router.post('/enter-code', function (req, res) {
  res.redirect('/lpa-questionnaire/v10/task-list')
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
