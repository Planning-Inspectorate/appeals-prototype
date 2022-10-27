const express = require('express')
const router = new express.Router()

// Set variables
router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Example'
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

// give access
router.post('/give-access', function (req, res) {
  res.redirect('check-email')
})


// when the email is ok, add a new user
router.post('/check-email', function (req, res) {

  // make variables from the session data
  let users = req.session.data['users']
  let allUsers = req.session.data['allUsers']
  let email = req.session.data['email']

  // make an object to hold the data
  let lastUserData = {
    email
  };

  // add the data to an object
  allUsers.push(lastUserData);

  // increment licence numbers
  if (users === 1) {
    req.session.data.users = 2;
  } else if (users === 2) {
    req.session.data.users = 3;
  } else if (users === 3) {
    req.session.data.users = 4;
  } else if (users > 3) {
    req.session.data.users = 5; // hardcoded max of 5
  } else {
    req.session.data.users = 1;
  }

  // loop back to the list
  res.redirect('access?action=added')

})


// confirm remove
router.post('/confirm-remove', function (req, res) {
  res.redirect('access?action=removed&shared=')
})












// Add your routes above the module.exports line
module.exports = router
