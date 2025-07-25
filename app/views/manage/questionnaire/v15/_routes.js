const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

router.get('*', function(req, res, next){

  // Change the service name for this feature
  res.locals['serviceName'] = 'Manage your appeals'

  // Add return to task list
  res.locals['return'] = true

  next()
})

router.post('/access/enter-code', function (req, res) {
  res.redirect('../task-list')
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
    && req.session.data['scheduled-monument-complete']
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
  res.redirect('listed-buildings');
})

router.post('/constraints/listed-buildings', function (req, res) {
  if (req.session.data['listed-buildings'] == 'Yes') {
    res.redirect('listed-building-details?extrabuildings=yes');
  } else {
    res.redirect('affected-listed-building-check');
  }
})

router.post('/constraints/affected-listed-building-check', function (req, res) {
  if (req.session.data['affected-listed-building-check'] == 'Yes') {
    res.redirect('affected-listed-building-details');
  } else {
    res.redirect('scheduled-monument');
  }
})

router.post('/constraints/affected-listed-building-details', function (req, res) {
  res.redirect('affected-listed-buildings');
})

router.post('/constraints/affected-listed-buildings', function (req, res) {
  if (req.session.data['affected-listed-buildings'] == 'Yes') {
    res.redirect('affected-listed-building-details?extrabuildingsaffected=yes');
  } else {
    res.redirect('scheduled-monument')
  }
})

router.post('/constraints/scheduled-monument', function (req, res) {
  res.redirect('conservation-check')
})

router.post('/constraints/conservation-check', function (req, res) {
  if (req.session.data['conservation-check'] == 'Yes') {
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
  if (!req.session.data['og-evidence-completed']) {
    res.redirect('../og-evidence/design-access-statement-check')
  } else if (!req.session.data['env-impact-completed']) {
    res.redirect('../env-impact/schedule')
  } else if (!req.session.data['notified-completed']) {
    res.redirect('../notified/notified-who')
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
// ORIGINAL EVIDENCE
//

router.post('/og-evidence/:page', function (req, res, next) {
  req.session.data['og-evidence-started'] = 'true'
  req.session.data[`${req.params.page}-complete`] = 'true'

  // if all 3 questions are complete
  // because you only get to the second question if you answer Yes to the first
  if (
    req.session.data['design-access-statement-check-complete']
    && req.session.data['design-access-statement-upload-complete']
    && req.session.data['plans-and-drawings-upload-complete']
  ){
    // then make the section complete
    req.session.data['og-evidence-completed'] = 'true'
  } else if (
    // if the first question is complete and then second answer is No
    // and the third question is complete
    req.session.data['design-access-statement-check-complete']
    && req.session.data['design-access-statement-check'] == 'No'
    && req.session.data['plans-and-drawings-upload-complete']
  ){
    // then make the section complete
    req.session.data['og-evidence-completed'] = 'true'
  } else {
    req.session.data['og-evidence-completed'] = 'false'
  }

  next()
})

router.post('/og-evidence/design-access-statement-check', function (req, res) {
  if (req.session.data['design-access-statement-check'] == 'Yes') {
    res.redirect('design-access-statement-upload');
    req.session.data['og-evidence-completed'] = 'false'
  } else {
    res.redirect('plans-and-drawings-upload')
  }
})

router.post('/og-evidence/design-access-statement-upload', function (req, res) {
  res.redirect('plans-and-drawings-upload')
})

router.post('/og-evidence/plans-and-drawings-upload', function (req, res) {
  res.redirect('complete')
})

router.get('/og-evidence/complete', function (req, res) {
  if (!req.session.data['env-impact-completed']) {
    res.redirect('../env-impact/schedule')
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
              req.session.data['env-impact-completed'] = 'true'
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
  req.session.data['screening-upload'] = 'Yes'
  res.redirect('screening-env-statement-check')
})

router.post('/env-impact/screening-env-statement-check', function (req, res) {
  if (req.session.data['screening-env-statement-check'] == 'Yes') {
    res.redirect('scoping-check');
  } else {
    req.session.data['screening-env-statement-check'] = 'No'
    res.redirect('applicant-env-statement-check');
  }
})

router.post('/env-impact/scoping-check', function (req, res) {
  if (req.session.data['scoping-check'] == 'Yes') {
    res.redirect('scoping-upload');
  } else {
    req.session.data['scoping-check'] = 'No'
    res.redirect('env-statement-check');
  }
})

router.post('/env-impact/scoping-upload', function (req, res) {
  res.redirect('env-statement-check');
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
  res.redirect('complete')
})

router.post('/env-impact/negative-screening-upload', function (req, res) {
  res.redirect('complete')
})

router.post('/env-impact/applicant-env-statement-check', function (req, res) {
  if (req.session.data['applicant-env-statement-check'] == 'Yes') {
    res.redirect('site-notice-upload')
  } else {
    req.session.data['applicant-env-statement-check'] = 'No'
    res.redirect('complete');
  }
})

router.get('/env-impact/complete', function (req, res) {
  if (!req.session.data['notified-completed']) {
    res.redirect('../notified/notified-who')
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

router.post('/notified/notified-who', function (req, res) {
  req.session.data['notified-who-complete'] = 'true'
  res.redirect('notified-how');
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

  if (req.session.data['other-parties-check'] == 'Yes') {
    req.session.data['consultation-completed'] = 'false'
    res.redirect('other-parties-upload');
  }

  if (
    req.session.data['report-upload-complete'] == 'true'
    && req.session.data['policies-complete'] == 'true'
    && req.session.data['emerging-plan-complete'] == 'true'
    && req.session.data['supplementary-documents-complete'] == 'true'
    && req.session.data['community-infrastructure-complete'] == 'true'
  ){
    req.session.data['po-report-completed'] = 'true'
  }

  next()
})

router.post('/po-report/report-upload', function (req, res) {
  req.session.data['report-upload-complete'] = 'true'
  res.redirect('policies-upload')
})

router.post('/po-report/policies-upload', function (req, res) {
  req.session.data['policies-complete'] = 'true'
  res.redirect('emerging-plan-check')
})

router.post('/po-report/emerging-plan-check', function (req, res) {
  if (req.session.data['emerging-plan-check'] == 'Yes') {
    res.redirect('emerging-plan-upload');
  } else {
    req.session.data['emerging-plan-complete'] = 'true'
    res.redirect('supplementary-check')
  }
})

router.post('/po-report/emerging-plan-upload', function (req, res) {
  req.session.data['emerging-plan-complete'] = 'true'
  res.redirect('supplementary-check')
})

router.post('/po-report/supplementary-check', function (req, res) {
  if (req.session.data['supplementary-check'] == 'Yes') {
    res.redirect('supplementary-upload');
  } else {
    req.session.data['supplementary-documents-complete'] = 'true'
    res.redirect('community-infrastructure-check')
  }
})

router.post('/po-report/supplementary-upload', function (req, res) {
  req.session.data['supplementary-documents-complete'] = 'true'
  res.redirect('community-infrastructure-check')
})

router.post('/po-report/community-infrastructure-check', function (req, res) {
  if (req.session.data['community-infrastructure-check'] == 'Yes') {
    res.redirect('community-infrastructure-upload');
  } else {
    req.session.data['community-infrastructure-complete'] = 'true'
    req.session.data['po-report-completed'] = 'true'
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
  req.session.data['community-infrastructure-complete'] = 'true'
  req.session.data['po-report-completed'] = 'true'
  res.redirect('complete')
})

router.get('/po-report/complete', function (req, res) {
  if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-entry')
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
    req.session.data['site-entry-complete']
    && req.session.data['neighbours-complete']
    && req.session.data['health-and-safety-complete']
  ){
    req.session.data['site-access-completed'] = 'true'
  }

  next()
})

router.post('/site-access/site-entry', function (req, res) {
  res.redirect('neighbours-land')
})

router.post('/site-access/neighbours-land', function (req, res) {
  if (req.session.data['neighbours-land'] == "Yes") {
    res.redirect('neighbours-address')
  } else {
    req.session.data['neighbours-complete'] = 'true'
    res.redirect('health-and-safety')
  }
})

router.post('/site-access/neighbours-address', function (req, res) {
  res.redirect('neighbours')
})

router.post('/site-access/neighbours', function (req, res) {
  if (req.session.data['add-neighbours'] == 'Yes') {
    res.redirect('neighbours-address?addedneighbours=yes');
  } else {
    res.redirect('health-and-safety')
  }
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
    && req.session.data['extra-conditions-complete']
  ){
    req.session.data['appeal-process-completed'] = 'true'
  }

  next()
})

router.post('/appeal-process/procedure', function (req, res) {
  if (req.session.data['procedure'] != 'Written representations') {
    res.redirect('procedure-reason');
  } else {
    req.session.data['procedure-complete'] = 'true'
    res.redirect('other-appeals-check')
  }
})

router.post('/appeal-process/procedure-reason', function (req, res) {
  req.session.data['procedure-complete'] = 'true'
  res.redirect('other-appeals-check')
})

router.post('/appeal-process/other-appeals-check', function (req, res) {
  req.session.data['other-appeals-check-complete'] = 'true'
  if (req.session.data['other-appeals-radio'] == 'Yes') {
    res.redirect('other-appeal-reference');
  } else {
    req.session.data['other-appeals-complete'] = 'true'
    res.redirect('extra-conditions');
  }
})

router.post('/appeal-process/other-appeal-reference', function (req, res) {
  req.session.data['other-appeal-reference-complete'] = 'true'
  res.redirect('other-appeals');
})

router.post('/appeal-process/other-appeals', function (req, res) {
  req.session.data['other-appeals-complete'] = 'true'
  if (req.session.data['other-appeals'] == 'Yes') {
    res.redirect('other-appeal-reference?extraotherappeal=yes');
  } else {
    res.redirect('extra-conditions');
  }
})

router.post('/appeal-process/extra-conditions', function (req, res) {
  res.redirect('../task-list');
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
