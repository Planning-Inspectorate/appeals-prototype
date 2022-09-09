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
router.post('/final-comments', function (req, res) {
  res.redirect('supporting-check')
})

// Do they want to upload documents
//////////////////////
router.post('/supporting-check', function (req, res) {

  // Make a variable from session data
  let documents = req.session.data['supporting-check']
  let comments = req.session.data['final-comments']

  if (documents == 'Yes') {
    res.redirect('supporting-upload')
  } else {
    if (comments != true) {
      res.redirect('no-final-comments')
    } else {
      res.redirect('confirmation')
    }
  }
})

// Upload
//////////////////////
router.post('/supporting-upload', function (req, res) {
  let uploaded = req.session.data['supporting-docs']
  if (uploaded == null) {
    res.redirect('no-final-comments')
  } else {
    res.redirect('confirmation')
  }
})

// If nothing has been added, show this
//////////////////////
router.post('/no-final-comments', function (req, res) {
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
