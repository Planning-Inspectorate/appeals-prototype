const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const normalizeUsers = (req) => {
  if (!Array.isArray(req.session.data['users'])) {
    req.session.data['users'] = []
  }

  req.session.data['users'] = req.session.data['users'].filter(Boolean)

  if (req.session.data['next-user-id'] === undefined) {
    req.session.data['next-user-id'] = 1
  }

  const existingIds = req.session.data['users']
    .map((user) => parseInt(user.id, 10))
    .filter((id) => Number.isInteger(id))

  if (existingIds.length) {
    const maxId = Math.max(...existingIds)
    if (req.session.data['next-user-id'] <= maxId) {
      req.session.data['next-user-id'] = maxId + 1
    }
  }

  req.session.data['users'].forEach((user) => {
    if (!user.id) {
      user.id = String(req.session.data['next-user-id'])
      req.session.data['next-user-id'] += 1
    }
  })
}

router.get('*', function (req, res, next) {
  res.locals['serviceName'] = 'Manage your planning inspectorate appeals'
  next()
})

router.get('/', function (req, res, next) {
  normalizeUsers(req)
  let path = req.baseUrl.replace(/^\//g, '') + '/index'

  if (req.session.data['action'] == 'added') {
    delete req.session.data['action']
    res.render(path, { notification: 'added', users: req.session.data['users'] })
  } else if (req.session.data['action'] == 'removed') {
    delete req.session.data['action']
    res.render(path, { notification: 'removed', users: req.session.data['users'] })
  } else if (req.session.data['action'] == 'updated') {
    delete req.session.data['action']
    res.render(path, { notification: 'updated', users: req.session.data['users'] })
  } else {
    res.render(path, { users: req.session.data['users'] })
  }
})

router.get('/remove-user', function (req, res) {
  normalizeUsers(req)
  if (req.query.id !== undefined) {
    req.session.data['id'] = req.query.id
  }
  const user = req.session.data['users'].find((entry) => entry.id === req.session.data['id'])
  if (user) {
    req.session.data['remove-email'] = user.email
  }
  res.render(req.baseUrl.replace(/^\//g, '') + '/remove-user')
})

router.post('/remove-user', function (req, res) {
  normalizeUsers(req)
  const userId = req.session.data['id']
  const users = req.session.data['users']

  if (users && userId) {
    const userIndex = users.findIndex((entry) => entry.id === userId)
    if (userIndex >= 0) {
      users.splice(userIndex, 1)
    }
  }

  req.session.data['action'] = 'removed'

  res.redirect('./')
})

router.get('/edit-user', function (req, res) {
  normalizeUsers(req)
  req.session.data['id'] = null
  req.session.data['edit-email'] = null
  req.session.data['edit-user-prefix'] = ''
  req.session.data['edit-user-domain'] = ''
  req.session.data['edit-user-id'] = null
  if (req.query.id !== undefined) {
    req.session.data['id'] = req.query.id
    req.session.data['edit-user-id'] = req.query.id
  }
  const users = req.session.data['users']
  const user = users.find((entry) => entry.id === req.session.data['id'])
  const editEmail = req.query['edit-email'] || (user ? user.email : null)

  req.session.data['email-notifications'] = null
  req.session.data['planning-type'] = []

  if (user && Array.isArray(user.appealTypes)) {
    if (user.appealTypes.includes('All appeal types')) {
      req.session.data['email-notifications'] = 'all-appeals'
      req.session.data['planning-type'] = []
    } else if (user.appealTypes.length > 0) {
      req.session.data['email-notifications'] = 'Particular appeal types'
      req.session.data['planning-type'] = user.appealTypes
    } else {
      req.session.data['email-notifications'] = 'no-email-notifications'
      req.session.data['planning-type'] = []
    }
  }

  if (editEmail) {
    req.session.data['edit-email'] = editEmail
    const emailParts = editEmail.split('@')
    req.session.data['edit-user-prefix'] = emailParts[0] || ''
    req.session.data['edit-user-domain'] = emailParts[1] ? `@${emailParts[1]}` : ''
  }
  res.render(req.baseUrl.replace(/^\//g, '') + '/edit-user')
})

router.get('/email-notifications', function (req, res) {
  normalizeUsers(req)

  const editUserId = req.session.data['edit-user-id']
  const users = req.session.data['users']
  const user = editUserId ? users.find((entry) => entry.id === editUserId) : null

  if (user && Array.isArray(user.appealTypes)) {
    if (user.appealTypes.includes('All appeal types')) {
      req.session.data['email-notifications'] = 'all-appeals'
      req.session.data['planning-type'] = []
    } else if (user.appealTypes.length > 0) {
      req.session.data['email-notifications'] = 'Particular appeal types'
      req.session.data['planning-type'] = user.appealTypes
    } else {
      req.session.data['email-notifications'] = 'no-email-notifications'
      req.session.data['planning-type'] = []
    }
  }

  res.render(req.baseUrl.replace(/^\//g, '') + '/email-notifications')
})

router.post('/email-notifications', function (req, res) {
  normalizeUsers(req)
  const hasEmailInput = req.body && (req.body['domain-prefix'] || req.body['sort'])

  if (hasEmailInput) {
    if (req.body['edit-user-id']) {
      req.session.data['edit-user-id'] = req.body['edit-user-id']
    }
    const emailPrefix = req.session.data['domain-prefix'] || 'example'
    const emailDomain = req.session.data['sort'] || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'
    req.session.data['new-user-email'] = `${emailPrefix}${emailDomain}`
    delete req.session.data['email-notifications']
    delete req.session.data['planning-type']
    return res.redirect('email-notifications')
  }

  const notificationChoice = req.session.data['email-notifications']

  if (!notificationChoice) {
    return res.redirect('email-notifications')
  }

  if (notificationChoice === 'Particular appeal types') {
    return res.redirect('detailed-email-notifications')
  }

  const combinedEmail = req.session.data['new-user-email']
  const newEmail = combinedEmail || `${req.session.data['domain-prefix'] || 'example'}${req.session.data['sort'] || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'}`

  const appealTypes = notificationChoice === 'all-appeals' ? ['All appeal types'] : []

  const editUserId = req.session.data['edit-user-id']
  if (editUserId) {
    const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
    if (userIndex >= 0) {
      req.session.data['users'][userIndex].email = newEmail
      req.session.data['users'][userIndex].appealTypes = appealTypes
      req.session.data['users'][userIndex].emailNotifications = notificationChoice
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = newEmail
    }
  } else {
    const newUser = Object.assign({
      email: newEmail,
      appealTypes,
      id: String(req.session.data['next-user-id']),
      emailNotifications: notificationChoice
    })

    req.session.data['next-user-id'] += 1
    req.session.data['users'].unshift(newUser)
  }

  if (req.session.data['action'] !== 'updated') {
    req.session.data['action'] = 'added'
  }
  delete req.session.data['email-notifications']
  delete req.session.data['planning-type']
  delete req.session.data['edit-user-id']

  return res.redirect('./')
})

router.post('/detailed-email-notifications', function (req, res) {
  normalizeUsers(req)
  const combinedEmail = req.session.data['new-user-email']
  const newEmail = combinedEmail || `${req.session.data['domain-prefix'] || 'example'}${req.session.data['sort'] || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'}`
  const selectedTypes = req.session.data['planning-type']
  const appealTypes = Array.isArray(selectedTypes)
    ? selectedTypes
    : (selectedTypes ? [selectedTypes] : [])

  const editUserId = req.session.data['edit-user-id']
  if (editUserId) {
    const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
    if (userIndex >= 0) {
      req.session.data['users'][userIndex].email = newEmail
      req.session.data['users'][userIndex].appealTypes = appealTypes
      req.session.data['users'][userIndex].emailNotifications = 'Particular appeal types'
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = newEmail
    }
  } else {
    const newUser = Object.assign({
      email: newEmail,
      appealTypes,
      id: String(req.session.data['next-user-id']),
      emailNotifications: 'Particular appeal types'
    })

    req.session.data['next-user-id'] += 1
    req.session.data['users'].unshift(newUser)
  }

  if (req.session.data['action'] !== 'updated') {
    req.session.data['action'] = 'added'
  }
  delete req.session.data['email-notifications']
  delete req.session.data['planning-type']
  delete req.session.data['edit-user-id']

  return res.redirect('./')
})

router.post('/add-user--confirm', function (req, res) {
  normalizeUsers(req)
  const combinedEmail = req.session.data['new-user-email']
  const newEmail = combinedEmail || `${req.session.data['domain-prefix'] || 'example'}${req.session.data['sort'] || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'}`

  const newUser = Object.assign({
    email: newEmail,
    id: String(req.session.data['next-user-id'])
  })

  req.session.data['next-user-id'] += 1

  req.session.data['users'].unshift(newUser)
  req.session.data['action'] = 'added'

  res.redirect('./')
})

module.exports = router