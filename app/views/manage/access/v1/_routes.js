const express = require('express')
const router = new express.Router()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your planning inspectorate appeals'

  next()
})

router.post('/email', function (req, res) {
  res.redirect('/manage/access/v1/enter-code?start=start')
})

router.post('/enter-code', function (req, res) {

  // find out where the journey started
  let start = req.session.data['start']

  // route depending on value
  if (start === 'start') {
    res.redirect('/manage/appeals/v2/?no-appeals=')
  } else if (start === 'invite') {
    res.redirect('/manage/appeals/v2/?no-appeals=true')
  } else if (start === 'questionnaire') {
    res.redirect('/manage/questionnaire/v11/task-list')
  } else {
    res.redirect('/manage/final-comments/v1/add-comments')
  }

})


// Add your routes above the module.exports line
module.exports = router
