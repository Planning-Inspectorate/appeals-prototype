const express = require('express')
const router = new express.Router()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'

  next()
})

router.post('/add-user', function (req, res) {
  res.redirect('add-user--confirm')
})

router.post('/add-user--confirm', function (req, res) {
  // Check if the email input has been filled in, if not add example
  if (req.session.data['add-user-email']) {
    newEmail = req.session.data['add-user-email']
  } else {
    newEmail = 'example'
  }
  // Setup the object with the new user
  const newUser = Object.assign({
    email: newEmail+req.session.data['lpa-email']
  })

  // Pass the above object into the array
  req.session.data['users'].unshift(newUser)

  // Confirmation page
  res.redirect('./?action=added');
})

// Remove a user
router.post('/remove-user', function (req, res) {
    // user is grabbed from the data set in the url
    let user = req.session.data['id']
    // users is the array
    let users = req.session.data['users']
    // delete the item from the array
    delete users[user]

    res.redirect('./?action=removed');
})







// Add your routes above the module.exports line
module.exports = router