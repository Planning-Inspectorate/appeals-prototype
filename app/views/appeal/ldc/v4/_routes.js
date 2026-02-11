const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

const asArray = (value) => Array.isArray(value) ? value : [value]

// upload document routes

// application-form route with branching logic
router.post('/upload-documents/application-form', function (req, res) {
  console.log('=== application-form POST route hit ===')
  console.log('Full session data:', JSON.stringify(req.session.data, null, 2))
  console.log('Body:', JSON.stringify(req.body, null, 2))
  
  // Capture file data from form submission and store in session
  if (req.body['application-form']) {
    req.session.data['application-form'] = asArray(req.body['application-form'])
    console.log('Stored application-form files:', req.session.data['application-form'])
  }
  
  // Check if user agreed a new description with LPA
  const descriptionChanged = req.session.data['application-desc-changed']
  console.log('application-desc-changed value:', descriptionChanged)
  console.log('application-desc-changed type:', typeof descriptionChanged)
  
  if (descriptionChanged && (descriptionChanged.includes('Yes') || descriptionChanged === 'Yes')) {
    console.log('MATCHED YES - Redirecting to description-of-development-agreement')
    res.redirect('description-of-development-agreement')
  } else {
    console.log('Did not match Yes condition, checking granted-or-refused')
    // Check granted or refused status
    const grantedOrRefused = req.session.data['granted-or-refused']
    console.log('grantedOrRefused:', grantedOrRefused)
    
    if (grantedOrRefused === 'Granted with conditions' || grantedOrRefused === 'Refused') {
      console.log('Redirecting to decision-letter')
      res.redirect('decision-letter')
    } else {
      console.log('Redirecting to planning-obligation-check')
      res.redirect('planning-obligation-check')
    }
  }
})





// the following routes were already in the routes file inside /upload-documents


//description-check routes with branches
router.post('/upload-documents/description-check', function (req, res) {
  const preference = req.session.data['description-check']

  if (preference == 'Yes') {
    res.redirect('description-of-development-agreement')
  } else if (preference === 'No') {
    res.redirect('decision-letter-check')
  } else {
    res.redirect('decision-letter-check')
  }
})

//description-of-development-agreement route
router.post('/upload-documents/description-of-development-agreement', function (req, res) {
  console.log('=== description-of-development-agreement POST route hit (v4/_routes.js) ===')
  console.log('Full session data:', JSON.stringify(req.session.data, null, 2))
  
  // Capture file data from form submission and store in session
  if (req.body['description-change-agreement']) {
    req.session.data['description-change-agreement'] = asArray(req.body['description-change-agreement'])
    console.log('Stored description-change-agreement files:', req.session.data['description-change-agreement'])
  }
  
  // Check granted or refused status
  const grantedOrRefused = req.session.data['granted-or-refused']
  console.log('grantedOrRefused:', grantedOrRefused)
  
  if (grantedOrRefused === 'Granted with conditions' || grantedOrRefused === 'Refused') {
    console.log('Redirecting to decision-letter')
    res.redirect('decision-letter')
  } else {
    console.log('Redirecting to planning-obligation-check')
    res.redirect('planning-obligation-check')
  }
})


//decision-letter-check routes with branches
router.post('/upload-documents/decision-letter-check', function (req, res) {
  const preference = req.session.data['decision-letter-check']

  if (preference == 'Yes') {
    res.redirect('decision-letter')
  } else if (preference === 'No') {
    res.redirect('planning-obligation-check ')
  } else {
    res.redirect('planning-obligation-check')
  }
})


//decision-letter route
router.post('/upload-documents/decision-letter', function (req, res) {
  console.log('=== decision-letter POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['decision-letter']) {
    req.session.data['decision-letter'] = asArray(req.body['decision-letter'])
    console.log('Stored decision-letter files:', req.session.data['decision-letter'])
  }
  res.redirect('planning-obligation-check')
})

//planning-obligation-check routes with branches
router.post('/upload-documents/planning-obligation-check', function (req, res) {
  console.log('=== planning-obligation-check POST route hit ===')
  const preference = req.session.data['planning-obligation-check']

  if (preference == 'Yes') {
    res.redirect('planning-obligation-status')
  } else if (preference === 'No') {
    res.redirect('appeal-statement')
  } else {
    res.redirect('appeal-statement')
  }
})


//planning-obligation route
router.post('/upload-documents/planning-obligation', function (req, res) {
  console.log('=== planning-obligation POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['planning-obligation']) {
    req.session.data['planning-obligation'] = asArray(req.body['planning-obligation'])
    console.log('Stored planning-obligation files:', req.session.data['planning-obligation'])
  }
  res.redirect('appeal-statement')
})

//appeal-statement route with branching
router.post('/upload-documents/appeal-statement', function (req, res) {
  console.log('=== appeal-statement POST route hit (v4/_routes.js) ===')
  console.log('Full session data:', JSON.stringify(req.session.data, null, 2))
  // Capture file data from form submission and store in session
  if (req.body['appeal-statement']) {
    req.session.data['appeal-statement'] = asArray(req.body['appeal-statement'])
    console.log('Stored appeal-statement files:', req.session.data['appeal-statement'])
  }
  const preference = req.session.data['decide-appeal']
  console.log('decide-appeal value:', preference)

  if (preference == 'Hearing' || preference == 'Inquiry') {
    console.log('Redirecting to draft-statement-common-ground')
    res.redirect('draft-statement-common-ground')
  } else {
    console.log('Redirecting to apply-appeal-costs')
    res.redirect('apply-appeal-costs')
  }
})

//draft-statement-common-ground route
router.post('/upload-documents/draft-statement-common-ground', function (req, res) {
  console.log('=== draft-statement-common-ground POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['draft-statement-common-ground']) {
    req.session.data['draft-statement-common-ground'] = asArray(req.body['draft-statement-common-ground'])
    console.log('Stored draft-statement-common-ground files:', req.session.data['draft-statement-common-ground'])
  }
  res.redirect('apply-appeal-costs')
})

//apply-appeal-costs routes with branches
router.post('/upload-documents/apply-appeal-costs', function (req, res) {
  console.log('=== apply-appeal-costs POST route hit (v4/_routes.js) ===')
  console.log('Full session data:', JSON.stringify(req.session.data, null, 2))
  const preference = req.session.data['costs-check']
  console.log('costs-check value:', preference)

  if (preference == 'Yes') {
    console.log('Redirecting to costs')
    res.redirect('costs')
  } else if (preference == 'No') {
    console.log('Redirecting to plans-or-drawings')
    res.redirect('plans-or-drawings')
  } else {
    console.log('No match, redirecting to plans-or-drawings')
    res.redirect('plans-or-drawings')
  }
})

//costs route
router.post('/upload-documents/costs', function (req, res) {
  console.log('=== costs POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['costs-upload']) {
    req.session.data['costs-upload'] = asArray(req.body['costs-upload'])
    console.log('Stored costs-upload files:', req.session.data['costs-upload'])
  }
  res.redirect('plans-or-drawings')
})

//plans-or-drawings route
router.post('/upload-documents/plans-or-drawings', function (req, res) {
  console.log('=== plans-or-drawings POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['plans-or-drawings']) {
    req.session.data['plans-or-drawings'] = asArray(req.body['plans-or-drawings'])
    console.log('Stored plans-or-drawings files:', req.session.data['plans-or-drawings'])
  }
  res.redirect('new-plans-drawings-check')
})

//new-plans-drawings-check routes with branches
router.post('/upload-documents/new-plans-drawings-check', function (req, res) {
  console.log('=== new-plans-drawings-check POST route hit ===')
  const preference = req.session.data['new-plans-drawings-check']

  if (preference == 'Yes') {
    res.redirect('upload-new-plans-drawings')
  } else if (preference == 'No') {
    res.redirect('other-new-documents-check')
  } else {
    res.redirect('plans-or-drawings')
  }
})

//upload-new-plans-drawings route
router.post('/upload-documents/upload-new-plans-drawings', function (req, res) {
  console.log('=== upload-new-plans-drawings POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['upload-new-plans-drawings']) {
    req.session.data['upload-new-plans-drawings'] = asArray(req.body['upload-new-plans-drawings'])
    console.log('Stored upload-new-plans-drawings files:', req.session.data['upload-new-plans-drawings'])
  }
  res.redirect('other-new-documents-check')
})

//other-new-documents-check routes with branches
router.post('/upload-documents/other-new-documents-check', function (req, res) {
  console.log('=== other-new-documents-check POST route hit ===')
  const preference = req.session.data['other-new-documents-check']
  
  if (preference == 'Yes') {
    console.log('Redirecting to upload-other-new-documents')
    res.redirect('upload-other-new-documents')
  } else if (preference == 'No') {
    console.log('Redirecting to your-appeal')
    res.redirect('../prepare-appeal/your-appeal')
  } else {
    console.log('No match, redirecting to your-appeal')
    res.redirect('../prepare-appeal/your-appeal')
  }
})

//upload-other-new-documents route
router.post('/upload-documents/upload-other-new-documents', function (req, res) {
  console.log('=== upload-other-new-documents POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['upload-other-new-documents']) {
    req.session.data['upload-other-new-documents'] = asArray(req.body['upload-other-new-documents'])
    console.log('Stored upload-other-new-documents files:', req.session.data['upload-other-new-documents'])
  }
  res.redirect('ownership-certificate-check')
})

//ownership-certificate-check routes with branches
router.post('/upload-documents/ownership-certificate-check', function (req, res) {
  console.log('=== ownership-certificate-check POST route hit ===')
  const preference = req.session.data['ownership-certificate-check']
  
  if (preference == 'Yes') {
    console.log('Redirecting to ownership-certificate')
    res.redirect('ownership-certificate')
  } else if (preference == 'No') {
    console.log('Redirecting to environment-statement-check')
    res.redirect('environment-statement-check')
  } else {
    console.log('No match, redirecting to environment-statement-check')
    res.redirect('environment-statement-check')
  }
})

//ownership-certificate route
router.post('/upload-documents/ownership-certificate', function (req, res) {
  console.log('=== ownership-certificate POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['ownership-certificate']) {
    req.session.data['ownership-certificate'] = asArray(req.body['ownership-certificate'])
    console.log('Stored ownership-certificate files:', req.session.data['ownership-certificate'])
  }
  res.redirect('environment-statement-check')
})

//environment-statement-check routes with branches
router.post('/upload-documents/environment-statement-check', function (req, res) {
  console.log('=== environment-statement-check POST route hit ===')
  const preference = req.session.data['environment-statement-check']
  
  if (preference == 'Yes') {
    console.log('Redirecting to environment-statement')
    res.redirect('environment-statement')
  } else if (preference == 'No') {
    console.log('Redirecting to ../prepare-appeal/your-appeal')
    res.redirect('../prepare-appeal/your-appeal')
  } else {
    console.log('No match, redirecting to ../prepare-appeal/your-appeal')
    res.redirect('../prepare-appeal/your-appeal')
  }
})

//environment-statement route
router.post('/upload-documents/environment-statement', function (req, res) {
  console.log('=== environment-statement POST route hit ===')
  // Capture file data from form submission and store in session
  if (req.body['application']) {
    req.session.data['application'] = asArray(req.body['application'])
    console.log('Stored application (environment-statement) files:', req.session.data['application'])
  }
  res.redirect('../prepare-appeal/your-appeal')
})

//declaration route
router.post('/upload-documents/declaration', function (req, res) {
  console.log('=== declaration POST route hit ===')
  // Mark declaration as completed
  req.session.data['declaration'] = 'Completed'
  res.redirect('confirmation')
})

//confirmation page - send email via GOV.UK Notify
router.get('/upload-documents/confirmation', function (req, res, next) {
  console.log('=== confirmation GET route hit ===')
  const userEmail = req.session.data['contact-details'] // Adjust to match the actual session key for email
  const appellantName = req.session.data['appellant-name']

  if (userEmail && process.env.NOTIFY_API_KEY) {
    const notifyClient = new NotifyClient(process.env.NOTIFY_API_KEY)

    notifyClient.sendEmail(
      '72f71441-12bf-4455-afbc-c58f9c72bfbd', // Template ID from your Notify service
      userEmail,
      {
        personalisation: {
          name: appellantName || 'Appellant'
        }
      }
    ).then(response => {
      console.log('Email sent via Notify:', response)
      next()
    }).catch(err => {
      console.log('Notify email error:', err)
      // Continue even if email fails in prototype
      next()
    })
  } else {
    next()
  }
})

module.exports = router
