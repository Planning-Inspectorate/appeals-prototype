module.exports = function (router) {

  var v = "v1";
  var base = "/enforcement/"+v+"/";

 /******************************
  *** ENFORCEMENT SUBMISSION ***
  ******************************/

  // ENF 00X
  // Enforcement
  // Who are you?
  router.post('/whoareyou', function (req, res) {

    // Make a variable from session data
    let user = req.session.data['identity']

    // route depending on value
    if (user === 'appellant') {
      res.redirect('/enforcement/v1/contact-details/contact-details')
    } else {
      res.redirect('/enforcement/v1/contact-details/who-was-served')
    }
  })

  // ENF 00X
  // Enforcement
  // Contact details
  router.post('/contactdetails', function (req, res) {
    req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
    res.redirect('/enforcement/v1/task-list')
  })

  // ENF 00X
  // Enforcement
  // Additional people
  router.post('/additionalpeople', function (req, res) {

    // Make a variable from session data
    let addedpeople = req.session.data['addedpeople']

    // route depending on value
    if (addedpeople === 'yes') {
      res.redirect('/enforcement/v1/additional-people/add-person')
    } else {
      req.session.data["enforcement-taskliststatus-addpeople"] = "Complete";
      res.redirect('/enforcement/v1/task-list?enforcement-taskliststatus-addpeople=Complete')
    }
  })

  // ENF 00X
  // Enforcement
  // Site visibility
  router.post('/sitevisible', function (req, res) {

    // Make a variable from session data
    let visibility = req.session.data['sitevisibility']

    // route depending on value
    if (visibility === 'yes') {
      res.redirect('morepeople')
    } else {
      res.redirect('/enforcement/v1/appeal-site/postcode-address')
    }
  })

  // ENF 00X
  // Enforcement
  // Site interest
  router.post('/siteinterest', function (req, res) {

    // Make a variable from session data
    let interest = req.session.data['interest']

    // route depending on value
    if (interest === 'none') {
      res.redirect('/enforcement/v1/appeal-site/owner-consent')
    } else {
      req.session.data["enforcement-taskliststatus-appealsite"] = "Complete";
      res.redirect('/enforcement/v1/task-list?enforcement-taskliststatus-appealsite=Complete')
    }
  })

  // ENF 00X
  // Enforcement
  // Site interest
  router.post('/ownerconsent', function (req, res) {

    // Make a variable from session data
    let interest = req.session.data['enforcement-site-owner-consent']

    // route depending on value
    if (interest === 'Yes') {
      res.redirect('/enforcement/v1/appeal-site/site-occupation')
    } else {
      res.redirect('/enforcement/v1/appeal-site/your-interest')
    }
  })

  // ENF 00X
  // Enforcement
  // Grounds
  router.post('/grounds', function (req, res) {

    // Make a variable from session data
    let groundA = req.session.data['grounds-1']
    let groundB = req.session.data['grounds-2']
    let groundC = req.session.data['grounds-3']
    let groundD = req.session.data['grounds-4']
    let groundE = req.session.data['grounds-5']
    let groundF = req.session.data['grounds-6']
    let groundG = req.session.data['grounds-7']

    // route depending on value
    if (groundA) {
      res.redirect('/enforcement/v1/grounds/groundA-text')
    } else if (groundB) {
      res.redirect('/enforcement/v1/grounds/groundB-text')
    } else if (groundC) {
      res.redirect('/enforcement/v1/grounds/groundC-text')
    } else if (groundD) {
      res.redirect('/enforcement/v1/grounds/groundD-text')
    } else if (groundE) {
      res.redirect('/enforcement/v1/grounds/groundE-text')
    } else if (groundF) {
      res.redirect('/enforcement/v1/grounds/groundF-text')
    } else {
      res.redirect('/enforcement/v1/grounds/groundG-text')
    }
  })

  // ENF 00X
  // Enforcement
  // Contact details
  router.post('/lateapplication', function (req, res) {

    // Make a variable from session data
    let application = req.session.data['enforcement-late-applcation']

    // route depending on value
    if (application === 'no') {
      req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
      res.redirect('/enforcement/v1/task-list')
    } else {
      res.redirect('/enforcement/v1/grounds/application-date')
    }

  })

  // ENF 00X
  // Enforcement
  // Grounds with applicaiton decision, end of grounds
  router.post('/endgrounds', function (req, res) {
    req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
    res.redirect('/enforcement/v1/task-list')
  })


  // ENF 00X
  // Enforcement
  // Prefered procedure
  // How would you like us to decide your appeal?
  router.post('/enforcementprocedure', function (req, res) {

    // Make a variable from session data
    let how = req.session.data['procedure']

    // route depending on value
    if (how === 'written') {
      req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
      res.redirect('/enforcement/v1/task-list')
    } else if (how === 'hearing') {
      res.redirect('/enforcement/v1/procedure/hearing')
    } else {
      res.redirect('/enforcement/v1/procedure/inquiry')
    }
  })

  // ENF 00X
  // Enforcement
  // Prefered procedure
  // Back to tasklist after telling us why you want a hearing/inquiry
  router.post('/endprocedure', function (req, res) {
    req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
    res.redirect('/enforcement/v1/task-list')
  })

  // ENF 00X
  // Enforcement
  // Prefered procedure
  // Are you submitting a planning obligation
  router.post('/planningobligation', function (req, res) {

    // Make a variable from session data
    let obligation = req.session.data['enforcement-planning-obligation']
    // route depending on value
    if (obligation === 'Yes') {
      res.redirect('/enforcement/v1/upload/planning-obligation-status')
    } else {
      res.redirect('/enforcement/v1/upload/plans-or-drawings')
    }
  })

  // ENF 00X
  // Enforcement
  // Prefered procedure
  // Are you submitting a planning obligation
  router.post('/planningobligationstatus', function (req, res) {

    // Make a variable from session data
    let obligationstatus = req.session.data['enforcement-planning-obligation-status']
    // route depending on value
    if (obligationstatus === 'ready') {
      res.redirect('/enforcement/v1/upload/obligation-ready')
    } else if (obligationstatus === 'draft') {
      res.redirect('/enforcement/v1/upload/obligation-draft')
    } else {
      res.redirect('/enforcement/v1/upload/obligation-not-started')
    }
  })

  // ENF 00X
  // Enforcement
  // Contact details
  router.post('/enforcementnotice', function (req, res) {
    req.session.data["enforcement-taskliststatus-appealdocuments"] = "Complete";
    res.redirect('/enforcement/v1/task-list')
  })


}
