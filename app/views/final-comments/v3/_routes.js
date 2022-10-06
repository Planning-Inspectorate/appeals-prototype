const express = require('express')
const router = new express.Router()

/**********************
 *** FINAL COMMENTS ***
/**********************/

// Input code
//////////////////////
router.post('/input-code', function (req, res) {
  res.redirect('final-comments-check')
})

// Do they want to add final comments
//////////////////////
router.post('/final-comments-check', function (req, res) {
  // Make a variable from session data
  let havecomments = req.session.data['adding-final-comments']
  if (havecomments == 'Yes') {
    res.redirect('final-comments')
  } else {
    res.redirect('documents-check')
  }
})

// Contact details
//////////////////////
router.post('/final-comments', function (req, res) {
  res.redirect('documents-check')
})

// Do they want to upload documents
//////////////////////
router.post('/documents-check', function (req, res) {

  // Make a variable from session data
  let documents = req.session.data['supporting-check']

  if (documents == 'Yes') {
    res.redirect('documents-upload')
  } else {
    res.redirect('confirmation')
  }
})

// Upload
//////////////////////
router.post('/documents-upload', function (req, res) {
  res.redirect('confirmation')
})







//
// CREATE LINK
//
router.post('/create-link/appeal-search', function (req, res) {
  let current = (res.locals.currentURL).replace(/^\//g, '')
  if (req.session.data['appeal-ref'] == 'error') {
    res.render(current, {
      error: 'You have entered an invalid reference or the appeal could not be found'
    })
  } else {
    res.redirect('appeal');
  }
})

router.post('/create-link/appeal', function (req, res) {
  res.redirect('appeal-link')
})














// Add routes above
module.exports = router