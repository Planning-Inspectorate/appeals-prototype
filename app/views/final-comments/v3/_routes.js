const express = require('express')
const router = new express.Router()

//
// SUBMIT COMMENTS
//
router.post('/submit/final-comments', function (req, res) {
  res.redirect('documents-check')
})

router.post('/submit/documents-check', function (req, res) {
  if (req.session.data['adding-documents'] == 'Yes') {
    res.redirect('documents-upload')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/submit/documents-upload', function (req, res) {
  res.redirect('check-your-answers')
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