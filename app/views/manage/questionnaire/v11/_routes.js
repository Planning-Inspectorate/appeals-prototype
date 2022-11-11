const express = require('express')
const router = new express.Router()

router.get('*', function(req, res, next){

  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage appeals'

  // Add return to task list
  res.locals['return'] = true

  next()
})

router.post('*', function(req, res, next){
  if (req.session.data['cya']) {
    delete req.session.data['cya']
    res.redirect('../task-list');
  } else {
    next()
  }
})

router.get('/task-list', function(req, res, next){
  let count = 0
  if (req.session.data['constraints-completed'] == 'true') { count++ }
  if (req.session.data['env-impact-completed'] == 'true') { count++ }
  if (req.session.data['notified-completed'] == 'true') { count++ }
  if (req.session.data['consultation-completed'] == 'true') { count++ }
  if (req.session.data['po-report-completed'] == 'true') { count++ }
  if (req.session.data['site-access-completed'] == 'true') { count++ }
  if (req.session.data['appeal-process-completed'] == 'true') { count++ }

  res.locals.count = count
  next()
})





//
// CONSTRAINTS
//
router.post('/constraints/:page', function (req, res, next) {
  req.session.data['constraints-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (
    req.session.data['listed-building-check-complete']
    && req.session.data['affected-listed-building-check-complete']
    && req.session.data['ancient-monument-complete']
    && req.session.data['conservation-check-complete']
    && req.session.data['protected-species-complete']
    && req.session.data['green-belt-complete']
    && req.session.data['outstanding-natural-beauty-complete']
    && req.session.data['designated-sites-complete']
    && req.session.data['tree-order-check-complete']
    && req.session.data['traveller-complete']
    && req.session.data['right-of-way-check-complete']
  ){
    req.session.data['constraints-completed'] = 'true'
  }

  next()
})

router.post('/constraints/listed-building-check', function (req, res) {
  if (req.session.data['listed-building-check'] == 'Yes') {
    res.redirect('listed-building-details');
  } else {
    res.redirect('affected-listed-building-check');
  }
})

router.post('/constraints/listed-building-details', function (req, res) {
  res.redirect('affected-listed-building-check')
})

router.post('/constraints/affected-listed-building-check', function (req, res) {
  if (req.session.data['affected-listed-building-check'] == 'Yes') {
    res.redirect('affected-listed-building-details');
  } else {
    res.redirect('ancient-monument');
  }
})

router.post('/constraints/affected-listed-building-details', function (req, res) {
  res.redirect('ancient-monument')
})

router.post('/constraints/ancient-monument', function (req, res) {
  res.redirect('conservation-check')
})

router.post('/constraints/conservation-check', function (req, res) {
  if (req.session.data['conservation-check'] == 'In a conservation area' || req.session.data['conservation-check'] == 'Next to a conservation area') {
    res.redirect('conservation-upload');
  } else {
    res.redirect('protected-species');
  }
})

router.post('/constraints/conservation-upload', function (req, res) {
  res.redirect('protected-species')
})

router.post('/constraints/protected-species', function (req, res) {
  res.redirect('green-belt')
})

router.post('/constraints/green-belt', function (req, res) {
  res.redirect('outstanding-natural-beauty')
})

router.post('/constraints/outstanding-natural-beauty', function (req, res) {
  res.redirect('designated-sites')
})

router.post('/constraints/designated-sites', function (req, res) {
  res.redirect('tree-order-check')
})

router.post('/constraints/tree-order-check', function (req, res) {
  if (req.session.data['tree-order-check'] == 'Yes') {
    res.redirect('tree-order-upload');
  } else {
    res.redirect('traveller');
  }
})

router.post('/constraints/tree-order-upload', function (req, res) {
  res.redirect('traveller')
})

router.post('/constraints/traveller', function (req, res) {
  res.redirect('right-of-way-check')
})

router.post('/constraints/right-of-way-check', function (req, res) {
  if (req.session.data['right-of-way-check'] == 'Yes') {
    req.session.data['constraints-completed'] = 'false'
    res.redirect('right-of-way-upload');
  } else {
    res.redirect('complete');
  }
})

router.post('/constraints/right-of-way-upload', function (req, res) {
  res.redirect('complete')
})

router.get('/constraints/complete', function (req, res) {
  if (!req.session.data['env-impact-completed']) {
    res.redirect('../env-impact/schedule')
  } else if (!req.session.data['notified-completed']) {
    res.redirect('../notified/notified-how')
  } else if (!req.session.data['consultation-completed']) {
    res.redirect('../consultation/consulted')
  } else if (!req.session.data['po-report-completed']) {
    res.redirect('../po-report/report-upload')
  } else if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-visibility')
  } else if (!req.session.data['appeal-process-completed']) {
    res.redirect('../appeal-process/procedure')
  } else {
    res.redirect('../task-list')
  }
})







//
// ENVIRONMENTAL IMPACT
//
router.post('/env-impact/:page', function (req, res, next) {
  req.session.data['env-impact-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (req.session.data['schedule'] == 'Schedule 1') {
    if (req.session.data['env-statement-check'] == 'Yes') {
      if (
        req.session.data['env-statement-upload-complete']
        && req.session.data['env-statement-responses-upload-complete']
        && req.session.data['site-notice-upload-complete']
      ){
        req.session.data['env-impact-completed'] = 'true'
      }
    } else if (req.session.data['env-statement-check'] == 'No') {
      if (req.session.data['negative-screening-upload-complete']) {
        req.session.data['env-impact-completed'] = 'true'
      }
    }
  }

  if (
    req.session.data['schedule'] == 'Schedule 2'
    && req.session.data['development-desc-complete']
    && req.session.data['sensitive-area-complete']
    && req.session.data['column-two-complete']
  ) {
    if (req.session.data['screening-check'] == 'Yes') {
      if (req.session.data['screening-upload'] == 'Yes') {
        if (req.session.data['screening-env-statement-check'] == 'Yes') {
          if (req.session.data['env-statement-check'] == 'Yes') {
            if (
              req.session.data['env-statement-upload-complete']
              && req.session.data['env-statement-responses-upload-complete']
              && req.session.data['site-notice-upload-complete']
            ){
              req.session.data['env-impact'] = 'true'
            }
          } else if (req.session.data['env-statement-check'] == 'No') {
            if (req.session.data['negative-screening-upload-complete']) {
              req.session.data['env-impact-completed'] = 'true'
            }
          }
        } else if (req.session.data['screening-env-statement-check'] == 'No') {
          if (req.session.data['applicant-env-statement-check'] == 'Yes') {
            if (req.session.data['env-statement-responses-upload-complete']) {
              req.session.data['env-impact-completed'] = 'true'
            }
          } else if (req.session.data['applicant-env-statement-check'] == 'No') {
            req.session.data['env-impact-completed'] = 'true'
          }
        }
      }
    } else if (req.session.data['screening-check'] == 'No') {
      if (req.session.data['applicant-env-statement-check'] == 'Yes') {
        if (req.session.data['env-statement-responses-upload-complete']) {
          req.session.data['env-impact-completed'] = 'true'
        }
      } else if (req.session.data['applicant-env-statement-check-complete']) {
        req.session.data['env-impact-completed'] = 'true'
      }
    }
  }

  if (req.session.data['schedule'] == 'No') {
    if (req.session.data['screening-check'] == 'Yes') {
      if (req.session.data['screening-upload'] == 'Yes') {
        if (req.session.data['screening-env-statement-check'] == 'Yes') {
          if (req.session.data['env-statement-check'] == 'Yes') {
            if (
              req.session.data['env-statement-upload-complete']
              && req.session.data['env-statement-responses-upload-complete']
              && req.session.data['site-notice-upload-complete']
            ){
              req.session.data['env-impact'] = 'true'
            }
          } else if (req.session.data['env-statement-check'] == 'No') {
            if (req.session.data['negative-screening-upload-complete']) {
              req.session.data['env-impact-completed'] = 'true'
            }
          }
        } else if (req.session.data['screening-env-statement-check'] == 'No') {
          if (req.session.data['applicant-env-statement-check'] == 'Yes') {
            if (req.session.data['env-statement-responses-upload-complete']) {
              req.session.data['env-impact-completed'] = 'true'
            }
          } else if (req.session.data['applicant-env-statement-check'] == 'No') {
            req.session.data['env-impact-completed'] = 'true'
          }
        }
      }
    } else if (req.session.data['screening-check'] == 'No') {
      if (req.session.data['applicant-env-statement-check'] == 'Yes') {
        if (req.session.data['env-statement-responses-upload-complete']) {
          req.session.data['env-impact-completed'] = 'true'
        }
      } else if (req.session.data['applicant-env-statement-check-complete']) {
        req.session.data['env-impact-completed'] = 'true'
      }
    }
  }

  next()
})

router.post('/env-impact/schedule', function (req, res) {
  if (req.session.data['schedule'] == 'Schedule 1') {
    res.redirect('env-statement-check');
  } else if (req.session.data['schedule'] == 'Schedule 2') {
    res.redirect('development-desc');
  } else {
    req.session.data['schedule'] = 'No'
    res.redirect('screening-check');
  }
})

router.post('/env-impact/development-desc', function (req, res) {
  res.redirect('sensitive-area')
})

router.post('/env-impact/sensitive-area', function (req, res) {
  res.redirect('column-two')
})

router.post('/env-impact/column-two', function (req, res) {
  res.redirect('screening-check')
})

router.post('/env-impact/screening-check', function (req, res) {
  if (req.session.data['screening-check'] == 'Yes') {
    res.redirect('screening-upload');
  } else {
    req.session.data['screening-check'] = 'No'
    res.redirect('applicant-env-statement-check');
  }
})

router.post('/env-impact/screening-upload', function (req, res) {
  res.redirect('screening-env-statement-check')
})

router.post('/env-impact/screening-env-statement-check', function (req, res) {
  if (req.session.data['screening-env-statement-check'] == 'Yes') {
    res.redirect('env-statement-check');
  } else {
    req.session.data['screening-env-statement-check'] = 'No'
    res.redirect('applicant-env-statement-check');
  }
})

router.post('/env-impact/env-statement-check', function (req, res) {
  if (req.session.data['env-statement-check'] == 'Yes') {
    res.redirect('env-statement-upload');
  } else {
    req.session.data['env-statement-check'] = 'No'
    res.redirect('negative-screening-upload');
  }
})

router.post('/env-impact/env-statement-upload', function (req, res) {
  res.redirect('env-statement-responses-upload')
})

router.post('/env-impact/env-statement-responses-upload', function (req, res) {
  res.redirect('site-notice-upload')
})

router.post('/env-impact/site-notice-upload', function (req, res) {
  res.redirect('complete')
})

router.post('/env-impact/negative-screening-upload', function (req, res) {
  res.redirect('complete')
})

router.post('/env-impact/applicant-env-statement-check', function (req, res) {
  if (req.session.data['applicant-env-statement-check'] == 'Yes') {
    res.redirect('env-statement-responses-upload');
  } else {
    req.session.data['applicant-env-statement-check'] = 'No'
    res.redirect('complete');
  }
})

router.get('/env-impact/complete', function (req, res) {
  if (!req.session.data['notified-completed']) {
    res.redirect('../notified/notified-how')
  } else if (!req.session.data['consultation-completed']) {
    res.redirect('../consultation/consulted')
  } else if (!req.session.data['po-report-completed']) {
    res.redirect('../po-report/report-upload')
  } else if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-visibility')
  } else if (!req.session.data['appeal-process-completed']) {
    res.redirect('../appeal-process/procedure')
  } else {
    res.redirect('../task-list')
  }
})





//
// NOTIFIED
//
router.post('/notified/:page', function (req, res, next) {
  req.session.data['notified-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  next()
})

router.post('/notified/notified-how', function (req, res) {
  if (req.session.data['notified-how']?.includes('A site notice')) {
    res.redirect('site-notice-upload');
  } else if (req.session.data['notified-how']?.includes('Letters to the neighbours')) {
    res.redirect('letters-upload');
  } else {
    req.session.data['notified-how'] = 'A press advert'
    res.redirect('press-advert-upload');
  }
})

router.post('/notified/site-notice-upload', function (req, res) {
  if (req.session.data['notified-how']?.includes('Letters to the neighbours')) {
    res.redirect('letters-upload');
  } else if (req.session.data['notified-how']?.includes('A press advert')) {
    res.redirect('press-advert-upload');
  } else {
    req.session.data['notified-completed'] = 'true'
    res.redirect('complete');
  }
})

router.post('/notified/letters-upload', function (req, res) {
  if (req.session.data['notified-how']?.includes('A press advert')) {
    res.redirect('press-advert-upload');
  } else {
    req.session.data['notified-completed'] = 'true'
    res.redirect('complete');
  }
})

router.post('/notified/press-advert-upload', function (req, res) {
  req.session.data['notified-completed'] = 'true'
  res.redirect('complete');
})

router.get('/notified/complete', function (req, res) {
  if (!req.session.data['consultation-completed']) {
    res.redirect('../consultation/consulted')
  } else if (!req.session.data['po-report-completed']) {
    res.redirect('../po-report/report-upload')
  } else if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-visibility')
  } else if (!req.session.data['appeal-process-completed']) {
    res.redirect('../appeal-process/procedure')
  } else {
    res.redirect('../task-list')
  }
})





//
// CONSULTATION
//
router.post('/consultation/:page', function (req, res, next) {
  req.session.data['consultation-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (
    req.session.data['consulted-complete']
    && req.session.data['consultation-responses-check-complete']
    && req.session.data['other-parties-check-complete']
  ){
    if (
      req.session.data['consultation-responses-check'] == 'Yes'
      && req.session.data['consultation-responses-upload-complete']
      && req.session.data['other-parties-check'] == 'Yes'
      && req.session.data['other-parties-upload-complete']
    ){
      req.session.data['consultation-completed'] = 'true'
    } else if (
      req.session.data['consultation-responses-check'] == 'Yes'
      && req.session.data['consultation-responses-upload-complete']
      && req.session.data['other-parties-check'] == 'No'
    ){
      req.session.data['consultation-completed'] = 'true'
    } else if (
      req.session.data['consultation-responses-check'] == 'No'
      && req.session.data['other-parties-check'] == 'Yes'
      && req.session.data['other-parties-upload-complete']
    ){
      req.session.data['consultation-completed'] = 'true'
    } else if (
      req.session.data['consultation-responses-check'] == 'No'
    ){
      req.session.data['consultation-completed'] = 'true'
    }
  }

  next()
})

router.post('/consultation/consulted', function (req, res) {
  res.redirect('consultation-responses-check')
})

router.post('/consultation/consultation-responses-check', function (req, res) {
  if (req.session.data['consultation-responses-check'] == 'Yes') {
    res.redirect('consultation-responses-upload');
  } else {
    req.session.data['consultation-responses-check'] = 'No'
    res.redirect('other-parties-check');
  }
})

router.post('/consultation/consultation-responses-upload', function (req, res) {
  res.redirect('other-parties-check');
})

router.post('/consultation/other-parties-check', function (req, res) {
  if (req.session.data['other-parties-check'] == 'Yes') {
    req.session.data['consultation-completed'] = 'false'
    res.redirect('other-parties-upload');
  } else {
    res.redirect('complete');
  }
})

router.post('/consultation/other-parties-upload', function (req, res) {
  res.redirect('complete');
})

router.get('/consultation/complete', function (req, res) {
  if (!req.session.data['po-report-completed']) {
    res.redirect('../po-report/report-upload')
  } else if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-visibility')
  } else if (!req.session.data['appeal-process-completed']) {
    res.redirect('../appeal-process/procedure')
  } else {
    res.redirect('../task-list')
  }
})





//
// PO REPORT
//
router.post('/po-report/:page', function (req, res, next) {
  req.session.data['po-report-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (
    req.session.data['listed-building-check-complete']
    && req.session.data['affected-listed-building-check-complete']
    && req.session.data['ancient-monument-complete']
    && req.session.data['conservation-check-complete']
    && req.session.data['protected-species-complete']
    && req.session.data['green-belt-complete']
    && req.session.data['outstanding-natural-beauty-complete']
    && req.session.data['designated-sites-complete']
    && req.session.data['tree-order-check-complete']
    && req.session.data['traveller-complete']
    && req.session.data['right-of-way-check-complete']
  ){
    req.session.data['po-report-completed'] = 'true'
  }

  next()
})

router.post('/po-report/report-upload', function (req, res) {
  res.redirect('policies-upload')
})

router.post('/po-report/policies-upload', function (req, res) {
  res.redirect('emerging-plan-check')
})

router.post('/po-report/emerging-plan-check', function (req, res) {
  if (req.session.data['emerging-plan-check'] == 'Yes') {
    res.redirect('emerging-plan-upload');
  } else {
    res.redirect('other-policies-upload')
  }
})

router.post('/po-report/emerging-plan-upload', function (req, res) {
  res.redirect('other-policies-upload')
})

router.post('/po-report/other-policies-upload', function (req, res) {
  res.redirect('supplementary-check')
})

router.post('/po-report/supplementary-check', function (req, res) {
  if (req.session.data['supplementary-check'] == 'Yes') {
    res.redirect('supplementary-upload');
  } else {
    res.redirect('community-infrastructure-check')
  }
})

router.post('/po-report/supplementary-upload', function (req, res) {
  res.redirect('community-infrastructure-check')
})

router.post('/po-report/community-infrastructure-check', function (req, res) {
  if (req.session.data['community-infrastructure-check'] == 'Yes') {
    res.redirect('community-infrastructure-upload');
  } else {
    res.redirect('complete')
  }
})

router.post('/po-report/community-infrastructure-upload', function (req, res) {
  res.redirect('community-infrastructure-adopted')
})

router.post('/po-report/community-infrastructure-adopted', function (req, res) {
  res.redirect('community-infrastructure-date')
})

router.post('/po-report/community-infrastructure-date', function (req, res) {
  res.redirect('complete')
})

router.get('/po-report/complete', function (req, res) {
  if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-visibility')
  } else if (!req.session.data['appeal-process-completed']) {
    res.redirect('../appeal-process/procedure')
  } else {
    res.redirect('../task-list')
  }
})





//
// SITE ACCESS
//
router.post('/site-access/:page', function (req, res, next) {
  req.session.data['site-access-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (
    req.session.data['site-visibility-complete']
    && req.session.data['site-entry-complete']
    && req.session.data['health-and-safety-complete']
  ){
    req.session.data['site-access-completed'] = 'true'
  }

  next()
})

router.post('/site-access/site-visibility', function (req, res) {
  res.redirect('site-entry')
})

router.post('/site-access/site-entry', function (req, res) {
  res.redirect('health-and-safety')
})

router.post('/site-access/health-and-safety', function (req, res) {
  res.redirect('complete')
})

router.get('/site-access/complete', function (req, res) {
  if (!req.session.data['appeal-process-completed']) {
    res.redirect('../appeal-process/procedure')
  } else {
    res.redirect('../task-list')
  }
})








//
// APPEAL PROCESS
//
router.post('/appeal-process/:page', function (req, res, next) {
  req.session.data['appeal-process-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  if (
    req.session.data['procedure-complete']
    && req.session.data['other-appeals-complete']
    && req.session.data['statement-of-case-complete']
  ){
    if (req.session.data['statement-of-case'] == 'No'){
      if (req.session.data['extra-conditions-complete']){
        req.session.data['appeal-process-completed'] = 'true'
      }
    } else {
      req.session.data['appeal-process-completed'] = 'true'
    }
  }

  next()
})

router.post('/appeal-process/procedure', function (req, res) {
  res.redirect('other-appeals')
})

router.post('/appeal-process/other-appeals', function (req, res) {
  res.redirect('statement-of-case')
})

router.post('/appeal-process/statement-of-case', function (req, res) {
  if (req.session.data['statement-of-case'] == 'No') {
    res.redirect('extra-conditions');
  } else {
    res.redirect('../task-list');
  }
})

router.post('/appeal-process/extra-conditions', function (req, res) {
  res.redirect('../task-list')
})





//
// SAVE AND RETURN
//
router.get('/save-and-return/', function (req, res) {
  if (req.session.data['applicant-email']) {
    req.session.data['save-email'] = req.session.data['applicant-email']
  } else {
    req.session.data['save-email'] = 'email@example.com'
  }

  if (req.session.data['save-email-confirmed']) {
    res.redirect('saved')
  } else {
    res.redirect('confirm')
  }
})




// Add your routes above the module.exports line
module.exports = router
