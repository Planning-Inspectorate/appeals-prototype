const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()
const NotifyClient = require('notifications-node-client').NotifyClient






router.post('/appeal-statement copy', function (req, res) {
  res.redirect('planning-obligation-check')
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
  res.redirect('decision-letter-check')
})


//decision-letter-check routes with branches
router.post('/decision-letter-check', function (req, res) {
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
router.post('/decision-letter', function (req, res) {
  res.redirect('planning-obligation-check')
})

//planning-obligation-check routes with branches
router.post('/planning-obligation-check', function (req, res) {
  const preference = req.session.data['planning-obligation-check']
  
  if (preference == 'Yes') {
    res.redirect('status-planning-obligation')
  } else if (preference === 'No') {
    res.redirect('appeal-statement')
  } else {
    res.redirect('appeal-statement')
  }
})

//status-planning-obligation routes with branches
router.post('/status-planning-obligation', function (req, res) {
  const preference = req.session.data['status-planning-obligation']
  
  if (preference == 'Yes') {
    res.redirect('planning-obligation')
  } else if (preference == 'No') {
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
  const preference = req.session.data['application-desc-changed']
  
  if (preference == 'Hearing' || preference == 'Inquiry') {
    res.redirect('draft-statement-common-ground')
  } else {
    res.redirect('apply-appeal-costs')
  }
})

//draft-statement-common-ground route
router.post('/draft-statement-common-ground', function (req, res) {
  res.redirect('apply-appeal-costs')
})

//appeal-statement route with branching
router.post('/appeal-statement', function (req, res) {
  const preference = req.session.data['application-desc-changed']
  
  if (preference == 'Hearing' || preference == 'Inquiry') {
    res.redirect('draft-statement-common-ground')
  } else {
    res.redirect('apply-appeal-costs')
  }
})



//apply-appeal-costs routes with branches
router.post('/apply-appeal-costs', function (req, res) {
  const preference = req.session.data['apply-appeal-costs']
  
  if (preference == 'Yes') {
    res.redirect('plans-or-drawings')
  } else if (preference == 'No') {
    res.redirect('plans-or-drawings')
  } else {
    res.redirect('plans-or-drawings')
  }
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
  res.redirect('new-plans-drawings-check')
})

//upload-new-plans-drawings route
router.post('/upload-new-plans-drawings', function (req, res) {
  res.redirect('declaration')
})

//declaration route
router.post('/declaration', function (req, res) {
  res.redirect('confirmation')
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
