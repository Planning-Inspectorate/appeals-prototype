const express = require('express')
const router = new express.Router()

router.post('/return/', function (req, res) {
  res.redirect('../your-appeals')
})

router.post('/update/grounds', function (req, res) {
  res.redirect('./')
})





// Add your routes above the module.exports line
module.exports = router
