const express = require('express')
const router = new express.Router()

router.post('/question', function (req, res) {
  res.redirect('next-page')
})





// Add your routes above the module.exports line
module.exports = router
