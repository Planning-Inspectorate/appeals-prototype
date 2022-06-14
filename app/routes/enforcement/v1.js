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
    let user = req.session.data['enforcement-identity']

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
  // Contact details
  router.post('/endcontact', function (req, res) {
    req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
    res.redirect('/enforcement/v1/task-list')
  })

  // ENF 00X
  // Enforcement
  // Additional people
  router.post('/additionalpeople', function (req, res) {

    // Make a variable from session data
    let addedpeople = req.session.data['enforcement-additionalpeople']

    // route depending on value
    if (addedpeople === 'Yes') {
      res.redirect('/enforcement/v1/additional-people/add-person')
    } else {
      req.session.data["enforcement-taskliststatus-addpeople"] = "Complete";
      res.redirect('/enforcement/v1/task-list?enforcement-taskliststatus-addpeople=Complete')
    }
  })

  // ENF 00X
  // Enforcement
  // Additional people
  router.post('/addmorepeople', function (req, res) {

    // Make a variable from session data
    let addedpeople = req.session.data['enforcement-morepeople']

    // route depending on value
    if (addedpeople === 'Yes') {
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
    let interest = req.session.data['enforcement-interest']

    // route depending on value
    if (interest === 'none') {
      res.redirect('/enforcement/v1/appeal-site/owner-consent')
    } else {
      res.redirect('/enforcement/v1/appeal-site/other-appeals')
      // req.session.data["enforcement-taskliststatus-appealsite"] = "Complete";
      // res.redirect('/enforcement/v1/task-list?enforcement-taskliststatus-appealsite=Complete')
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
  // Other appeals ending to site interests
  router.post('/otherappeals', function (req, res) {
    req.session.data["enforcement-taskliststatus-appealsite"] = "Complete";
    res.redirect('/enforcement/v1/task-list')
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

    // default method for reasons
    req.session.data["enforcement-reason-method"] = "text";

    // route depending on value
    if (groundA) {
      res.redirect('/enforcement/v1/grounds/groundA')
    } else if (groundB) {
      res.redirect('/enforcement/v1/grounds/groundB')
    } else if (groundC) {
      res.redirect('/enforcement/v1/grounds/groundC')
    } else if (groundD) {
      res.redirect('/enforcement/v1/grounds/groundD')
    } else if (groundE) {
      res.redirect('/enforcement/v1/grounds/groundE')
    } else if (groundF) {
      res.redirect('/enforcement/v1/grounds/groundF')
    } else {
      res.redirect('/enforcement/v1/grounds/groundG')
    }
  })

  // ENF 00X
  // Enforcement
  // Fees paid
  router.post('/feespaid', function (req, res) {

    // Make a variable from session data
    let feespaid = req.session.data['enforcement-fees-paid']

    // route depending on value
    if (feespaid === 'Yes') {

      req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
      res.redirect('/enforcement/v1/task-list')

    } else {
      res.redirect('/enforcement/v1/grounds/fees-exempt')
    }
  })

  // ENF 00X
  // Enforcement
  // Fee for ground A only
  router.post('/fee', function (req, res) {

    // Make a variable from session data
    let groundB = req.session.data['grounds-2']
    let groundC = req.session.data['grounds-3']
    let groundD = req.session.data['grounds-4']
    let groundE = req.session.data['grounds-5']
    let groundF = req.session.data['grounds-6']
    let groundG = req.session.data['grounds-7']

    // route depending on value
    if (groundB) {
      res.redirect('/enforcement/v1/grounds/groundB')
    } else if (groundC) {
      res.redirect('/enforcement/v1/grounds/groundC')
    } else if (groundD) {
      res.redirect('/enforcement/v1/grounds/groundD')
    } else if (groundE) {
      res.redirect('/enforcement/v1/grounds/groundE')
    } else if (groundF) {
      res.redirect('/enforcement/v1/grounds/groundF')
    } else {
      res.redirect('/enforcement/v1/grounds/groundG')
    }

  })


  // ENF 00X
  // Enforcement
  // Contact details
  router.post('/application', function (req, res) {

    // Make a variable from session data
    let application = req.session.data['enforcement-application']
    let groundA = req.session.data['grounds-1']

    if (application === 'Yes') {
      res.redirect('/enforcement/v1/grounds/application-decision')
    } else {
      if (groundA) {
        res.redirect('/enforcement/v1/grounds/fees')
      } else {
        req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
        res.redirect('/enforcement/v1/task-list')
      }

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
    let how = req.session.data['enforcement-procedure']

    // route depending on value
    if (how === 'Written representations') {
      req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
      res.redirect('/enforcement/v1/task-list')
    } else if (how === 'Hearing') {
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
    if (obligationstatus === 'Finalised and ready to submit') {
      res.redirect('/enforcement/v1/upload/obligation-ready')
    } else if (obligationstatus === 'In draft') {
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




// ENF 00X
// Enforcement
// Quick link to appeal start
router.get(base+'skip/appeal-before-you-start', function (req, res) {
  req.session.data["enforcement-taskliststatus-contactdetails"] = "";
  req.session.data["enforcement-taskliststatus-addpeople"] = "";
  req.session.data["enforcement-taskliststatus-appealsite"] = "";
  req.session.data["enforcement-taskliststatus-grounds"] = "";
  req.session.data["enforcement-taskliststatus-proceduretype"] = "";
  req.session.data["enforcement-taskliststatus-appealdocuments"] = "";
  res.redirect('/before-you-start/v11')
})

  // ENF 00X
  // Enforcement
  // Quick link to appeal start
  router.get(base+'skip/appeal-start', function (req, res) {
    // clears tasklist statuses
    req.session.data["enforcement-taskliststatus-contactdetails"] = "";
    req.session.data["enforcement-taskliststatus-addpeople"] = "";
    req.session.data["enforcement-taskliststatus-appealsite"] = "";
    req.session.data["enforcement-taskliststatus-grounds"] = "";
    req.session.data["enforcement-taskliststatus-proceduretype"] = "";
    req.session.data["enforcement-taskliststatus-appealdocuments"] = "";

    // insert clearing of form data
    // enforcement-notice-name

    res.redirect('/enforcement/v1/before-you-continue')
  })

  // ENF 00X
  // Enforcement
  // Quick link to a complete task list
  router.get(base+'skip/tasks', function (req, res) {
    // Makes all tasklist statuses Complete
    req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
    req.session.data["enforcement-taskliststatus-addpeople"] = "Complete";
    req.session.data["enforcement-taskliststatus-appealsite"] = "Complete";
    req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
    req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
    req.session.data["enforcement-taskliststatus-appealdocuments"] = "Complete";
    // Update with dummy contact data
    req.session.data["enforcement-notice-name"] = "Nic Davies";
    req.session.data["enforcement-your-email"] = "nickydavies@jambon.co.uk";
    req.session.data["enforcement-your-name"] = "Nic Davies";
    req.session.data["enforcement-telephone"] = "01179428242";
    // Update with additional people dummy data
    req.session.data["enforcement-additionalpeople"] = "No";
    // Update with appeal site dummy data
    req.session.data["enforcement-site-address-line1"] = "1 Providence Avenue";
    req.session.data["enforcement-site-address-line2"] = "Sewbridge";
    req.session.data["enforcement-site-address-town"] = "Jamton";
    req.session.data["enforcement-site-address-county"] = "Jamton";
    req.session.data["enforcement-site-address-postcode"] = "JM2 3BL";
    req.session.data["enforcement-site-visibility"] = "Yes";
    req.session.data["enforcement-site-healthsafety"] = "No";
    req.session.data["enforcement-interest"] = "Owner";
    // Update with appeal grounds dummy data
    req.session.data["grounds-1"] = "GroundA";
    // Update with appeal procedure dummy data
    req.session.data["enforcement-procedure"] = "Written representations";
    // Update with appeal upload dummy data
    req.session.data["enforcement-planning-obligation"] = "No";
    req.session.data["enforcement-uploaded-notice"] = "Providence-enforcement-notice.pdf";

    res.redirect('/enforcement/v1/task-list')
  })



}
