const express = require('express')
const router = new express.Router()

// Set variables
// router.get('*', function(req, res, next){
//   // Change the service name for this feature
//   res.locals['serviceName'] = 'Example'
//   next()
// })



router.post('/return/', function (req, res) {
  res.redirect('../your-appeals')
})





// Add your routes above the module.exports line
module.exports = router
