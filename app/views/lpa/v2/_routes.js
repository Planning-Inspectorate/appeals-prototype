const express = require('express')
const router = new express.Router()

// Set variables
router.get('*', function(req, res, next){
  // If there are no users create an example
  if (!req.session.data['users']) {
    req.session.data['users'] = [{"email": "appeals@leeds.gov.uk"}]
  }
  next()
})

// email
router.post('/email', function (req, res) {
  res.redirect('enter-code?start=direct')
})

// enter code
router.post('/enter-code', function (req, res) {
  if (req.session.data['start'] == 'invite') {
    res.redirect('no-appeals')
  } else if (req.session.data['start'] == 'added') {
    res.redirect('no-appeals')
  } else if (req.session.data['start'] == 'questionnaire') {
      res.redirect('/lpa-questionnaire/v10/task-list')
  } else {
    res.redirect('appeals?appeals=new')
  }
})

// confirm remove
router.post('/give-access', function (req, res) {
  res.redirect('check-email')
})

// Add a user
router.post('/check-email', function (req, res) {
  // Check if the email input has been filled in, if not add example
  if (req.session.data['email']) {
    newEmail = req.session.data['email']
  } else {
    newEmail = 'example'
  }
  // Setup the object with the new user
  const newUser = Object.assign({
    email: newEmail+'@leeds.gov.uk'
  })

  // Pass the above object into the array
  req.session.data['users'].unshift(newUser)

  // Confirmation page
  res.redirect('access?action=added');
})

// Remove a user
router.post('/confirm-remove', function (req, res) {
    // user is grabbed from the data set in the url
    let user = req.session.data['id']
    // users is the array
    let users = req.session.data['users']
    // delete the item from the array
    delete users[user]

    res.redirect('access?action=removed');
})

// confirm remove
router.post('/confirm-remove', function (req, res) {
  res.redirect('access?action=removed')
})

// Add your routes above the module.exports line
module.exports = router
