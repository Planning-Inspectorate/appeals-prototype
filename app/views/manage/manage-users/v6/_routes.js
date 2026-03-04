const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const generateUserId = (existingIds) => {
  let newId = null

  do {
    newId = String(Math.floor(1000000000 + Math.random() * 9000000000))
  } while (existingIds.has(newId))

  return newId
}

const persistUsers = (req) => {
  req.session.data['users'] = Array.isArray(req.session.data['users'])
    ? [...req.session.data['users']]
    : []
}

const normalizeUsers = (req) => {
  if (!Array.isArray(req.session.data['users'])) {
    req.session.data['users'] = []
  }

  req.session.data['users'] = req.session.data['users'].filter(Boolean)

  const existingIds = new Set(req.session.data['users']
    .map((user) => (user && user.id ? String(user.id) : null))
    .filter(Boolean))

  req.session.data['users'].forEach((user) => {
    if (!user.id) {
      user.id = generateUserId(existingIds)
      existingIds.add(user.id)
    }
  })
}

const setReturnToIndexFromManageUser = (req) => {
  if (req.query && req.query.from === 'manage-user') {
    req.session.data['return-from-manage-user'] = true
  }

  if (req.query && req.query.id !== undefined) {
    req.session.data['manage-user-id'] = req.query.id
    req.session.data['edit-user-id'] = req.query.id
  }
}

const finalizeManageUserUpdate = (req) => {
  if (!req.session.data['return-from-manage-user']) {
    return
  }

  const userId = req.session.data['manage-user-id']
  const user = userId
    ? req.session.data['users'].find((entry) => entry.id === userId)
    : null

  if (!req.session.data['updated-email'] && user) {
    req.session.data['updated-email'] = user.email
  }

  req.session.data['action'] = 'updated'
  delete req.session.data['return-from-manage-user']
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
  } else if (req.session.data['updated-email']) {
    delete req.session.data['updated-email']
    res.render(path, { notification: 'updated', users: req.session.data['users'] })
  } else {
    res.render(path, { users: req.session.data['users'] })
  }
})

router.get('/remove-user', function (req, res) {
  normalizeUsers(req)
  setReturnToIndexFromManageUser(req)
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
      persistUsers(req)
    }
  }

  req.session.data['action'] = 'removed'
  finalizeManageUserUpdate(req)

  res.redirect('./')
})

router.get('/edit-user', function (req, res) {
  normalizeUsers(req)
  setReturnToIndexFromManageUser(req)
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

router.post('/edit-user', function (req, res) {
  normalizeUsers(req)
  const editUserId = req.body['edit-user-id'] || req.session.data['edit-user-id'] || req.session.data['id']
  const emailPrefix = req.session.data['domain-prefix'] || 'example'
  const emailDomain = req.session.data['sort'] || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'
  const newEmail = `${emailPrefix}${emailDomain}`

  if (editUserId) {
    const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
    if (userIndex >= 0) {
      req.session.data['users'][userIndex].email = newEmail
      persistUsers(req)
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = newEmail
    }
  }

  delete req.session.data['edit-user-id']
  delete req.session.data['id']

  return res.redirect('./')
})

router.get('/manage-user', function (req, res) {
  normalizeUsers(req)
  if (req.query.id !== undefined) {
    req.session.data['manage-user-id'] = req.query.id
  }

  const userId = req.session.data['manage-user-id']
  const user = req.session.data['users'].find((entry) => entry.id === userId)
  req.session.data['manage-user'] = user || null

  res.render(req.baseUrl.replace(/^\//g, '') + '/manage-user')
})

router.get('/add-user', function (req, res) {
  normalizeUsers(req)
  delete req.session.data['manage-user-id']
  delete req.session.data['edit-user-id']
  delete req.session.data['return-from-manage-user']
  delete req.session.data['id']
  delete req.session.data['appealReferences']
  delete req.session.data['appealReference']
  delete req.session.data['from-email-notifications']
  res.render(req.baseUrl.replace(/^\//g, '') + '/add-user')
})

router.get('/email-notifications', function (req, res) {
  normalizeUsers(req)
  setReturnToIndexFromManageUser(req)

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

router.get('/edit-detailed-email-notifications', function (req, res) {
  normalizeUsers(req)
  setReturnToIndexFromManageUser(req)

  const editUserId = req.session.data['edit-user-id']
  const users = req.session.data['users']
  const user = editUserId ? users.find((entry) => entry.id === editUserId) : null

  if (user && Array.isArray(user.appealTypes)) {
    req.session.data['planning-type'] = user.appealTypes
  } else {
    req.session.data['planning-type'] = []
  }

  res.render(req.baseUrl.replace(/^\//g, '') + '/edit-detailed-email-notifications')
})

router.get('/select-appeals', function (req, res) {
  normalizeUsers(req)

  const fromManageUser = req.query && req.query.from === 'manage-user'

  if (fromManageUser) {
    req.session.data['return-from-manage-user'] = true
  } else {
    delete req.session.data['return-from-manage-user']
  }

  if (req.query && req.query.id !== undefined) {
    req.session.data['manage-user-id'] = req.query.id
    req.session.data['edit-user-id'] = req.query.id
  } else if (!fromManageUser) {
    delete req.session.data['manage-user-id']
  }

  res.render(req.baseUrl.replace(/^\//g, '') + '/select-appeals')
})

router.get('/appeal-stage', function (req, res) {
  normalizeUsers(req)
  setReturnToIndexFromManageUser(req)

  const editUserId = req.session.data['edit-user-id']
  const users = req.session.data['users']
  const user = editUserId ? users.find((entry) => entry.id === editUserId) : null

  if (user && Array.isArray(user.appealStages)) {
    req.session.data['appeal-stage'] = user.appealStages
  } else {
    req.session.data['appeal-stage'] = []
  }

  res.render(req.baseUrl.replace(/^\//g, '') + '/appeal-stage')
})

router.post('/email-notifications', function (req, res) {
  normalizeUsers(req)
  const hasEmailInput = req.body && (req.body['domain-prefix'] || req.body['sort'])

  if (hasEmailInput) {
    if (req.body['edit-user-id']) {
      req.session.data['edit-user-id'] = req.body['edit-user-id']
    } else {
      delete req.session.data['edit-user-id']
    }
    const emailPrefix = (req.body && req.body['domain-prefix']) || req.session.data['domain-prefix'] || 'example'
    const emailDomain = (req.body && req.body['sort']) || req.session.data['sort'] || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'
    req.session.data['domain-prefix'] = emailPrefix
    req.session.data['sort'] = emailDomain
    req.session.data['new-user-email'] = `${emailPrefix}${emailDomain}`
    delete req.session.data['email-notifications']
    delete req.session.data['planning-type']
    return res.redirect('email-notifications')
  }

  const notificationChoice = req.session.data['email-notifications'] || (req.body && req.body['email-notifications'])
  if (notificationChoice) {
    req.session.data['email-notifications'] = notificationChoice
  }

  if (!notificationChoice) {
    return res.redirect('email-notifications')
  }

  if (notificationChoice === 'Particular appeal types') {
    return res.redirect(req.session.data['return-from-manage-user'] ? 'edit-detailed-email-notifications' : 'detailed-email-notifications')
  }

  const combinedEmail = req.session.data['new-user-email']
  const newEmail = combinedEmail || `${req.session.data['domain-prefix'] || (req.body && req.body['domain-prefix']) || 'example'}${req.session.data['sort'] || (req.body && req.body['sort']) || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'}`

  const appealTypes = notificationChoice === 'all-appeals' ? ['All appeal types'] : []

  const editUserId = req.session.data['edit-user-id']
  let newUserId = null
  if (editUserId) {
    const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
    if (userIndex >= 0) {
      req.session.data['users'][userIndex].email = newEmail
      req.session.data['users'][userIndex].appealTypes = appealTypes
      req.session.data['users'][userIndex].emailNotifications = notificationChoice
      persistUsers(req)
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = newEmail
    }
  } else {
    const newUser = Object.assign({
      email: newEmail,
      appealTypes,
      id: generateUserId(new Set(req.session.data['users'].map((entry) => entry.id))),
      emailNotifications: notificationChoice,
      appealReferences: req.session.data['appealReferences'] || []
    })
    req.session.data['users'].unshift(newUser)
    persistUsers(req)
    newUserId = newUser.id
  }

  if (req.session.data['action'] !== 'updated') {
    req.session.data['action'] = 'added'
  }
  finalizeManageUserUpdate(req)
  delete req.session.data['email-notifications']
  delete req.session.data['planning-type']
  delete req.session.data['edit-user-id']

  if (!editUserId && !req.session.data['return-from-manage-user']) {
    req.session.data['from-email-notifications'] = true
  }

  if (!editUserId && newUserId) {
    req.session.data['from-email-notifications'] = true
    return res.redirect(`select-appeals?id=${newUserId}`)
  }

  if (editUserId) {
    return res.redirect(`select-appeals?id=${editUserId}`)
  }

  return res.redirect('select-appeals')
})

router.post('/detailed-email-notifications', function (req, res) {
  normalizeUsers(req)
  const combinedEmail = req.session.data['new-user-email']
  const newEmail = combinedEmail || `${req.session.data['domain-prefix'] || (req.body && req.body['domain-prefix']) || 'example'}${req.session.data['sort'] || (req.body && req.body['sort']) || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'}`
  const selectedTypes = req.session.data['planning-type'] || (req.body && req.body['planning-type'])
  if (selectedTypes) {
    req.session.data['planning-type'] = selectedTypes
  }
  const appealTypes = Array.isArray(selectedTypes)
    ? selectedTypes
    : (selectedTypes ? [selectedTypes] : [])

  const editUserId = req.session.data['edit-user-id']
  let newUserId = null
  if (editUserId) {
    const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
    if (userIndex >= 0) {
      req.session.data['users'][userIndex].email = newEmail
      req.session.data['users'][userIndex].appealTypes = appealTypes
      req.session.data['users'][userIndex].emailNotifications = 'Particular appeal types'
      persistUsers(req)
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = newEmail
    }
  } else {
    const newUser = Object.assign({
      email: newEmail,
      appealTypes,
      id: generateUserId(new Set(req.session.data['users'].map((entry) => entry.id))),
      emailNotifications: 'Particular appeal types',
      appealReferences: req.session.data['appealReferences'] || []
    })
    req.session.data['users'].unshift(newUser)
    persistUsers(req)
    newUserId = newUser.id
  }

  if (req.session.data['action'] !== 'updated') {
    req.session.data['action'] = 'added'
  }
  finalizeManageUserUpdate(req)
  delete req.session.data['email-notifications']
  delete req.session.data['planning-type']
  delete req.session.data['edit-user-id']

  if (!editUserId && !req.session.data['return-from-manage-user']) {
    req.session.data['from-email-notifications'] = true
    if (newUserId) {
      return res.redirect(`select-appeals?id=${newUserId}`)
    }
    return res.redirect('select-appeals')
  }

  if (editUserId) {
    return res.redirect(`select-appeals?id=${editUserId}`)
  }

  return res.redirect('./')
})

router.post('/edit-detailed-email-notifications', function (req, res) {
  normalizeUsers(req)
  const selectedTypes = req.session.data['planning-type'] || (req.body && req.body['planning-type'])
  if (selectedTypes) {
    req.session.data['planning-type'] = selectedTypes
  }
  const appealTypes = Array.isArray(selectedTypes)
    ? selectedTypes
    : (selectedTypes ? [selectedTypes] : [])

  const editUserId = req.session.data['edit-user-id'] || req.session.data['manage-user-id']
  if (editUserId) {
    const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
    if (userIndex >= 0) {
      req.session.data['users'][userIndex].appealTypes = appealTypes
      req.session.data['users'][userIndex].emailNotifications = 'Particular appeal types'
      persistUsers(req)
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = req.session.data['users'][userIndex].email
    }
  }

  finalizeManageUserUpdate(req)
  return res.redirect('./')
})

router.post('/appeal-stage', function (req, res) {
  normalizeUsers(req)

  const selectedStages = req.session.data['appeal-stage'] || (req.body && req.body['appeal-stage'])
  if (selectedStages) {
    req.session.data['appeal-stage'] = selectedStages
  }
  const appealStages = Array.isArray(selectedStages)
    ? selectedStages
    : (selectedStages ? [selectedStages] : [])

  const editUserId = req.session.data['edit-user-id'] || req.session.data['manage-user-id']
  if (editUserId) {
    const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
    if (userIndex >= 0) {
      req.session.data['users'][userIndex].appealStages = appealStages
      persistUsers(req)
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = req.session.data['users'][userIndex].email
    }
  }

  finalizeManageUserUpdate(req)
  return res.redirect('./')
})

router.post('/select-appeals', function (req, res) {
  normalizeUsers(req)

  const selectedReference = req.session.data['appealReference'] || (req.body && req.body['appealReference'])
  if (selectedReference) {
    req.session.data['appealReference'] = selectedReference
  }
  const removeReference = req.body ? req.body['removeReference'] : undefined
  const action = req.body ? req.body['action'] : undefined

  if (removeReference) {
    if (Array.isArray(req.session.data['appealReferences'])) {
      req.session.data['appealReferences'] = req.session.data['appealReferences']
        .filter((ref) => ref !== removeReference)
    }

    const editUserId = req.session.data['edit-user-id'] || req.session.data['manage-user-id'] || req.session.data['id']
    let removedUser = null
    if (editUserId) {
      removedUser = req.session.data['users'].find((entry) => entry.id === editUserId)
      if (removedUser && Array.isArray(removedUser.appealReferences)) {
        removedUser.appealReferences = removedUser.appealReferences.filter((ref) => ref !== removeReference)
        persistUsers(req)
      }
    }

    req.session.data['action'] = 'updated'
    if (removedUser) {
      req.session.data['updated-email'] = removedUser.email
    } else if (req.session.data['new-user-email']) {
      req.session.data['updated-email'] = req.session.data['new-user-email']
    }
    if (editUserId) {
      const fromManageUser = Boolean(req.session.data['return-from-manage-user'])
      const query = fromManageUser
        ? `?from=manage-user&id=${editUserId}`
        : `?id=${editUserId}`
      return res.redirect(`select-appeals${query}`)
    }

    return res.redirect('select-appeals')
  }

  if (selectedReference) {
    if (!Array.isArray(req.session.data['appealReferences'])) {
      req.session.data['appealReferences'] = []
    }

    if (!req.session.data['appealReferences'].includes(selectedReference)) {
      req.session.data['appealReferences'].push(selectedReference)
    }

    const editUserId = req.session.data['edit-user-id'] || req.session.data['manage-user-id'] || req.session.data['id']
    if (editUserId) {
      const user = req.session.data['users'].find((entry) => entry.id === editUserId)
      if (user) {
        if (!Array.isArray(user.appealReferences)) {
          user.appealReferences = []
        }
        if (!user.appealReferences.includes(selectedReference)) {
          user.appealReferences.push(selectedReference)
          persistUsers(req)
        }
        req.session.data['action'] = 'updated'
        req.session.data['updated-email'] = user.email
      }
    } else if (req.session.data['new-user-email']) {
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = req.session.data['new-user-email']
    }
  }

  if (action === 'add-another' || !action) {
    delete req.session.data['appealReference']
    const editUserId = req.session.data['edit-user-id'] || req.session.data['manage-user-id']
    if (editUserId) {
      const fromManageUser = Boolean(req.session.data['return-from-manage-user'])
      const query = fromManageUser
        ? `?from=manage-user&id=${editUserId}`
        : `?id=${editUserId}`
      return res.redirect(`select-appeals${query}`)
    }
    return res.redirect('select-appeals')
  }

  const fromManageUser = Boolean(req.session.data['return-from-manage-user'])
  const fromEmailNotifications = Boolean(req.session.data['from-email-notifications'])
  finalizeManageUserUpdate(req)
  delete req.session.data['appealReference']
  if (fromEmailNotifications && !fromManageUser) {
    delete req.session.data['from-email-notifications']
    return res.redirect('appeal-stage')
  }

  return res.redirect(fromManageUser ? './' : 'appeal-stage')
})


module.exports = router