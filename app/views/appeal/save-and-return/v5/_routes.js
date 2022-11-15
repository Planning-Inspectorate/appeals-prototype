const express = require('express')
const router = new express.Router()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Change the service name URL so it goes to the beginning
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'+req.originalUrl.split('/')[2]+'/'

  next()
})









// Add your routes above the module.exports line
module.exports = router