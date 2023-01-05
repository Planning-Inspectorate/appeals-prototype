const express = require('express')
const router = new express.Router()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Planning Inspectorate design patterns'
  next()
})

router.post('/file-upload/documents-check', function (req, res) {
  if (req.session.data['adding-documents'] == 'Yes') {
    res.redirect('listed-building-details');
  } else {
    res.redirect('affected-listed-building-check');
  }
})

// Add your routes above the module.exports line
module.exports = router
