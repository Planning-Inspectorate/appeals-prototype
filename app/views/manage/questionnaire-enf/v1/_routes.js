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
    && req.session.data['appeal-type-check-complete']
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
    && req.session.data['fee-check-complete']
    && req.session.data['fee-exempt-complete']
    && req.session.data['refuse-waste-materials-complete']
    && req.session.data['deposit-materials-complete']
    && req.session.data['alleged-breach-area-complete']
    && req.session.data['create-building-complete']
    && req.session.data['agricultural-purposes-complete']
    && req.session.data['single-house-complete']
  ){
    req.session.data['constraints-completed'] = 'true'
  }

  next()
})

router.post('/constraints/appeal-type-check', function (req, res) {
  res.redirect('listed-building-check');
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

router.post('/constraints/preserve-grant-loan', function (req, res) {
  res.redirect('historic-england')
})

router.post('/constraints/historic-england', function (req, res) {
  if (req.session.data['historic-england'] == 'Yes') {
    res.redirect('historic-england-upload');
  } else {
    res.redirect('scheduled-monument')
  }
})

router.post('/constraints/historic-england', function (req, res) {
  res.redirect('historic-england-upload')
})

router.post('/constraints/historic-england-upload', function (req, res) {
  res.redirect('scheduled-monument')
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
    res.redirect('right-of-way-upload');
  } else {
    res.redirect('fee-check');
  }
})

router.post('/constraints/right-of-way-upload', function (req, res) {
  res.redirect('fee-check')
})

router.post('/constraints/fee-check', function (req, res) {
  res.redirect('fee-exempt')
})

router.post('/constraints/fee-exempt', function (req, res) {
  res.redirect('other-operations')
})

router.post('/constraints/other-operations', function (req, res) {
  res.redirect('site-area')
})

router.post('/constraints/site-area', function (req, res) {
  res.redirect('alleged-breach-area')
})

router.post('/constraints/alleged-breach-area', function (req, res) {
  res.redirect('floor-space')
})

router.post('/constraints/floor-space', function (req, res) {
  res.redirect('refuse-waste-materials')
})

router.post('/constraints/refuse-waste-materials', function (req, res) {
  res.redirect('landfill-site')
})

router.post('/constraints/landfill-site', function (req, res) {
  res.redirect('waste-materials-import')
})

router.post('/constraints/waste-materials-import', function (req, res) {
  res.redirect('underground-interest')
})

router.post('/constraints/underground-interest', function (req, res) {
  if (req.session.data['underground-interest'] == 'Yes') {
    res.redirect('underground-interest-upload');
  } else {
    res.redirect('mineral-extraction-materials');
  }
})

router.post('/constraints/underground-interest-upload', function (req, res) {
  res.redirect('mineral-extraction-materials')
})

router.post('/constraints/mineral-extraction-materials', function (req, res) {
  res.redirect('store-minerals')
})

router.post('/constraints/store-minerals', function (req, res) {
  res.redirect('create-building')
})

router.post('/constraints/deposit-materials', function (req, res) {
  res.redirect('alleged-breach-area')
})

router.post('/constraints/alleged-breach-area', function (req, res) {
  res.redirect('create-building')
})

router.post('/constraints/create-building', function (req, res) {
  res.redirect('agricultural-purposes')
})

router.post('/constraints/agricultural-purposes', function (req, res) {
  res.redirect('single-house')
})

router.post('/constraints/single-house', function (req, res) {
  res.redirect('trunk-road')
})

router.post('/constraints/trunk-road', function (req, res) {
  res.redirect('crown-land')
})

router.post('/constraints/crown-land', function (req, res) {
  res.redirect('stop-notice')
})

router.post('/constraints/stop-notice', function (req, res) {
  if (req.session.data['stop-notice'] == 'Yes') {
    res.redirect('stop-notice-upload');
  } else {
    res.redirect('development-rights');
  }
})

router.post('/constraints/stop-notice-upload', function (req, res) {
  res.redirect('development-rights')
})

router.post('/constraints/development-rights', function (req, res) {
  if (req.session.data['development-rights'] == 'Yes') {
    res.redirect('development-rights-upload');
  } else {
    res.redirect('planning-condition');
  }
})

router.post('/constraints/development-rights-upload', function (req, res) {
  res.redirect('development-rights-removed')
})

router.post('/constraints/development-rights-removed', function (req, res) {
  res.redirect('planning-condition')
})

router.post('/constraints/planning-condition', function (req, res) {
  if (req.session.data['planning-condition'] == 'Yes') {
    res.redirect('relevant-permission-upload');
  } else {
    res.redirect('disabled-person');
  }
})

router.post('/constraints/relevant-permission-upload', function (req, res) {
  res.redirect('disabled-person')
})

router.post('/constraints/disabled-person', function (req, res) {
  res.redirect('complete')
})

router.get('/constraints/complete', function (req, res) {
  if (!req.session.data['env-impact-completed']) {
    res.redirect('../env-impact/schedule')
  } else if (!req.session.data['notified-completed']) {
    res.redirect('../notified/notified-who')
  } else if (!req.session.data['po-report-completed']) {
    res.redirect('../po-report/report-check')
  } else if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-entry')
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
    && req.session.data['list-of-documents-check-complete']
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
  res.redirect('list-of-documents-check')
})

router.post('/og-evidence/list-of-documents-check', function (req, res) {
  if (req.session.data['list-of-documents-check'] == 'No') {
    res.redirect('list-of-documents');
  } else {
    req.session.data['list-of-documents-check'] = 'Yes'
    res.redirect('complete')
  }
})

router.post('/og-evidence/list-of-documents', function (req, res) {
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

  if (req.session.data['schedule'] == 'Other') {
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
    req.session.data['schedule'] = 'Other'
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

router.post('/env-impact/applicant-env-statement-check', function (req, res) {
  if (req.session.data['applicant-env-statement-check'] == 'Yes') {
    res.redirect('env-statement-upload')
  } else {
    req.session.data['applicant-env-statement-check']
    res.redirect('negative-screening-upload');
  }
})

router.post('/env-impact/env-statement-upload', function (req, res) {
  res.redirect('complete')
})

router.post('/env-impact/negative-screening-upload', function (req, res) {
  res.redirect('complete')
})

router.get('/env-impact/complete', function (req, res) {
  if (!req.session.data['notified-completed']) {
    res.redirect('../notified/notified-who')
  } else if (!req.session.data['po-report-completed']) {
    res.redirect('../po-report/report-check')
  } else if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-entry')
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

  if (
    req.session.data['appeal-notification-complete']
    && req.session.data['notified-who-complete']
  ){
    req.session.data['notified-completed'] = 'true'
  }

  next()
})

router.post('/notified/notified-who', function (req, res) {
  res.redirect('appeal-notification-upload')
})

router.post('/notified/appeal-notification-upload', function (req, res) {
  req.session.data['notified-completed'] = 'true'
  res.redirect('complete');
})

router.get('/notified/complete', function (req, res) {
  if (!req.session.data['po-report-completed']) {
    res.redirect('../po-report/report-check')
  } else if (!req.session.data['site-access-completed']) {
    res.redirect('../site-access/site-entry')
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
    req.session.data['report-check-complete'] == 'true'
    && req.session.data['report-upload-complete'] == 'true'
    && req.session.data['policies-check-complete'] == 'true'
    && req.session.data['emerging-plan-check-complete'] == 'true'
    && req.session.data['other-policies-check-complete'] == 'true'
    && req.session.data['supplementary-check-complete'] == 'true'
    && req.session.data['community-infrastructure-check-complete'] == 'true'
  ){
    req.session.data['po-report-completed'] = 'true'
  }

  next()
})

router.post('/po-report/report-check', function (req, res) {
  if (req.session.data['report-check'] == 'Yes') {
    req.session.data['report-complete'] = 'true'
    res.redirect('report-upload');
  } else {
    req.session.data['report-complete'] = 'true'
    res.redirect('policies-check')
  }
})

router.post('/po-report/report-upload', function (req, res) {
  req.session.data['report-upload-complete'] = 'true'
  res.redirect('policies-check')
})

router.post('/po-report/policies-check', function (req, res) {
  if (req.session.data['policies-check'] == 'Yes') {
    res.redirect('policies-upload');
  } else {
    req.session.data['policies-complete'] = 'true'
    res.redirect('other-policies-check')
  }
})

router.post('/po-report/policies-upload', function (req, res) {
  req.session.data['policies-complete'] = 'true'
  res.redirect('other-policies-check')
})

router.post('/po-report/emerging-plan-check', function (req, res) {
  if (req.session.data['emerging-plan-check'] == 'Yes') {
    res.redirect('emerging-plan-upload');
  } else {
    req.session.data['emerging-plan-complete'] = 'true'
    res.redirect('other-policies-check')
  }
})

router.post('/po-report/emerging-plan-upload', function (req, res) {
  req.session.data['emerging-plan-complete'] = 'true'
  res.redirect('other-policies-check')
})

router.post('/po-report/other-policies-check', function (req, res) {
  if (req.session.data['other-policies-check'] == 'Yes') {
    res.redirect('other-policies-upload');
  } else {
    req.session.data['other-policies-check-complete'] = 'true'
    res.redirect('supplementary-check')
  }
})

router.post('/po-report/other-policies-upload', function (req, res) {
  req.session.data['other-policies-upload-complete'] = 'true'
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
    res.redirect('local-development-check')
  }
})

router.post('/po-report/community-infrastructure-upload', function (req, res) {
  res.redirect('community-infrastructure-adopted')
})

router.post('/po-report/community-infrastructure-adopted', function (req, res) {
  res.redirect('community-infrastructure-date')
})

router.post('/po-report/community-infrastructure-date', function (req, res) {
  req.session.data['community-infrastructure-date-complete'] = 'true'
  res.redirect('local-development-check')
})

router.post('/po-report/local-development-check', function (req, res) {
  if (req.session.data['local-development-check'] == 'Yes') {
    res.redirect('local-development-upload');
  } else {
    req.session.data['local-development-check-complete'] = 'true'
    res.redirect('planning-permission-check')
  }
})

router.post('/po-report/local-development-upload', function (req, res) {
  req.session.data['local-development-upload-complete'] = 'true'
  res.redirect('planning-permission-check')
})

router.post('/po-report/planning-permission-check', function (req, res) {
  if (req.session.data['planning-permission-check'] == 'Yes') {
    res.redirect('planning-permission-upload');
  } else {
    req.session.data['planning-permission-check-complete'] = 'true'
    res.redirect('statement-of-case-check')
  }
})

router.post('/po-report/planning-permission-upload', function (req, res) {
  req.session.data['planning-permission-upload-complete'] = 'true'
  res.redirect('statement-of-case-check')
})

router.post('/po-report/statement-of-case-check', function (req, res) {
  if (req.session.data['statement-of-case-check'] == 'Yes') {
    res.redirect('statement-of-case-upload');
  } else {
    req.session.data['statement-of-case-check-complete'] = 'true'
    res.redirect('enforcement-notice-check')
  }
})

router.post('/po-report/statement-of-case-upload', function (req, res) {
  req.session.data['statement-of-case-upload-complete'] = 'true'
  res.redirect('enforcement-notice-check')
})

router.post('/po-report/enforcement-notice-check', function (req, res) {
  if (req.session.data['enforcement-notice-check'] == 'Yes') {
    res.redirect('enforcement-notice-upload');
  } else {
    res.redirect('contravention-notice-check')
  }
})

router.post('/po-report/enforcement-plan-upload', function (req, res) {
  req.session.data['enforcement-plan-upload-complete'] = 'true'
  res.redirect('contravention-notice-check')
})

router.post('/po-report/contravention-notice-check', function (req, res) {
  if (req.session.data['contravention-notice-check'] == 'Yes') {
    res.redirect('contravention-notice-upload');
  } else {
    res.redirect('planning-permission-consultation')
  }
})

router.post('/po-report/contravention-notice-upload', function (req, res) {
  req.session.data['contravention-notice-upload-complete'] = 'true'
  res.redirect('planning-permission-consultation')
})

router.post('/po-report/planning-permission-consultation', function (req, res) {
  if (req.session.data['planning-permission-consultation'] == 'Yes') {
    req.session.data['po-report-completed'] = 'true'
    res.redirect('complete')
  }
})

router.post('/po-report/enforcement-notice-upload', function (req, res) {
  req.session.data['enforcement-notice-upload-complete'] = 'true'
  res.redirect('enforcement-plan-upload')
})

router.post('/po-report/enforcement-plan-upload', function (req, res) {
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
    && req.session.data['other-appeals-check-complete']
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

router.post('/appeal-process/significant-changes', function (req, res) {
  req.session.data['significant-changes-complete'] = 'true'
  res.redirect('extra-conditions');
})

router.post('/appeal-process/extra-conditions', function (req, res) {
  res.redirect('complete');
})

router.get('/appeal-process/complete', function (req, res) {
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
