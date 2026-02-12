const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Before you start'
  next()
})

router.get('/decision-date-due', function (req, res, next) {
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

router.post('/before-you-start', function (req, res) {
  res.redirect('lpa-name')
})

router.post('/lpa-name', function (req, res) {
  res.redirect('enforcement-notice')
})

router.post('/listed-building', function (req, res) {
  console.log('Listed building route hit')
  console.log('Radio value:', req.session.data['listed-building'])
  
  if (req.session.data['listed-building'] == 'Yes') {
    res.redirect('granted-or-refused')
  } else {
    res.redirect('cya')
  }
})

router.post('/granted-or-refused', function (req, res) {
  const decisionStatus = req.session.data['granted-or-refused']

  if (decisionStatus === 'I have not received a decision') {
    res.redirect('decision-date-due')
  } else {
    res.redirect('decision-date')
  }
})

// Decision date due route to check if within 6 months
router.post('/decision-date-due', function (req, res) {
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
router.post('/decision-date', function (req, res) {
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
router.post('/cya', function (req, res) {
  res.redirect('email')
})
// route for the CYA form submission end

// route for the enter code form submission
router.post('/enter-code', function (req, res) {
  res.redirect('email-confirmed')
})
// route for the enter code form submission end

// route for the email confirmed  form submission
router.post('/email-confirmed', function (req, res) {
  res.redirect('before-you-start-appeals')
})
// route for the email confirmed  form submission end

// route for the BYS form submission
router.post('/before-you-start-appeals', function (req, res) {
  res.redirect('/appeal/ldc/v4/prepare-appeal/your-appeal')
})
// route for the BYS form submission end
module.exports = router
