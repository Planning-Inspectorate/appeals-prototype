const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function (req, res, next) {
  if (req.query.cya) {
    req.session.data.cya = 'true'
  }
  next()
})

router.post('/add-user', function (req, res) {
  if (req.session.data.cya === 'true') {
    delete req.session.data.cya
    return res.redirect('/manage/manage-users/v9/check-your-answers')
  }

  return res.redirect('/manage/manage-users/v9/type-notifications')
})

router.post('/type-notifications', function (req, res) {
  const value = ((req.body && req.body['type-notifications']) || '').trim()

  req.session.data['type-notifications'] = value

  if (value === 'select-appeal-types') {
    return res.redirect('/manage/manage-users/v9/detailed-email-notifications')
  }

  if (req.session.data.cya === 'true') {
    delete req.session.data.cya
    return res.redirect('/manage/manage-users/v9/check-your-answers')
  }

  return res.redirect('/manage/manage-users/v9/check-your-answers')
})

router.post('/detailed-email-notifications', function (req, res) {
  if (req.session.data.cya === 'true') {
    delete req.session.data.cya
  }

  return res.redirect('/manage/manage-users/v9/check-your-answers')
})

// checking the answers and adding the new user to the session data
router.post('/check-your-answers', function (req, res) {
  const users = req.session.data.users || []

  const newUser = {
    id: Date.now(),
    email: `${req.session.data['add-user-email']}@cambridgeshirepeterborough-ca.gov.uk`,
    notificationType: req.session.data['type-notifications'],
    appealTypes: req.session.data['planning-type'] || []
  }

  users.push(newUser)

  req.session.data.users = users

  console.log('SAVED USERS:')
  console.log(JSON.stringify(req.session.data.users, null, 2))

  return res.redirect('/manage/manage-users/v9')
})




module.exports = router
