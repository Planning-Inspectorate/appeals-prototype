const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){
  // Change the service name for this feature
  res.locals['serviceName'] = 'Appeal a planning decision'

  // Change the service name URL so it goes to the beginning
  res.locals['serviceUrl'] = '/'+req.originalUrl.split('/')[1]+'/'+req.originalUrl.split('/')[2]+'/'

  next()
})

// CYA links post back to the end
// Doesn't work for complex questions that would require other things to be shown but a quick prototype hack is better than nothing
router.post('*', function(req, res, next){
  if (req.session.data['cya']) {
    delete req.session.data['cya']
    res.redirect('cya');
  } else {
    next()
  }
})

router.post('/', function (req, res) {
  res.redirect('lpa')
})

router.post('/lpa', function (req, res) {
  res.redirect('planning/type')
})

// PLANNING TYPE
router.post('/planning/type', function (req, res) {
  let type = req.session.data['planning-type']

  switch (type) {
    case 'Full planning':
      res.redirect('any-of-following?type=full');
      break;
    case 'Householder planning':
      res.redirect('decision?type=has');
      break;
    case 'Listed building consent':
      res.redirect('major-development-check');
      break;
    case 'Prior approval':
    case 'Removal or variation of conditions':
      res.redirect('existing-home-check');
      break;
    default:
      res.redirect('major-development-check');
  }
})

// any of the following filter
router.post('/planning/any-of-following', function (req, res) {
  let specific = req.session.data['planning-filter'];
  if (!specific) { //nothing selected
    res.redirect('any-of-following'); //go back to current page
  }

  else if (specific.includes('None of these')) {  // assumption that this is an array that has to be looked through, otherwise this may need to be an iterator or just specific == 'None of these'
    res.redirect('decision');
  }
  else { //anything else goes to the same place
    res.redirect('appeal-filter');
  }
})

router.post('/planning/listed-building', function (req, res) {
  if (req.session.data['type'] == 'full') {
    res.redirect('major-development-check');
  } else {
    res.redirect('decision');
  }
})

router.post('/planning/existing-home-check', function (req, res) {
  if (req.session.data['existing-home-check'] == 'No') {
    res.redirect('major-development-check');
  } else {
    res.redirect('decision');
  }
})

router.post('/planning/major-development-check', function (req, res) {
  if (req.session.data['major-development-check'] == 'Yes') {
    res.redirect('../errors/no-major');
  } else {
    res.redirect('decision')
  }
})

router.post('/planning/decision', function (req, res) {
  if (req.session.data['decision'] == 'I have not received a decision') {
    res.redirect('decision-due-date?non-determined=Yes');
  } else {
    res.redirect('decision-date');
  }
})

router.post('/planning/decision-due-date', function (req, res) {
  res.redirect('enforcement-check')
})

router.post('/planning/decision-date', function (req, res) {
  res.redirect('enforcement-check')
})

router.post('/planning/enforcement-check', function (req, res) {
  res.redirect('cya')
})

// Link Check your answers to the various appeal submission journeys
router.post('/planning/cya', function (req, res) {

  let type = req.session.data['planning-type']

  if (type == 'Full planning') {
    res.redirect('/appeal/full/v5/before-you-continue');
  } else if (type == 'Householder planning') {
    res.redirect('/appeal/has/v3/task-list');
  }

})


// Add your routes above the module.exports line
module.exports = router
