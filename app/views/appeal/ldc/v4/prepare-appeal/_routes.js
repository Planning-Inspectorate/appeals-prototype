const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.use(function(req, res, next){
  // Change the service name for this feature
  res.locals.serviceName = 'Prepare appeal'
  next()
})

router.get('/application-date', function (req, res, next) {
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
router.post('/application-name', function (req, res) {
  const response = req.session.data['application-name']
  
  if (response == 'Yes') {
    res.redirect('contact-details')
  } else {
    res.redirect('appellant-name')
  }
})

//appellant-name route
router.post('/appellant-name', function (req, res) {
  res.redirect('contact-details')
})

//contact details route
router.post('/contact-details', function (req, res) {
  res.redirect('phone-number')
})

//phone-number route
router.post('/phone-number', function (req, res) {
  res.redirect('appeal-site-address')
})

//appeal-site-address route
router.post('/appeal-site-address', function (req, res) {
  res.redirect('green-belt')
})

//green-belt route
router.post('/green-belt', function (req, res) {
  res.redirect('inspector-need-access')
})

//inspector-need-access route
router.post('/inspector-need-access', function (req, res) {
  res.redirect('health-and-safety')
})

//health-and-safety route
router.post('/health-and-safety', function (req, res) {
  res.redirect('application-ref')
})

//application-ref route
router.post('/application-ref', function (req, res) {
  res.redirect('application-date')
})

//application-date route
router.post('/application-date', function (req, res) {
  res.redirect('existing-use')
})

router.post('/application-form', function (req, res) {
  res.redirect('planning-obligation-check')
})

//existing-use route
router.post('/existing-use', function (req, res) {
  res.redirect('existing-or-proposed')
})
//existing-or-proposed route
router.post('/existing-or-proposed', function (req, res) {
  const ldcType = req.session.data['existing-or-proposed']
  
  if (ldcType == 'Existing development') {
    res.redirect('decide-appeal')
  } else {
    res.redirect('description-of-development')
  }
})

//description-of-development route
router.post('/description-of-development', function (req, res) {
  res.redirect('description-development-correct')
})

//description-development-correct route
router.post('/description-development-correct', function (req, res) {
  const descriptionCorrect = req.session.data['description-development-correct']
    res.redirect('decide-appeal')
  }
)

//decide-appeal route with branching
router.post('/decide-appeal', function (req, res) {
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
router.post('/prefer-inquiry', function (req, res) {
  res.redirect('how-many-days-inquiry')
})

//how-many-days-inquiry route
router.post('/how-many-days-inquiry', function (req, res) {
  console.log('how-many-days-inquiry route hit')
  console.log('Form data:', req.session.data)
  res.redirect('how-many-witnesses')
})

//how-many-witnesses route
router.post('/how-many-witnesses', function (req, res) {
  res.redirect('other-appeals')
})

//prefer-hearing route
router.post('/prefer-hearing', function (req, res) {
  res.redirect('other-appeals')
})

//other-appeals route with branching
router.post('/other-appeals', function (req, res) {
  const preference = req.session.data['other-appeals-radio']
  
  if (preference == 'Yes') {
    res.redirect('enter-appeal-reference')
  } else if (preference === 'No') {
    res.redirect('your-appeal')
  } else {
    res.redirect('your-appeal')
  }
})

//enter-appeal-reference route
router.post('/enter-appeal-reference', function (req, res) {
  const reference = req.session.data['other-appeal-reference']
  const otherAppeals = req.session.data['other-appeal-references'] || []

  if (reference) {
    otherAppeals.push(reference)
    req.session.data['other-appeal-references'] = otherAppeals
  }

  res.redirect('add-another-appeal')
})

//add-another-appeal route with branching
router.post('/add-another-appeal', function (req, res) {
  const preference = req.session.data['other-appeals']
  
  if (preference == 'Yes') {
    res.redirect('enter-appeal-reference')
  } else if (preference === 'No') {
    res.redirect('your-appeal')
  } else {
    res.redirect('your-appeal')
  }
})

module.exports = router
