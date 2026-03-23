const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Add return to task list
  res.locals['return'] = true

  next()
})

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
  const descriptionChanged = req.session.data['description-development-correct']
  console.log('description-development-correct value:', descriptionChanged)
  console.log('description-development-correct type:', typeof descriptionChanged)

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


// routes copied from before-you-start/

router.get('/before-you-start/decision-date-due', function (req, res, next) {
  // Build a hint date exactly one month in the past, zeroed to midnight
  const today = new Date()
  const example = new Date(today.getTime())
  example.setHours(0, 0, 0, 0)
  example.setMonth(example.getMonth() - 1)

  const day = String(example.getDate()).padStart(2, '0')
  const month = String(example.getMonth() + 1).padStart(2, '0')
  const year = example.getFullYear()
  next()

  res.locals.decisionDateDueHint = `${day} ${month} ${year}`
})

router.post('/before-you-start/before-you-start', function (req, res) {
  res.redirect('lpa-name')
})

router.post('/before-you-start/lpa-name', function (req, res) {
  res.redirect('enforcement-notice')
})

router.post('/before-you-start/listed-building', function (req, res) {
  console.log('Listed building route hit')
  console.log('Radio value:', req.session.data['listed-building'])

  if (req.session.data['listed-building'] == 'Yes') {
    res.redirect('granted-or-refused')
  } else {
    res.redirect('cya')
  }
})

router.post('/before-you-start/granted-or-refused', function (req, res) {
  const decisionStatus = req.session.data['granted-or-refused']

  if (decisionStatus === 'I have not received a decision') {
    res.redirect('decision-date-due')
  } else {
    res.redirect('decision-date')
  }
})

// Decision date due route to check if within 6 months
router.post('/before-you-start/decision-date-due', function (req, res) {
  const day = req.session.data['decision-date-due-day']
  const month = req.session.data['decision-date-due-month']
  const year = req.session.data['decision-date-due-year']

  if (!day || !month || !year) {
    const fallback = new Date()
    fallback.setHours(0, 0, 0, 0)
    fallback.setMonth(fallback.getMonth() + 1)

    const fallbackWeekday = fallback.toLocaleDateString('en-GB', { weekday: 'long' })
    const fallbackMonthName = fallback.toLocaleDateString('en-GB', { month: 'long' })

    req.session.data['appeal-deadline-formatted'] = `11.59pm on ${fallbackWeekday} ${fallback.getDate()} ${fallbackMonthName} ${fallback.getFullYear()}`
    return res.redirect('cya')
  }

  const entered = new Date(Number(year), Number(month) - 1, Number(day))
  const cutoff = new Date()
  cutoff.setHours(0, 0, 0, 0)
  entered.setHours(0, 0, 0, 0)
  cutoff.setMonth(cutoff.getMonth() - 6)

  const deadline = new Date(Number(year), Number(month) - 1, Number(day))
  deadline.setMonth(deadline.getMonth() + 6)
  const deadlineWeekday = deadline.toLocaleDateString('en-GB', { weekday: 'long' })
  const deadlineMonthName = deadline.toLocaleDateString('en-GB', { month: 'long' })
  req.session.data['appeal-deadline-formatted'] = `11.59pm on ${deadlineWeekday} ${deadline.getDate()} ${deadlineMonthName} ${deadline.getFullYear()}`
  const decisionDateDue = new Date(Number(year), Number(month) - 1, Number(day))
  const decisionDateDueMonthName = decisionDateDue.toLocaleDateString('en-GB', { month: 'long' })
  req.session.data['decision-date-formatted'] = `${decisionDateDue.getDate()} ${decisionDateDueMonthName} ${decisionDateDue.getFullYear()}`
  const decisionDate = new Date(Number(year), Number(month) - 1, Number(day))
  const decisionMonthName = decisionDate.toLocaleDateString('en-GB', { month: 'long' })
  req.session.data['decision-date-formatted'] = `${decisionDate.getDate()} ${decisionMonthName} ${decisionDate.getFullYear()}`

  if (entered < cutoff) {
    const deadlineDay = deadline.getDate();
    const deadlineMonthName = deadline.toLocaleDateString('en-GB', { month: 'long' });
    const deadlineYear = deadline.getFullYear();
    req.session.data['appeal-deadline'] = `${deadlineDay} ${deadlineMonthName} ${deadlineYear}`;
    res.redirect('cannot-appeal')
  } else {
    res.redirect('cya')
  }
})
//Decision date due route to check if within 6 months end

// Decision date route to check if within 6 months
router.post('/before-you-start/decision-date', function (req, res) {
  const day = req.session.data['decision-date-day']
  const month = req.session.data['decision-date-month']
  const year = req.session.data['decision-date-year']

  if (!day || !month || !year) {
    const fallback = new Date()
    fallback.setHours(0, 0, 0, 0)
    fallback.setMonth(fallback.getMonth() + 1)

    const fallbackWeekday = fallback.toLocaleDateString('en-GB', { weekday: 'long' })
    const fallbackMonthName = fallback.toLocaleDateString('en-GB', { month: 'long' })

    req.session.data['appeal-deadline-formatted'] = `11.59pm on ${fallbackWeekday} ${fallback.getDate()} ${fallbackMonthName} ${fallback.getFullYear()}`
    return res.redirect('cya')
  }

  const entered = new Date(Number(year), Number(month) - 1, Number(day))
  const cutoff = new Date()
  cutoff.setHours(0, 0, 0, 0)
  entered.setHours(0, 0, 0, 0)
  cutoff.setMonth(cutoff.getMonth() - 6)

  const deadline = new Date(Number(year), Number(month) - 1, Number(day))
  deadline.setMonth(deadline.getMonth() + 6)
  const deadlineWeekday = deadline.toLocaleDateString('en-GB', { weekday: 'long' })
  const deadlineMonthName = deadline.toLocaleDateString('en-GB', { month: 'long' })
  req.session.data['appeal-deadline-formatted'] = `11.59pm on ${deadlineWeekday} ${deadline.getDate()} ${deadlineMonthName} ${deadline.getFullYear()}`

  if (entered < cutoff) {
    const deadlineDay = deadline.getDate();
    const deadlineMonthName = deadline.toLocaleDateString('en-GB', { month: 'long' });
    const deadlineYear = deadline.getFullYear();
    req.session.data['appeal-deadline'] = `${deadlineDay} ${deadlineMonthName} ${deadlineYear}`;
    res.redirect('cannot-appeal')
  } else {
    res.redirect('cya')
  }
})
//Decision date route to check if within 6 months end

// route for the CYA form submission
router.post('/before-you-start/cya', function (req, res) {
  res.redirect('email')
})
// route for the CYA form submission end

// route for the enter code form submission
router.post('/before-you-start/enter-code', function (req, res) {
  res.redirect('email-confirmed')
})
// route for the enter code form submission end

// route for the email confirmed  form submission
router.post('/before-you-start/email-confirmed', function (req, res) {
  res.redirect('before-you-start-appeals')
})
// route for the email confirmed  form submission end

// route for the BYS form submission
router.post('/before-you-start/before-you-start-appeals', function (req, res) {
  res.redirect('/appeal/ldc/v4/prepare-appeal/your-appeal')
})



// routes copied from prepare-appeal/

router.get('/prepare-appeal/application-date', function (req, res, next) {
  // Build a hint date exactly one month in the past, zeroed to midnight
  const today = new Date()
  const example = new Date(today.getTime())
  example.setHours(0, 0, 0, 0)
  example.setMonth(example.getMonth() - 1)

  const day = String(example.getDate()).padStart(2, '0')
  const month = String(example.getMonth() + 1).padStart(2, '0')
  const year = example.getFullYear()
  next()

  res.locals.applicationDateHint = `${day} ${month} ${year}`
})


//applicant name route
router.post('/prepare-appeal/application-name', function (req, res) {
  const response = req.session.data['application-name']
  req.session.data['aboutYouSectionStatus'] = 'started'

  if (response == 'Yes') {
    res.redirect('contact-details')
  } else {
    res.redirect('appellant-name')
  }
  
})

//appellant-name route
router.post('/prepare-appeal/appellant-name', function (req, res) {
  res.redirect('contact-details')
})

//contact details route
router.post('/prepare-appeal/contact-details', function (req, res) {
  res.redirect('phone-number')
})

//phone-number route
router.post('/prepare-appeal/phone-number', function (req, res) {
  req.session.data['aboutYouSectionStatus'] = 'complete'
  res.redirect('appeal-site-address')
  
})

//appeal-site-address route
router.post('/prepare-appeal/appeal-site-address', function (req, res) {
  req.session.data['siteSectionStatus'] = 'started'
  res.redirect('green-belt')

})

//green-belt route
router.post('/prepare-appeal/green-belt', function (req, res) {
  res.redirect('inspector-need-access')
})

//inspector-need-access route
router.post('/prepare-appeal/inspector-need-access', function (req, res) {
  res.redirect('health-and-safety')
})

//health-and-safety route
router.post('/prepare-appeal/health-and-safety', function (req, res) {
  req.session.data['siteSectionStatus'] = 'complete'
  
  res.redirect('application-ref')
})

//application-ref route
router.post('/prepare-appeal/application-ref', function (req, res) {
  req.session.data['applicationSectionStatus'] = 'started'

  res.redirect('application-date')
})

//application-date route
router.post('/prepare-appeal/application-date', function (req, res) {
  res.redirect('existing-use')
})

router.post('/prepare-appeal/application-form', function (req, res) {
  res.redirect('planning-obligation-check')
})

//existing-use route
router.post('/prepare-appeal/existing-use', function (req, res) {
  res.redirect('existing-or-proposed')
})

//existing-or-proposed route
router.post('/prepare-appeal/existing-or-proposed', function (req, res) {
  const ldcType = req.session.data['existing-or-proposed']

  if (ldcType == 'Existing development') {
    
    res.redirect('decide-appeal')

  } else {
    res.redirect('description-of-development')
  }
})

//description-of-development route
router.post('/prepare-appeal/description-of-development', function (req, res) {
  res.redirect('description-development-correct')
})

//description-development-correct route
router.post('/prepare-appeal/description-development-correct', function (req, res) {
  
  req.session.data['applicationSectionStatus'] = 'complete'

  const descriptionCorrect = req.session.data['description-development-correct']
    res.redirect('decide-appeal')
  }
  
)

//decide-appeal route with branching
router.post('/prepare-appeal/decide-appeal', function (req, res) {
  
  req.session.data['appealSectionStatus'] = 'started'
  
  console.log('=== decide-appeal POST route hit ===')
  console.log('Full session data:', JSON.stringify(req.session.data, null, 2))
  const preference = req.session.data['decide-appeal']
  console.log('decide-appeal value:', preference)

  if (preference === 'Written representations') {
    console.log('Redirecting to other-appeals')
    res.redirect('other-appeals')
  } else if (preference === 'Hearing') {
    console.log('Redirecting to prefer-hearing')
    res.redirect('prefer-hearing')
  } else if (preference === 'Inquiry') {
    console.log('Redirecting to prefer-inquiry')
    res.redirect('prefer-inquiry')
  } else {
    console.log('No match, redirecting to other-appeals')
    res.redirect('other-appeals')
  }
})

//prefer-inquiry route
router.post('/prepare-appeal/prefer-inquiry', function (req, res) {
  res.redirect('how-many-days-inquiry')
})

//how-many-days-inquiry route
router.post('/prepare-appeal/how-many-days-inquiry', function (req, res) {
  console.log('how-many-days-inquiry route hit')
  console.log('Form data:', req.session.data)
  res.redirect('how-many-witnesses')
})

//how-many-witnesses route
router.post('/prepare-appeal/how-many-witnesses', function (req, res) {
  res.redirect('other-appeals')
})

//prefer-hearing route
router.post('/prepare-appeal/prefer-hearing', function (req, res) {
  res.redirect('other-appeals')
})

//other-appeals route with branching
router.post('/prepare-appeal/other-appeals', function (req, res) {
  const preference = req.session.data['other-appeals-radio']

  if (preference == 'Yes') {
    res.redirect('enter-appeal-reference')
  } else if (preference === 'No') {
    req.session.data['appealSectionStatus'] = 'complete'
    res.redirect('../task-list')
  } else {
    req.session.data['appealSectionStatus'] = 'complete'
    res.redirect('../task-list')
  }
})

//enter-appeal-reference route
router.post('/prepare-appeal/enter-appeal-reference', function (req, res) {
  const reference = req.session.data['other-appeal-reference']
  const otherAppeals = req.session.data['other-appeal-references'] || []

  if (reference) {
    otherAppeals.push(reference)
    req.session.data['other-appeal-references'] = otherAppeals
  }

  res.redirect('add-another-appeal')
})

//add-another-appeal route with branching
router.post('/prepare-appeal/add-another-appeal', function (req, res) {
  const preference = req.session.data['other-appeals']

  if (preference == 'Yes') {
    res.redirect('enter-appeal-reference')
  } else if (preference === 'No') {
    req.session.data['appealSectionStatus'] = 'complete'
    res.redirect('../task-list')
  } else {
    req.session.data['appealSectionStatus'] = 'complete'
    res.redirect('../task-list')
  }
})





// routes copied from upload-documents/





//application-form route with branching
router.post('/upload-documents/application-form', function (req, res) {
  console.log('application-form POST route hit')
  console.log('Session data:', req.session.data)

  // Check if user agreed a new description with LPA
  const descriptionChanged = req.session.data['description-development-correct']
  console.log('description-development-correct:', descriptionChanged)

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
router.post('/upload-documents/decision-letter', function (req, res) {
  res.redirect('planning-obligation-check')
})

//planning-obligation-check routes with branches
router.post('/upload-documents/planning-obligation-check', function (req, res) {
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
router.post('/upload-documents/planning-obligation-status', function (req, res) {
  console.log('=== planning-obligation-status POST route hit ===')
  console.log('planning-obligation-status value:', req.session.data['planning-obligation-status'])
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
router.post('/upload-documents/planning-obligation', function (req, res) {
  res.redirect('appeal-statement')
})

//appeal-statement route with branching
router.post('/upload-documents/appeal-statement', function (req, res) {
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
router.post('/upload-documents/draft-statement-common-ground', function (req, res) {
  console.log('=== draft-statement-common-ground POST route hit ===')
  res.redirect('apply-appeal-costs')
})



//apply-appeal-costs routes with branches
router.post('/upload-documents/apply-appeal-costs', function (req, res) {
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
router.post('/upload-documents/costs', function (req, res) {
  res.redirect('plans-or-drawings')
})


//plans-or-drawings route
router.post('/upload-documents/plans-or-drawings', function (req, res) {
  res.redirect('new-plans-drawings-check')
})

//new-plans-drawings-check routes with branches
router.post('/upload-documents/new-plans-drawings-check', function (req, res) {
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
router.post('/upload-documents/plans-or-drawings', function (req, res) {
  res.redirect('other-new-documents-check')
})

//other-new-documents-check routes with branches
router.post('/upload-documents/other-new-documents-check', function (req, res) {
  const preference = req.session.data['other-new-documents-check']

  if (preference == 'Yes') {
    res.redirect('upload-other-new-documents')
  } else if (preference == 'No') {
    res.redirect('../task-list')
  } else {
    res.redirect('../task-list')
  }
})

//upload-other-new-documents route
router.post('/upload-documents/upload-other-new-documents', function (req, res) {
  res.redirect('../task-list')
})

//declaration route
router.post('/upload-documents/declaration', function (req, res) {
  res.redirect('../task-list')
})

//confirmation page - send email via GOV.UK Notify
router.get('/upload-documents/confirmation', function (req, res, next) {
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

//planning-obligation-status routes with branches
router.post('/upload-documents/planning-obligation-status', function (req, res) {
  console.log('=== planning-obligation-status POST route hit (v4/_routes.js) ===')
  const preference = req.session.data['planning-obligation-status']

  if (preference == 'Finalised and ready to submit') {
    res.redirect('planning-obligation')
  } else {
    res.redirect('appeal-statement')
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
  res.redirect('../prepare-appeal/your-appeal')
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
  if (req.body['environment-statement']) {
    req.session.data['environment-statement'] = asArray(req.body['environment-statement'])
    console.log('Stored environment-statement files:', req.session.data['environment-statement'])
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


module.exports = router
