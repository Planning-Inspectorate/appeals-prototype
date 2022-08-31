const express = require('express')
const router = new express.Router()

/******************************
*** ENFORCEMENT SUBMISSION ***
******************************/

// Contact details

router.post('/contact-details/', function (req, res) {
  res.redirect('application-check')
})

// Application identity

router.post('/contact-details/application-check', function (req, res) {





  // Make a variable from session data
  let contactfirst = req.session.data['contact-first-name']
  let contactlast = req.session.data['contact-last-name']

  if (req.session.data['application-check'] == 'You') {
    req.session.data["appellant-first-name"] = contactfirst;
    req.session.data["appellant-last-name"] = contactlast;
    res.redirect('added-names')
  } else if (req.session.data['application-check'] == 'Another individual') {
    res.redirect('appellant-name')
  } else if (req.session.data['application-check'] == 'A company') {
    res.redirect('company-name')
  } else {
    res.redirect('../site-details/postcode-address')
  }
})

//

router.post('/contact-details/appellant-name', function (req, res) {
  res.redirect('added-names')
})



router.post('/contact-details/agent-details', function (req, res) {
  res.redirect('../site-details/address')
})

// older routes below

// Enforcement
// Who are you?
router.post('/contact-details/who-are-you', function (req, res) {

  // Make a variable from session data
  let user = req.session.data['enforcement-identity']

  // route depending on value
  if (user === 'appellant') {
    res.redirect('/enforcement/v8/contact-details/contact-details')
  } else {
    res.redirect('/enforcement/v8/contact-details/who-was-served')
  }
})



// Contact details
router.post('/contact-details/finish-contact-details', function (req, res) {
  req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
  res.redirect('/enforcement/v8/task-list')
})



// Contact details
router.post('/endcontact', function (req, res) {
  req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
  res.redirect('/enforcement/v8/task-list')
})



// Additional people
router.post('/contact-details/contact-details', function (req, res) {

  // Make a variable from session data
  let identity = req.session.data['enforcement-identity']

  // route depending on value
  if (identity === 'company') {
    res.redirect('/enforcement/v8/contact-details/company-name')
  } else {
    res.redirect('/enforcement/v8/contact-details/person-name')
  }

})

// Contact details
router.post('/contact-details/company-name', function (req, res) {
  res.redirect('/enforcement/v8/contact-details/added-names')
})

// Additional people
router.post('/contact-details/added-names', function (req, res) {

  // Make a variable from session data
  let addedpeople = req.session.data['enforcement-morepeople']
  let applicant = req.session.data['application-check']

  // route depending on value
  if (addedpeople === 'Yes') {
    if (applicant === 'You') {
      res.redirect('/enforcement/v8/contact-details/application-check')
    } else {
      res.redirect('/enforcement/v8/contact-details/application-check?else')
    }
  } else {
    req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
    res.redirect('/enforcement/v8/task-list?enforcement-taskliststatus-contactdetails=Complete')
  }
})

// Site interest
router.post('/finishnoticename', function (req, res) {

  req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
  res.redirect('/enforcement/v8/task-list?enforcement-taskliststatus-appealsite=Complete')

})



// Site visibility
router.post('/sitevisible', function (req, res) {

  // Make a variable from session data
  let visibility = req.session.data['sitevisibility']

  // route depending on value
  if (visibility === 'yes') {
    res.redirect('morepeople')
  } else {
    res.redirect('/enforcement/v8/site-address/postcode-address')
  }
})



// Site interest
router.post('/site-address/site-interest', function (req, res) {

  // Make a variable from session data
  let interest = req.session.data['enforcement-interest']

  // route depending on value
  if (interest === 'none') {
    res.redirect('/enforcement/v8/site-address/owner-consent')
  } else {
    res.redirect('/enforcement/v8/site-address/other-appeals')
  }
})



// Site interest
router.post('/site-address/owner-consent', function (req, res) {

  // Make a variable from session data
  let interest = req.session.data['enforcement-site-owner-consent']

  // route depending on value
  if (interest === 'Yes') {
    res.redirect('/enforcement/v8/site-address/site-occupation')
  } else {
    res.redirect('/enforcement/v8/site-address/your-interest')
  }
})



// Other appeals ending to site interests
router.post('/site-address/otherappeals', function (req, res) {
  req.session.data["enforcement-taskliststatus-appealsite"] = "Complete";
  res.redirect('/enforcement/v8/task-list')
})



//---- GROUNDS


router.post('/grounds/grounds', function (req, res) {
  let groundA = req.session.data['grounds-1']
  let groundB = req.session.data['grounds-2']
  let groundC = req.session.data['grounds-3']
  let groundD = req.session.data['grounds-4']
  let groundE = req.session.data['grounds-5']
  let groundF = req.session.data['grounds-6']
  let groundG = req.session.data['grounds-7']

  if (groundA) {
    req.session.data["ground-a-selected"] = "Yes";
    res.redirect('reasons-a')
  } else if (groundB) {
    res.redirect('reasons-b')
  } else if (groundC) {
    res.redirect('reasons-c')
  } else if (groundD) {
    res.redirect('reasons-d')
  } else if (groundE) {
    res.redirect('reasons-e')
  } else if (groundF) {
    res.redirect('reasons-f')
  } else if (groundG) {
    res.redirect('reasons-g')
  } else {
    res.redirect('application')
  }
})
//---- /GROUNDS





//---- GROUND A
router.post('/grounds/reasons-a', function (req, res) {
  let groundB = req.session.data['grounds-2']
  let groundC = req.session.data['grounds-3']
  let groundD = req.session.data['grounds-4']
  let groundE = req.session.data['grounds-5']
  let groundF = req.session.data['grounds-6']
  let groundG = req.session.data['grounds-7']

  if (groundB) {
    res.redirect('reasons-b')
  } else if (groundC) {
    res.redirect('reasons-c')
  } else if (groundD) {
    res.redirect('reasons-d')
  } else if (groundE) {
    res.redirect('reasons-e')
  } else if (groundF) {
    res.redirect('reasons-f')
  } else if (groundG) {
    res.redirect('reasons-g')
  } else {
    res.redirect('supporting-check')
  }
})
//---- /GROUND A





//---- GROUND B
router.post('/grounds/reasons-b', function (req, res) {
  let groundC = req.session.data['grounds-3']
  let groundD = req.session.data['grounds-4']
  let groundE = req.session.data['grounds-5']
  let groundF = req.session.data['grounds-6']
  let groundG = req.session.data['grounds-7']

  if (groundC) {
    res.redirect('reasons-c')
  } else if (groundD) {
    res.redirect('reasons-d')
  } else if (groundE) {
    res.redirect('reasons-e')
  } else if (groundF) {
    res.redirect('reasons-f')
  } else if (groundG) {
    res.redirect('reasons-g')
  } else {
    res.redirect('supporting-check')
  }
})
//---- /GROUND B





//---- GROUND C
router.post('/grounds/reasons-c', function (req, res) {
  let groundD = req.session.data['grounds-4']
  let groundE = req.session.data['grounds-5']
  let groundF = req.session.data['grounds-6']
  let groundG = req.session.data['grounds-7']

  if (groundD) {
    res.redirect('reasons-d')
  } else if (groundE) {
    res.redirect('reasons-e')
  } else if (groundF) {
    res.redirect('reasons-f')
  } else if (groundG) {
    res.redirect('reasons-g')
  } else {
    res.redirect('supporting-check')
  }
})
//---- /GROUND C





//---- GROUND D
router.post('/grounds/reasons-d', function (req, res) {
  let groundE = req.session.data['grounds-5']
  let groundF = req.session.data['grounds-6']
  let groundG = req.session.data['grounds-7']

  if (groundE) {
    res.redirect('reasons-e')
  } else if (groundF) {
    res.redirect('reasons-f')
  } else if (groundG) {
    res.redirect('reasons-g')
  } else {
    res.redirect('supporting-check')
  }
})
//---- /GROUND D





//---- GROUND E
router.post('/grounds/reasons-e', function (req, res) {
  let groundF = req.session.data['grounds-6']
  let groundG = req.session.data['grounds-7']

  if (groundF) {
    res.redirect('reasons-f')
  } else if (groundG) {
    res.redirect('reasons-g')
  } else {
    res.redirect('supporting-check')
  }
})
//---- /GROUND E





//---- GROUND F
router.post('/grounds/reasons-f', function (req, res) {
  let groundG = req.session.data['grounds-7']

  if (groundG) {
    res.redirect('reasons-g')
  } else {
    res.redirect('supporting-check')
  }
})
//---- /GROUND F





//---- GROUND G
router.post('/grounds/reasons-g', function (req, res) {
  res.redirect('supporting-check')
})
//---- /GROUND G





//---- SUPPORTING DOCS
router.post('/grounds/supporting-check', function (req, res) {
  let check = req.session.data['supporting-check']

  if (check == 'Yes') {
    res.redirect('supporting-upload')
  } else {
    res.redirect('application')
  }
})

router.post('/grounds/supporting-upload', function (req, res) {
  res.redirect('application')
})
//---- /SUPPORTING DOCS


// Did you sumbit a planning application
router.post('/grounds/application', function (req, res) {

  // Make a variable from session data
  let application = req.session.data['enforcement-application']
  let groundA = req.session.data['ground-a-selected']

  if (application === 'Yes') {
    res.redirect('/enforcement/v8/grounds/application-date')
  } else {

    if ( groundA === 'Yes') {
      res.redirect('/enforcement/v8/grounds/fees')
    } else {
      req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
      res.redirect('/enforcement/v8/task-list')
    }

  }

})

// Application decision
// ******************************************
router.post('/grounds/application-date', function (req, res) {
 res.redirect('application-decision')
})

// Application decision
router.post('/grounds/application-decision', function (req, res) {

  // Make a variable from session data
  let groundA = req.session.data['ground-a-selected']
  let decisionreceived = req.session.data['enforcement-application-decision']

  // route depending on value
  if (decisionreceived === 'Yes') {

    // decision received, let’s ask for the date
    res.redirect('/enforcement/v8/grounds/application-decision-date')

  // no decision, let’s move on
  } else {

    if (groundA === 'Yes') {
      res.redirect('/enforcement/v8/grounds/fees')
    } else {
      req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
      res.redirect('/enforcement/v8/task-list')
    }

  }
})



// Fees paid
router.post('/grounds/fees', function (req, res) {

  // Make a variable from session data
  let feespaid = req.session.data['enforcement-fees-paid']

  // route depending on value
  if (feespaid === 'Yes') {

    req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
    res.redirect('/enforcement/v8/task-list')

  } else {
    res.redirect('/enforcement/v8/grounds/fees-exempt')
  }
})



// Ending the grounds tasks
router.post('/endgrounds', function (req, res) {
  req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
  res.redirect('/enforcement/v8/task-list')
})



// Fee questions finished, ending the grounds tasks
router.post('/grounds/fees-exempt', function (req, res) {
  req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
  res.redirect('/enforcement/v8/task-list')
})



// Prefered procedure
// How would you like us to decide your appeal?
router.post('/procedure/procedure', function (req, res) {

  // Make a variable from session data
  let how = req.session.data['enforcement-procedure']

  // route depending on value
  if (how === 'Written') {
    req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
    res.redirect('/enforcement/v8/task-list')
  } else if (how === 'Hearing') {
    res.redirect('/enforcement/v8/procedure/hearing')
  } else {
    res.redirect('/enforcement/v8/procedure/inquiry')
  }
})



// Prefered procedure
// Back to tasklist after telling us why you want a hearing/inquiry
router.post('/procedure/endprocedure', function (req, res) {

  let statementfile = req.session.data['enforcement-statement-common-ground']
  req.session.data["nforcement-statement-common-ground"] = statementfile;

  req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
  res.redirect('/enforcement/v8/task-list')
})



// Prefered procedure
// Are you submitting a planning obligation
router.post('/upload/planning-obligation', function (req, res) {

  // Make a variable from session data
  let obligation = req.session.data['enforcement-planning-obligation']
  // route depending on value
  if (obligation === 'Yes') {
    res.redirect('/enforcement/v8/upload/planning-obligation-status')
  } else {
    res.redirect('/enforcement/v8/upload/supporting-documents')
  }
})



// Prefered procedure
// Are you submitting a planning obligation
router.post('/upload/planning-obligation-status', function (req, res) {

  // Make a variable from session data
  let obligationstatus = req.session.data['enforcement-planning-obligation-status']
  // route depending on value
  if (obligationstatus === 'Finalised and ready to submit') {
    res.redirect('/enforcement/v8/upload/obligation-ready')
  } else if (obligationstatus === 'In draft') {
    res.redirect('/enforcement/v8/upload/obligation-draft')
  } else {
    res.redirect('/enforcement/v8/upload/obligation-not-started')
  }
})

// ENF 00X
// Enforcement notice
router.post('/upload/enforcement-notice', function (req, res) {
  res.redirect('/enforcement/v8/upload/planning-obligation')
})

// ENF 00X
// Enforcement plans
router.post('/upload/plans-or-drawings', function (req, res) {
  req.session.data["enforcement-taskliststatus-appealdocuments"] = "Complete";
  res.redirect('/enforcement/v8/task-list')
})


// ENF 00X
// Do you have supporting documents?
router.post('/upload/supporting-documents-v8', function (req, res) {

  // Make a variable from session data
  let supportingdocuments = req.session.data['enforcement-supporting-documents']

  // route depending on value
  if (supportingdocuments === 'Yes') {
    res.redirect('/enforcement/v8/upload/additional-documents')
  } else {
    req.session.data["enforcement-taskliststatus-appealdocuments"] = "Complete";
    res.redirect('/enforcement/v8/task-list')
  }
})

// ENF 00X
// Additional documents
router.post('/upload/additional-documents', function (req, res) {
  req.session.data["enforcement-taskliststatus-appealdocuments"] = "Complete";
  res.redirect('/enforcement/v8/task-list')
})




// Quick link to appeal start
router.get('/skip/appeal-before-you-start', function (req, res) {
  req.session.data["enforcement-taskliststatus-contactdetails"] = "";
  req.session.data["enforcement-taskliststatus-addpeople"] = "";
  req.session.data["enforcement-taskliststatus-appealsite"] = "";
  req.session.data["enforcement-taskliststatus-grounds"] = "";
  req.session.data["enforcement-taskliststatus-proceduretype"] = "";
  req.session.data["enforcement-taskliststatus-appealdocuments"] = "";
  res.redirect('/before-you-start/v12')
})



// Quick link to appeal start
router.get('/skip/appeal-start', function (req, res) {
  // clears tasklist statuses
  req.session.data["enforcement-taskliststatus-contactdetails"] = "";
  req.session.data["enforcement-taskliststatus-addpeople"] = "";
  req.session.data["enforcement-taskliststatus-appealsite"] = "";
  req.session.data["enforcement-taskliststatus-grounds"] = "";
  req.session.data["enforcement-taskliststatus-proceduretype"] = "";
  req.session.data["enforcement-taskliststatus-appealdocuments"] = "";

  // insert clearing of form data

  // enforcement-notice-name
  res.redirect('/enforcement/v8/before-you-continue')
})



// Quick link to a complete task list
router.get('/skip/tasks', function (req, res) {
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
  req.session.data["enforcement-procedure"] = "Written";
  // Update with appeal upload dummy data
  req.session.data["enforcement-planning-obligation"] = "No";
  req.session.data["enforcement-uploaded-notice"] = "Providence-enforcement-notice.pdf";

  res.redirect('/enforcement/v8/task-list')
})



// Add your routes above the module.exports line
module.exports = router
