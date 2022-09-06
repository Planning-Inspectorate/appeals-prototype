const express = require('express')
const router = new express.Router()

/**********************
 *** FINAL COMMENTS ***
/**********************/

// Input code
//////////////////////
router.post('/input-code', function (req, res) {
  res.redirect('final-comments')
})

// Contact details
//////////////////////
router.post('/comment', function (req, res) {
  res.redirect('supporting-check')
})

// Application identity
//////////////////////
router.post('/supporting-check', function (req, res) {

  // Make a variable from session data
  let documents = req.session.data['supporting-check']

  if (documents == 'Yes') {
    res.redirect('supporting-upload')
  } else {
    res.redirect('confirmation')
  }
})

// Upload
//////////////////////
router.post('/supporting-upload', function (req, res) {
  res.redirect('confirmation')
})


// Add routes above
//
//
//
//
//
//
//
//
module.exports = router
