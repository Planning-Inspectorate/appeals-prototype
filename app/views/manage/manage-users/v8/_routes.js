const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()


//permanent user who can't be deleted or have their email address changed

const permanentUserId = 'permanent-user'

const getPermanentUser = (req) => {
  if (!req.session.data['permanent-user']) {
    req.session.data['permanent-user'] = {
      id: permanentUserId,
      email: 'appeals@cambridgeshirepeterborough-ca.gov.uk',
      appealTypes: ['S78', 'Householder', 'LDC'],
      appealStages: ['All appeal stages'],
      emailNotifications: 'Particular appeal types'
    }
  }

  if (!req.session.data['permanent-user'].id) {
    req.session.data['permanent-user'].id = permanentUserId
  }

  return req.session.data['permanent-user']
}

const getUserById = (req, userId) => {
  if (!userId) {
    return null
  }

  if (userId === permanentUserId) {
    return getPermanentUser(req)
  }

  return req.session.data['users'].find((entry) => entry.id === userId) || null
}

// Creating IDs for users

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

// Fix issue with the value "_unchecked" displaying
const sanitiseSelections = (values) => {
  const list = Array.isArray(values)
    ? values
    : (values ? [values] : [])

  return list.filter((value) => value && value !== '_unchecked')
}

const normaliseUsers = (req) => {
  getPermanentUser(req)

  if (!Array.isArray(req.session.data['users'])) {
    req.session.data['users'] = []
  }

  req.session.data['users'] = req.session.data['users'].filter(Boolean)

  const existingIds = new Set(req.session.data['users']
    .map((user) => (user && user.id ? String(user.id) : null))
    .filter(Boolean))

  req.session.data['users'].forEach((user) => {
    user.appealTypes = sanitiseSelections(user.appealTypes || user.appeal_types)
    user.appealStages = sanitiseSelections(user.appealStages || user.appeal_stages)

    if (!user.id) {
      user.id = generateUserId(existingIds)
      existingIds.add(user.id)
    }
  })
}

// Banner message for updating users

const finaliseManageUserUpdate = (req) => {
  if (!req.session.data['return-from-manage-user']) {
    return
  }

  const userId = req.session.data['manage-user-id']
  const user = getUserById(req, userId)

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

// Displaying banners on the index page and making sure that the data displayed for the users is correct

router.get('/', function (req, res, next) {
  normaliseUsers(req)
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

// remove user routes

router.get('/remove-user', function (req, res) {
  normaliseUsers(req)
  if (req.query.id !== undefined) {
    req.session.data['id'] = req.query.id
  }
  const user = getUserById(req, req.session.data['id'])
  if (user) {
    req.session.data['remove-email'] = user.email
  }
  res.render(req.baseUrl.replace(/^\//g, '') + '/remove-user')
})

router.post('/remove-user', function (req, res) {
  normaliseUsers(req)
  const userId = req.session.data['id']

  if (userId === permanentUserId) {
    return res.redirect('./')
  }

  const users = req.session.data['users']

  if (users && userId) {
    const userIndex = users.findIndex((entry) => entry.id === userId)
    if (userIndex >= 0) {
      users.splice(userIndex, 1)
      persistUsers(req)
    }
  }

  req.session.data['action'] = 'removed'
  finaliseManageUserUpdate(req)

  res.redirect('./')
})

// edit user routes

router.get('/edit-user', function (req, res) {
  normaliseUsers(req)
  req.session.data['id'] = null
  req.session.data['edit-email'] = null
  req.session.data['edit-user-prefix'] = ''
  req.session.data['edit-user-domain'] = ''
  req.session.data['edit-user-id'] = null
  if (req.query.id !== undefined) {
    req.session.data['id'] = req.query.id
    req.session.data['edit-user-id'] = req.query.id
  }
  const user = getUserById(req, req.session.data['id'])
  const editEmail = req.query['edit-email'] || (user ? user.email : null)

  req.session.data['email-notifications'] = null
  req.session.data['planning-type'] = []

  if (user && Array.isArray(user.appealTypes)) {
    if (user.appealTypes.includes('All appeal types')) {
      req.session.data['email-notifications'] = 'all-appeals'
      req.session.data['planning-type'] = []
    } else if (user.appealTypes.length > 0) {
      req.session.data['email-notifications'] = 'Particular appeal types'
      req.session.data['planning-type'] = sanitiseSelections(user.appealTypes)
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
  normaliseUsers(req)
  const editUserId = req.body['edit-user-id'] || req.session.data['edit-user-id'] || req.session.data['id']

  if (editUserId === permanentUserId) {
    req.session.data['manage-user-id'] = editUserId
    req.session.data['action'] = 'updated'
    req.session.data['updated-email'] = getPermanentUser(req).email
    delete req.session.data['edit-user-id']
    delete req.session.data['id']
    return res.redirect(`manage-user?id=${editUserId}`)
  }

  const emailPrefix = req.session.data['add-user-email']
  
  if (emailPrefix) {
    const emailDomain = '@cambridgeshirepeterborough-ca.gov.uk'
    const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
    if (userIndex >= 0) {
      req.session.data['users'][userIndex].email = `${emailPrefix}${emailDomain}`
      persistUsers(req)
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = req.session.data['users'][userIndex].email
    }
  }

  req.session.data['manage-user-id'] = editUserId
  delete req.session.data['edit-user-id']
  delete req.session.data['id']
  delete req.session.data['add-user-email']

  return res.redirect(`manage-user?id=${editUserId}`)
})

// manage user routes

router.get('/manage-user', function (req, res) {
  normaliseUsers(req)
  if (req.query.id !== undefined) {
    req.session.data['manage-user-id'] = req.query.id
  }

  const userId = req.session.data['manage-user-id']
  const user = getUserById(req, userId)
  req.session.data['manage-user'] = user || null

  res.render(req.baseUrl.replace(/^\//g, '') + '/manage-user')
})

// add user routes

router.get('/add-user', function (req, res) {
  normaliseUsers(req)
  delete req.session.data['manage-user-id']
  delete req.session.data['edit-user-id']
  delete req.session.data['is-add-user-flow']
  delete req.session.data['return-from-manage-user']
  delete req.session.data['id']
  delete req.session.data['appealReferences']
  delete req.session.data['appealReference']
  delete req.session.data['from-email-notifications']
  delete req.session.data['email-notifications']
  delete req.session.data['planning-type']
  delete req.session.data['new-user-email']
  delete req.session.data['domain-prefix']
  delete req.session.data['sort']
  res.render(req.baseUrl.replace(/^\//g, '') + '/add-user')
})

// email notification routes (appeal type)

router.get('/email-notifications', function (req, res) {
  normaliseUsers(req)

  const editUserId = req.session.data['edit-user-id']
  const user = getUserById(req, editUserId)

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

//routes for the edit page - they will have come from and to manage user from here

router.post('/edit-email-notifications', function (req, res) {
  const userId = req.session.data['manage-user-id'] || req.session.data['edit-user-id']
  if (req.session.data['email-notifications'] === 'Particular appeal types') {
    return res.redirect('edit-detailed-email-notifications')
  } else {
    return res.redirect(`manage-user?id=${userId}`)
  }
})



//detailed email notification routes (appeal type)

router.get('/edit-detailed-email-notifications', function (req, res) {
  normaliseUsers(req)

  const editUserId = req.session.data['edit-user-id']
  const user = getUserById(req, editUserId)

  if (user && Array.isArray(user.appealTypes)) {
    req.session.data['planning-type'] = sanitiseSelections(user.appealTypes)
  } else {
    req.session.data['planning-type'] = []
  }

  res.render(req.baseUrl.replace(/^\//g, '') + '/edit-detailed-email-notifications')
})

router.get('/detailed-email-notifications', function (req, res) {
  normaliseUsers(req)

  if (!req.session.data['planning-type']) {
    req.session.data['planning-type'] = []
  }

  res.render(req.baseUrl.replace(/^\//g, '') + '/detailed-email-notifications')
})


// appeal stage routes

router.post('/appeal-stage', function (req, res) {
  if (req.session.data['appeal-stage'] == 'particular-appeal-stages') {
    return res.redirect('appeal-stage-detailed')
  }

  normaliseUsers(req)
  const appealStage = req.session.data['appeal-stage']
  const appealStages = appealStage === 'all-appeal-stages' ? ['All appeal stages'] : []

  const userId = req.session.data['edit-user-id'] || req.session.data['manage-user-id']
  if (userId) {
    if (userId === permanentUserId) {
      getPermanentUser(req).appealStages = appealStages
    } else {
      const userIndex = req.session.data['users'].findIndex((entry) => entry.id === userId)
      if (userIndex >= 0) {
        req.session.data['users'][userIndex].appealStages = appealStages
        persistUsers(req)
      }
    }
  }

  req.session.data['action'] = userId ? 'added' : undefined
  delete req.session.data['is-add-user-flow']
  delete req.session.data['edit-user-id']
  const redirectUserId = userId
  delete req.session.data['manage-user-id']
  return res.redirect(`manage-user?id=${redirectUserId}`)
})

router.post('/edit-appeal-stage', function (req, res) {
  if (req.session.data['appeal-stage'] == 'particular-appeal-stages') {
    return res.redirect('edit-appeal-stage-detailed')
  }

  const userId = req.session.data['manage-user-id'] || req.session.data['edit-user-id']
  return res.redirect(`manage-user?id=${userId}`)
})

//detailed appeal stage routes

router.get('/appeal-stage-detailed', function (req, res) {
  normaliseUsers(req)

  const editUserId = req.session.data['edit-user-id']
  const user = getUserById(req, editUserId)

  if (user && Array.isArray(user.appealStages)) {
    req.session.data['appeal-stage-detailed'] = sanitiseSelections(user.appealStages)
  } else {
    req.session.data['appeal-stage-detailed'] = []
  }

  res.render(req.baseUrl.replace(/^\//g, '') + '/appeal-stage-detailed')
})

// storing data from email-notifications and routing to detailed or appeal stage

router.post('/email-notifications', function (req, res) {
  normaliseUsers(req)
  const hasEmailInput = req.body && (req.body['domain-prefix'] || req.body['sort'] || req.body['add-user-email'])

  if (hasEmailInput) {
    if (req.body['edit-user-id']) {
      req.session.data['edit-user-id'] = req.body['edit-user-id']
      req.session.data['is-add-user-flow'] = false
    } else {
      delete req.session.data['edit-user-id']
      delete req.session.data['manage-user-id']
      req.session.data['is-add-user-flow'] = true
    }
    const emailPrefix = (req.body && req.body['domain-prefix']) || (req.body && req.body['add-user-email']) || req.session.data['domain-prefix'] || 'example'
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

  const editUserId = req.session.data['is-add-user-flow'] ? null : req.session.data['edit-user-id']
  const isManageUserFlow = Boolean(req.session.data['return-from-manage-user'])
  const combinedEmail = req.session.data['new-user-email']
  const newEmail = combinedEmail || `${req.session.data['domain-prefix'] || (req.body && req.body['domain-prefix']) || 'example'}${req.session.data['sort'] || (req.body && req.body['sort']) || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'}`
  const appealTypes = notificationChoice === 'all-appeals' ? ['All appeal types'] : []

  if (notificationChoice === 'Particular appeal types') {
    return res.redirect(isManageUserFlow ? 'edit-detailed-email-notifications' : 'detailed-email-notifications')
  }

  if (editUserId) {
    if (editUserId === permanentUserId) {
      const permanentUser = getPermanentUser(req)
      permanentUser.appealTypes = appealTypes
      permanentUser.emailNotifications = notificationChoice
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = permanentUser.email
    } else {
      const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
      if (userIndex >= 0) {
        req.session.data['users'][userIndex].email = newEmail
        req.session.data['users'][userIndex].appealTypes = appealTypes
        req.session.data['users'][userIndex].emailNotifications = notificationChoice
        persistUsers(req)
        req.session.data['action'] = 'updated'
        req.session.data['updated-email'] = newEmail
      }
    }
  } else {
    const newUser = Object.assign({
      email: newEmail,
      appealTypes,
      id: generateUserId(new Set(req.session.data['users'].map((entry) => entry.id))),
      emailNotifications: notificationChoice,
      appealReferences: req.session.data['appealReferences'] || [],
      appealStages: []
    })
    req.session.data['users'].unshift(newUser)
    persistUsers(req)
    req.session.data['edit-user-id'] = newUser.id
    req.session.data['manage-user-id'] = newUser.id
  }

  if (req.session.data['action'] !== 'updated') {
    req.session.data['action'] = 'added'
  }
  finaliseManageUserUpdate(req)
  delete req.session.data['email-notifications']
  delete req.session.data['planning-type']

  if (isManageUserFlow) {
    const userId = editUserId || req.session.data['manage-user-id']
    return res.redirect(`manage-user?id=${userId}`)
  }

  return res.redirect('appeal-stage')
})

// storing data from detailed email notifications 

router.post('/detailed-email-notifications', function (req, res) {
  normaliseUsers(req)
  const combinedEmail = req.session.data['new-user-email']
  const newEmail = combinedEmail || `${req.session.data['domain-prefix'] || (req.body && req.body['domain-prefix']) || 'example'}${req.session.data['sort'] || (req.body && req.body['sort']) || req.session.data['lpa-email'] || '@cambridgeshirepeterborough-ca.gov.uk'}`
  const selectedTypes = req.session.data['planning-type'] || (req.body && req.body['planning-type'])
  if (selectedTypes) {
    req.session.data['planning-type'] = sanitiseSelections(selectedTypes)
  }
  const appealTypes = sanitiseSelections(selectedTypes)

  const editUserId = req.session.data['is-add-user-flow'] ? null : req.session.data['edit-user-id']
  let newUserId = null
  if (editUserId) {
    if (editUserId === permanentUserId) {
      const permanentUser = getPermanentUser(req)
      permanentUser.appealTypes = appealTypes
      permanentUser.emailNotifications = 'Particular appeal types'
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = permanentUser.email
    } else {
      const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
      if (userIndex >= 0) {
        req.session.data['users'][userIndex].email = newEmail
        req.session.data['users'][userIndex].appealTypes = appealTypes
        req.session.data['users'][userIndex].emailNotifications = 'Particular appeal types'
        persistUsers(req)
        req.session.data['action'] = 'updated'
        req.session.data['updated-email'] = newEmail
      }
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
  finaliseManageUserUpdate(req)
  delete req.session.data['email-notifications']
  delete req.session.data['planning-type']

  if (!editUserId && !req.session.data['return-from-manage-user']) {
    req.session.data['from-email-notifications'] = true
    if (newUserId) {
      req.session.data['edit-user-id'] = newUserId
      req.session.data['manage-user-id'] = newUserId
    }
  }

  return res.redirect('appeal-stage')
})

// storing data from edit detailed email notifications and redirecting to the manage user page

router.post('/edit-detailed-email-notifications', function (req, res) {
  normaliseUsers(req)
  const selectedTypes = req.session.data['planning-type'] || (req.body && req.body['planning-type'])
  if (selectedTypes) {
    req.session.data['planning-type'] = sanitiseSelections(selectedTypes)
  }
  const appealTypes = sanitiseSelections(selectedTypes)

  const editUserId = req.session.data['edit-user-id'] || req.session.data['manage-user-id']
  if (editUserId) {
    if (editUserId === permanentUserId) {
      const permanentUser = getPermanentUser(req)
      permanentUser.appealTypes = appealTypes
      permanentUser.emailNotifications = 'Particular appeal types'
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = permanentUser.email
    } else {
      const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
      if (userIndex >= 0) {
        req.session.data['users'][userIndex].appealTypes = appealTypes
        req.session.data['users'][userIndex].emailNotifications = 'Particular appeal types'
        persistUsers(req)
        req.session.data['action'] = 'updated'
        req.session.data['updated-email'] = req.session.data['users'][userIndex].email
      }
    }
  }

  finaliseManageUserUpdate(req)
  const redirectId = editUserId || req.session.data['manage-user-id']
  return res.redirect(`manage-user?id=${redirectId}`)
})

//storing data from detailed appeal stage 

router.post('/appeal-stage-detailed', function (req, res) {
  normaliseUsers(req)

  const selectedStages = req.session.data['appeal-stage-detailed'] || (req.body && req.body['appeal-stage-detailed'])
  if (selectedStages) {
    req.session.data['appeal-stage-detailed'] = sanitiseSelections(selectedStages)
  }
  const appealStages = sanitiseSelections(selectedStages)

  const editUserId = req.session.data['edit-user-id'] || req.session.data['manage-user-id']
  if (editUserId) {
    if (editUserId === permanentUserId) {
      const permanentUser = getPermanentUser(req)
      permanentUser.appealStages = appealStages
      req.session.data['action'] = 'updated'
      req.session.data['updated-email'] = permanentUser.email
    } else {
      const userIndex = req.session.data['users'].findIndex((entry) => entry.id === editUserId)
      if (userIndex >= 0) {
        req.session.data['users'][userIndex].appealStages = appealStages
        persistUsers(req)
        req.session.data['action'] = 'updated'
        req.session.data['updated-email'] = req.session.data['users'][userIndex].email
      }
    }
  }

  finaliseManageUserUpdate(req)
  delete req.session.data['is-add-user-flow']
  delete req.session.data['edit-user-id']
  const redirectUserId = editUserId
  delete req.session.data['manage-user-id']
  return res.redirect(`manage-user?id=${redirectUserId}`)
})
module.exports = router