const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const NotifyClient = require('notifications-node-client').NotifyClient







//application-form route with branching
router.post('/application-form', function (req, res) {
  console.log('application-form POST route hit')
  console.log('Session data:', req.session.data)
  
  // Check if user agreed a new description with LPA
  const descriptionChanged = req.session.data['application-desc-changed']
  console.log('application-desc-changed:', descriptionChanged)
  
  if (descriptionChanged && descriptionChanged.startsWith('Yes')) {
    console.log('Redirecting to description-of-development-agreement')
    res.redirect('description-of-development-agreement')
  } else {
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




//description-check routes with branches
router.post('/description-check', function (req, res) {
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
router.post('/description-of-development-agreement', function (req, res) {
  console.log('=== description-of-development-agreement POST route hit ===')
  console.log('Full session data:', JSON.stringify(req.session.data, null, 2))
  
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


//decision-letter route
router.post('/decision-letter', function (req, res) {
  res.redirect('planning-obligation-check')
})

//planning-obligation-check routes with branches
router.post('/planning-obligation-check', function (req, res) {
  const preference = req.session.data['planning-obligation-check']
  
  if (preference == 'Yes') {
    res.redirect('planning-obligation-status')
  } else if (preference === 'No') {
    res.redirect('appeal-statement')
  } else {
    res.redirect('appeal-statement')
  }
})

//planning-obligation-status routes with branches
router.post('/planning-obligation-status', function (req, res) {
  const preference = req.session.data['planning-obligation-status']
  
  if (preference == 'Finalised and ready to submit') {
    res.redirect('planning-obligation')
  } else if (preference == 'Not started yet') {
    res.redirect('appeal-statement')
  } else {
    res.redirect('appeal-statement')
  }
})

//planning-obligation route
router.post('/planning-obligation', function (req, res) {
  res.redirect('appeal-statement')
})

//appeal-statement route with branching
router.post('/appeal-statement', function (req, res) {
  console.log('=== appeal-statement POST route hit ===')
  console.log('Full session data:', JSON.stringify(req.session.data, null, 2))
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
router.post('/draft-statement-common-ground', function (req, res) {
  console.log('=== draft-statement-common-ground POST route hit ===')
  res.redirect('apply-appeal-costs')
})



//apply-appeal-costs routes with branches
router.post('/apply-appeal-costs', function (req, res) {
  const preference = req.session.data['costs-check']
  
  if (preference == 'Yes') {
    res.redirect('costs')
  } else if (preference == 'No') {
    res.redirect('plans-or-drawings')
  } else {
    res.redirect('plans-or-drawings')
  }
})

//costs route
router.post('/costs', function (req, res) {
  res.redirect('plans-or-drawings')
})


//plans-or-drawings route
router.post('/plans-or-drawings', function (req, res) {
  res.redirect('new-plans-drawings-check')
})

//new-plans-drawings-check routes with branches
router.post('/new-plans-drawings-check', function (req, res) {
  const preference = req.session.data['new-plans-drawings-check']
  
  if (preference == 'Yes') {
    res.redirect('upload-new-plans-drawings')
  } else if (preference == 'No') {
    res.redirect('other-new-documents-check')
  } else {
    res.redirect('plans-or-drawings')
  }
})

//plans-or-drawings route
router.post('/plans-or-drawings', function (req, res) {
  res.redirect('other-new-documents-check')
})

//other-new-documents-check routes with branches
router.post('/other-new-documents-check', function (req, res) {
  const preference = req.session.data['other-new-documents-check']
  
  if (preference == 'Yes') {
    res.redirect('upload-other-new-documents')
  } else if (preference == 'No') {
    res.redirect('../../../prepare-appeal/your-appeal')
  } else {
    res.redirect('../../../prepare-appeal/your-appeal')
  }
})

//upload-other-new-documents route
router.post('/upload-other-new-documents', function (req, res) {
  res.redirect('../../../prepare-appeal/your-appeal')
})

//declaration route
router.post('/declaration', function (req, res) {
  res.redirect('../../../prepare-appeal/your-appeal')
})

//confirmation page - send email via GOV.UK Notify
router.get('/confirmation', function (req, res, next) {
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
