const express = require('express')
const router = new express.Router()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Find and comment on planning appeals',
  res.locals['caption'] = 'Comment on a planning appeal'
  next()
})

router.post('/your-name', function (req, res) {

  let firstName = req.session.data['interested-first-name']
  let lastName = req.session.data['interested-last-name']

  res.locals['fullName'] = (firstName +' '+lastName);
  res.redirect('your-email')
})

router.post('/your-email', function (req, res) {
  res.redirect('add-comments')
})

router.post('/add-comments', function (req, res) {
  res.redirect('documents-check')
})

router.post('/documents-check', function (req, res) {
  if (req.session.data['adding-documents'] == 'Yes') {
    res.redirect('documents-upload')
  } else {
    res.redirect('check-your-answers')
  }
})

router.post('/documents-upload', function (req, res) {
  res.redirect('check-your-answers')
})

router.post('/check-your-answers', function (req, res) {
  res.redirect('confirmation')
})

// Add your routes above the module.exports line
module.exports = router