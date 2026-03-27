const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Clear questionnaire-ldc-specific data when clear=true query parameter is present 
// (this means that pressing the start button from index clears your session data for the folder)

router.use('*', (req, res, next) => {
  if (req.query.clear === 'true') {
    req.session.data = {}
  }
  next()
})

//set service name for folder
router.use('*', (req, res, next) => {
  res.locals['serviceName'] = 'Manage appeals'

  next()
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Data items for status labels for sections
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

const SECTION_STATUS = {
  NOT_STARTED: 'Not started',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed'
}

function setSectionInProgress(sessionData, key) {
  if (sessionData[key] !== SECTION_STATUS.COMPLETED) {
    sessionData[key] = SECTION_STATUS.IN_PROGRESS
  }
}



// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Set count for the task list
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

router.get('/task-list', function(req, res, next){
  const data = req.session.data || {}

  const constraintsStatus = data['constraints-status'] || SECTION_STATUS.NOT_STARTED
  const poReportStatus = data['po-report-status'] || SECTION_STATUS.NOT_STARTED
  const siteAccessStatus = data['site-access-status'] || SECTION_STATUS.NOT_STARTED
  const appealProcessStatus = data['appeal-process-status'] || SECTION_STATUS.NOT_STARTED

  res.locals.constraintsComplete = constraintsStatus === SECTION_STATUS.COMPLETED
  res.locals.poReportComplete = poReportStatus === SECTION_STATUS.COMPLETED
  res.locals.siteAccessComplete = siteAccessStatus === SECTION_STATUS.COMPLETED
  res.locals.appealProcessComplete = appealProcessStatus === SECTION_STATUS.COMPLETED
  res.locals.constraintsInProgress = constraintsStatus === SECTION_STATUS.IN_PROGRESS
  res.locals.poReportInProgress = poReportStatus === SECTION_STATUS.IN_PROGRESS
  res.locals.siteAccessInProgress = siteAccessStatus === SECTION_STATUS.IN_PROGRESS
  res.locals.appealProcessInProgress = appealProcessStatus === SECTION_STATUS.IN_PROGRESS

  // Calculate count
  let count = 0
  if (res.locals.constraintsComplete) { count++ }
  if (res.locals.poReportComplete) { count++ }
  if (res.locals.siteAccessComplete) { count++ }
  if (res.locals.appealProcessComplete) { count++ }

  res.locals.count = count
  next()
})


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Page routes constraints, designations and other issues section
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░


// POST route for correct-appeal-type-check
router.post('/correct-appeal-type-check', function (req, res) {
  setSectionInProgress(req.session.data, 'constraints-status')
  const answer = req.session.data['correct-appeal-type']

  if (answer == 'Yes') {
    res.redirect('./certificate-type-check')
  } else {
    res.redirect('./certificate-type-check')
  }
})

//certificate-type-check route
router.post('/certificate-type-check', function (req, res) {
  res.redirect('planning-condition-check')
})


// POST route for planning-condition-check
router.post('/planning-condition-check', function (req, res) {
  const answer = req.session.data['planning-condition-check']

  if (answer == 'Yes') {
    res.redirect('./upload-relevant-planning-permission')
  } else {
    res.redirect('./enforcement-notice-date-application-check')
  }
})

//upload-relevant-planning-permission route
router.post('/upload-relevant-planning-permission', function (req, res) {
  res.redirect('enforcement-notice-date-application-check')
})

// POST route for enforcement-notice-date-application-check
router.post('/enforcement-notice-date-application-check', function (req, res) {
  const answer = req.session.data['enforcement-notice-date-application']

  if (answer === 'Yes') {
    res.redirect('./upload-enforcement-notice')
  } else {
    res.redirect('./related-applications-check')
  }
})

//upload-enforcement-notice route
router.post('/upload-enforcement-notice', function (req, res) {
  res.redirect('./related-applications-check')
})


// POST route for related-applications-check
router.post('/related-applications-check', function (req, res) {
  const answer = req.session.data['related-applications-check'] || req.session.data['related-applications']

  if (answer == 'Yes') {
    res.redirect('./upload-related-application')
  } else {
    res.redirect('./appeal-invalid-check')
  }
})

//upload-related-applications route
router.post('/upload-related-application', function (req, res) {
  res.redirect('appeal-invalid-check')
})

//appeal-invalid-check route
router.post('/appeal-invalid-check', function (req, res) {
  req.session.data['constraints-status'] = SECTION_STATUS.COMPLETED
  setSectionInProgress(req.session.data, 'po-report-status')
  res.redirect('./planning-officer-report')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Page routes Planning officer’s report and supporting documents 
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// POST route for planning-officer-report
router.post('/planning-officer-report', function (req, res) {
  setSectionInProgress(req.session.data, 'po-report-status')
  const answer = req.session.data['planning-officer-report']

  if (answer == 'Yes') {
    res.redirect('./upload-planning-officers-report-decision-notice')
  } else {
    res.redirect('./community-infrastructure-check')
  }
})

// POST route for upload-planning-officers-report-decision-notice
router.post('/upload-planning-officers-report-decision-notice', function (req, res) {
  res.redirect('./community-infrastructure-check')
})

// POST route for community-infrastructure-check
router.post('/community-infrastructure-check', function (req, res) {
  const answer = req.session.data['community-infrastructure-check']

  if (answer == 'Yes') {
    res.redirect('./community-infrastructure-upload')
  } else {
    res.redirect('./other-relevant-matters')
  }
})

// POST route for community-infrastructure-upload
router.post('/community-infrastructure-upload', function (req, res) {
  res.redirect('./community-infrastructure-adopted')
})

// POST route for community-infrastructure-adopted
router.post('/community-infrastructure-adopted', function (req, res) {
  res.redirect('./community-infrastructure-date')
})

// POST route for community-infrastructure-date
router.post('/community-infrastructure-date', function (req, res) {
  res.redirect('./other-relevant-matters')
})

// POST route for other-relevant-matters
router.post('/other-relevant-matters', function (req, res) {
  const answer = req.session.data['other-relevant-matters']

  if (answer == 'Yes') {
    res.redirect('./upload-other-relevant-matters')
  } else {
    req.session.data['po-report-status'] = SECTION_STATUS.COMPLETED
    setSectionInProgress(req.session.data, 'site-access-status')
    res.redirect('./inspector-access-appeal-site')
  }
})

// POST route for upload-other-relevant-matters
router.post('/upload-other-relevant-matters', function (req, res) {
  req.session.data['po-report-status'] = SECTION_STATUS.COMPLETED
  setSectionInProgress(req.session.data, 'site-access-status')
  res.redirect('./inspector-access-appeal-site')
})



// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Page routes site access
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// POST route for inspector-access-appeal-site
router.post('/inspector-access-appeal-site', function (req, res) {
  setSectionInProgress(req.session.data, 'site-access-status')
  res.redirect('./inspector-enter-neighbour-site')
})

// POST route for inspector-enter-neighbour-site
router.post('/inspector-enter-neighbour-site', function (req, res) {
  const answer = req.session.data['inspector-enter-neighbour-site']

  if (answer == 'Yes') {
    res.redirect('./neighbours-address')
  } else {
    res.redirect('./procedure-type')
  }
})

// POST route for neighbours-address
router.post('/neighbours-address', function (req, res) {
  res.redirect('./neighbours')
})

// POST route for neighbours
router.post('/neighbours', function (req, res) {
  const answer = req.session.data['add-neighbours']

  if (answer == 'Yes') {
    res.redirect('./neighbours-address')
  } else {
    res.redirect('./health-and-safety')
  }
})

// POST route for health-and-safety
router.post('/health-and-safety', function (req, res) {
  req.session.data['site-access-status'] = SECTION_STATUS.COMPLETED
  setSectionInProgress(req.session.data, 'appeal-process-status')
  res.redirect('./procedure-type')
})

// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Page routes appeal process
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// POST route for procedure-type
router.post('/procedure-type', function (req, res) {
  setSectionInProgress(req.session.data, 'appeal-process-status')
  const answer = req.session.data['procedure']

  if (answer == 'Inquiry') {
    res.redirect('./prefer-inquiry')
  } else if (answer == 'Hearing') {
    res.redirect('./prefer-hearing')
  } else if (answer == 'Written representations') {
    res.redirect('./other-appeals')
  } else {
    res.redirect('./procedure-type')
  }
})

// POST route for prefer-hearing
router.post('/prefer-hearing', function (req, res) {
  res.redirect('./other-appeals')
})

// POST route for how-many-days-inquiry
router.post('/how-many-days-inquiry', function (req, res) {
  res.redirect('./prefer-inquiry')
})

// POST route for prefer-inquiry
router.post('/prefer-inquiry', function (req, res) {
  res.redirect('./other-appeals')
})

// POST route for other-appeals
router.post('/other-appeals', function (req, res){
  const answer = req.session.data['other-appeals']

  if (answer == 'Yes') {
    res.redirect('./other-appeal-reference')
  } else {
    req.session.data['appeal-process-status'] = SECTION_STATUS.COMPLETED
    res.redirect('./task-list')
  }
})



// POST route for other-appeal-reference
router.post('/other-appeal-reference', function (req, res) {
  const reference = req.session.data['other-appeal-reference']
  const otherAppeals = req.session.data['other-appeal-references'] || []

  if (reference) {
    otherAppeals.push(reference)
    req.session.data['other-appeal-references'] = otherAppeals
  }

  res.redirect('./appeal-reference-number')
})


// POST route for add-another-appeal
router.post('/add-another-appeal', function (req, res) {
  const answer = req.session.data['add-another-appeal']

  if (answer == 'Yes') {
    res.redirect('./other-appeal-reference')
  } else if (answer == 'No') {
    req.session.data['appeal-process-status'] = SECTION_STATUS.COMPLETED
    res.redirect('./task-list')
  }
})

// POST route for appeal-reference-number
router.post('/appeal-reference-number', function (req, res) {
  const answer = req.session.data['add-another-appeal']

  if (answer == 'Yes') {
    res.redirect('./other-appeal-reference')
  } else if (answer == 'No') {
    req.session.data['appeal-process-status'] = SECTION_STATUS.COMPLETED
    res.redirect('./task-list')
  }
})


// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
// Page routes submit questionnaire
// ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░

// POST route for check-your-answers
router.post('/check-your-answers', function (req, res) {
  res.redirect('./confirmation')
})

module.exports = router
