const express = require('express')
const router = new express.Router()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'

  next()
})









// Add your routes above the module.exports line
module.exports = router