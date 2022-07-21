const express = require('express')
const router = new express.Router()



/*******************************************
 *** LISTED BUILDINGS ENFORCEMENT NOTICE ***
/*******************************************/

// TELL US WHO WAS ON THE ENFORCEMENT NOTICE
// *****************************************

// Named on notice
// ******************************************
router.post('/named-on-notice/named-on-notice', function (req, res) {

  // Make a variable from session data
  let identity = req.session.data['enforcement-identity']

  // route depending on value
  if (identity === 'company') {
    res.redirect('company-name')
  } else {
    res.redirect('person-name')
  }

})

// Person name
// ******************************************
router.post('/named-on-notice/person-name', function (req, res) {
 // req.session.data["enforcement-taskliststatus-appealsite"] = "Complete";
 res.redirect('added-names')
})

// Company name
// ******************************************
router.post('/named-on-notice/company-name', function (req, res) {
 // req.session.data["enforcement-taskliststatus-appealsite"] = "Complete";
 res.redirect('added-names')
})


// Added people / Do you need to add more names?
// ******************************************
router.post('/named-on-notice/added-names', function (req, res) {

  // Make a variable from session data
  let addedpeople = req.session.data['enforcement-morepeople']

  // route depending on value
  if (addedpeople === 'Yes') {
    res.redirect('named-on-notice')
  } else {
    req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
    res.redirect('../task-list?enforcement-taskliststatus-contactdetails=Complete')
  }

})



// **************************
// TELL US ABOUT THE BUILDING
// **************************

// Building grade
// ******************************************
router.post('/listed-building/grade', function (req, res) {
 res.redirect('listed-date')
})

// Building listed date
// ******************************************
router.post('/listed-building/listed-date', function (req, res) {
 res.redirect('grant-made')
})

// Finish the building task
// ******************************************
router.post('/listed-building/grant-made', function (req, res) {
 req.session.data["enforcement-taskliststatus-building"] = "Complete";
 res.redirect('../task-list')
})



// *****************************
// TELL US ABOUT THE APPEAL SITE
// *****************************

// Site interest
// ******************************************
router.post('/appeal-site/site-interest', function (req, res) {

 // Make a variable from session data
 let interest = req.session.data['enforcement-interest']

 // route depending on value
 if (interest === 'none') {
   res.redirect('owner-consent')
 } else {
   res.redirect('other-appeals')
 }
})

// Owner consent
// ******************************************
router.post('/appeal-site/owner-consent', function (req, res) {

 // Make a variable from session data
 let interest = req.session.data['enforcement-site-owner-consent']

 // route depending on value
 if (interest === 'Yes') {
   res.redirect('site-occupation')
 } else {
   res.redirect('your-interest')
 }
})

// Finish the appeal site task
// ******************************************
router.post('/appeal-site/other-appeals', function (req, res) {
 req.session.data["enforcement-taskliststatus-appealsite"] = "Complete";
 res.redirect('../task-list')
})



// *****************************
// CHOOSE YOUR GROUNDS OF APPEAL
// *****************************

// Which statements apply to your case?
// ******************************************
router.post('/grounds/grounds', function (req, res) {

 // Make a variable from session data
 let groundA = req.session.data['grounds-1']
 let groundB = req.session.data['grounds-2']
 let groundC = req.session.data['grounds-3']
 let groundD = req.session.data['grounds-4']
 let groundE = req.session.data['grounds-5']
 let groundF = req.session.data['grounds-6']
 let groundG = req.session.data['grounds-7']

    // use textarea input
    // route depending on value
    if (groundA) {
     res.redirect('groundA')
    } else if (groundB) {
     res.redirect('groundB')
    } else if (groundC) {
     res.redirect('groundC')
    } else if (groundD) {
     res.redirect('groundD')
    } else if (groundE) {
     res.redirect('groundE')
    } else if (groundF) {
     res.redirect('groundF')
    } else if (groundG) {
     res.redirect('groundG')
    } else {
     res.redirect('application')
    }

})

// Ground A reasons
// ******************************************
router.post('/grounds/groundA', function (req, res) {

 // Make a variable from session data
 let groundB = req.session.data['grounds-3']
 let groundC = req.session.data['grounds-3']
 let groundD = req.session.data['grounds-4']
 let groundE = req.session.data['grounds-5']
 let groundF = req.session.data['grounds-6']
 let groundG = req.session.data['grounds-7']

 // route depending on value
 if (groundB) {
   res.redirect('groundB')
 } else if (groundC) {
   res.redirect('groundC')
 } else if (groundD) {
   res.redirect('groundD')
 } else if (groundE) {
   res.redirect('groundE')
 } else if (groundF) {
   res.redirect('groundF')
 } else if (groundG) {
   res.redirect('groundG')
 } else {
   res.redirect('application')
 }

})


// Ground B reasons
// ******************************************
router.post('/grounds/groundB', function (req, res) {

 // Make a variable from session data
 let groundC = req.session.data['grounds-3']
 let groundD = req.session.data['grounds-4']
 let groundE = req.session.data['grounds-5']
 let groundF = req.session.data['grounds-6']
 let groundG = req.session.data['grounds-7']

 // see what format they chose
 let format = req.session.data['enforcement-facts-format']

 if (format == "files") {
   // use document files
   // default method for ground
   req.session.data["enforcement-reason-method"] = "files";

   // use textarea input
   // route depending on value
   if (groundC) {
     res.redirect('groundC')
   } else if (groundD) {
     res.redirect('groundD')
   } else if (groundE) {
     res.redirect('groundE')
   } else if (groundF) {
     res.redirect('groundF')
   } else if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 } else {

   // default method for ground
   req.session.data["enforcement-reason-method"] = "text";

   // use textarea input
   // route depending on value
   if (groundC) {
     res.redirect('groundC')
   } else if (groundD) {
     res.redirect('groundD')
   } else if (groundE) {
     res.redirect('groundE')
   } else if (groundF) {
     res.redirect('groundF')
   } else if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 }

})


// Ground C reasons
// ******************************************
router.post('/grounds/groundC', function (req, res) {

 // Make a variable from session data
 let groundD = req.session.data['grounds-4']
 let groundE = req.session.data['grounds-5']
 let groundF = req.session.data['grounds-6']
 let groundG = req.session.data['grounds-7']

 // see what format they chose
 let format = req.session.data['enforcement-facts-format']

 if (format == "files") {
   // use document files
   // default method for ground
   req.session.data["enforcement-reason-method"] = "files";

   // use textarea input
   // route depending on value
   if (groundD) {
     res.redirect('groundD')
   } else if (groundE) {
     res.redirect('groundE')
   } else if (groundF) {
     res.redirect('groundF')
   } else if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 } else {

   // default method for ground
   req.session.data["enforcement-reason-method"] = "text";

   // use textarea input
   // route depending on value
   if (groundD) {
     res.redirect('groundD')
   } else if (groundE) {
     res.redirect('groundE')
   } else if (groundF) {
     res.redirect('groundF')
   } else if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 }

})


// Ground D reasons
// ******************************************
router.post('/grounds/groundD', function (req, res) {

 // Make a variable from session data
 let groundE = req.session.data['grounds-5']
 let groundF = req.session.data['grounds-6']
 let groundG = req.session.data['grounds-7']

 // see what format they chose
 let format = req.session.data['enforcement-facts-format']

 if (format == "files") {
   // use document files
   // default method for ground
   req.session.data["enforcement-reason-method"] = "files";

   // use textarea input
   // route depending on value
   if (groundE) {
     res.redirect('groundE')
   } else if (groundF) {
     res.redirect('groundF')
   } else if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 } else {

   // default method for ground
   req.session.data["enforcement-reason-method"] = "text";

   // use textarea input
   // route depending on value
   if (groundE) {
     res.redirect('groundE')
   } else if (groundF) {
     res.redirect('groundF')
   } else if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 }

})


// Ground E reasons
// ******************************************
router.post('/grounds/groundE', function (req, res) {

 // Make a variable from session data
 let groundF = req.session.data['grounds-6']
 let groundG = req.session.data['grounds-7']

 // see what format they chose
 let format = req.session.data['enforcement-facts-format']

 if (format == "files") {
   // use document files
   // default method for ground
   req.session.data["enforcement-reason-method"] = "files";

   // use textarea input
   // route depending on value
   if (groundF) {
     res.redirect('groundF')
   } else if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 } else {

   // default method for ground
   req.session.data["enforcement-reason-method"] = "text";

   // use textarea input
   // route depending on value
   if (groundF) {
     res.redirect('groundF')
   } else if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 }

})


// Ground F reasons
// ******************************************
router.post('/grounds/groundF', function (req, res) {

 // res.redirect('grounds/upload-ground')

 // Make a variable from session data
 let groundG = req.session.data['grounds-7']

 // see what format they chose
 let format = req.session.data['enforcement-facts-format']

 if (format == "files") {
   // use document files
   // default method for ground
   req.session.data["enforcement-reason-method"] = "files";

   // use textarea input
   // route depending on value
   if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 } else {

   // default method for ground
   req.session.data["enforcement-reason-method"] = "text";

   // use textarea input
   // route depending on value
   if (groundG) {
     res.redirect('groundG')
   } else {
     res.redirect('application')
   }

 }

})


// Ground G reasons
// ******************************************
router.post('/grounds/groundG', function (req, res) {
 res.redirect('application')
})

// Did you sumbit a planning application
router.post('/grounds/application', function (req, res) {

  // Make a variable from session data
  let applicationMade = req.session.data['enforcement-application']

  // route depending on value
  if (applicationMade === 'Yes') {
    // application made, let’s ask for the date
    res.redirect('application-date')
  } else {
    // no application, let’s move on
    req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
    res.redirect('../task-list')
  }

})

// Application decision
// ******************************************
router.post('/grounds/application-decision', function (req, res) {

 // Make a variable from session data
 let decisionreceived = req.session.data['enforcement-application-decision']

 // route depending on value
 if (decisionreceived === 'Yes') {
   // decision received, let’s ask for the date
   res.redirect('application-decision-date')
 // no decision, let’s move on
 } else {
   req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
   res.redirect('../task-list')
 }

})

// When did you receive the decision?
// ******************************************
router.post('/grounds/application-decision-date', function (req, res) {
 req.session.data["enforcement-taskliststatus-grounds"] = "Complete";
 res.redirect('../task-list')
})

// ******************************************************
//  TELL US HOW YOU WOULD PREFER US TO DECIDE YOUR APPEAL
// ******************************************************

// How would you like us to decide your appeal?
// ******************************************
router.post('/procedure/procedure', function (req, res) {

  // Make a variable from session data
  let how = req.session.data['enforcement-procedure']

  // route depending on value
  if (how === 'Inquiry') {
   res.redirect('inquiry')
  } else if (how === 'Hearing') {
   res.redirect('hearing')
  } else {
   req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
   res.redirect('../task-list')
   // var x = "enforcement-taskliststatus-proceduretype"
   // finishProcedure(x, req, res)
  }
})

// Back to tasklist after telling us why you want a hearing/inquiry
// ******************************************
router.post('/procedure/hearing', function (req, res) {

  req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
  res.redirect('../task-list')
})

// How many witnesses would you expect to give evidence at the inquiry?
// ******************************************
router.post('/procedure/inquiry-witnesses', function (req, res) {

  let witnesses = req.session.data['enforcement-inquiry-witnesses']
  req.session.data["enforcement-inquiry-witnesses"] = witnesses;
  res.redirect('common-ground')
})

// Back to tasklist after giving is your statement of common ground
// ******************************************
router.post('/procedure/common-ground', function (req, res) {

  req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
  res.redirect('../task-list')
})

// router.finishProcedure(req, res){
//   req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
//   res.redirect('../task-list')
// }

// function finishProcedure(x, req, res){
//   // req.session.data["enforcement-taskliststatus-proceduretype"] = "Complete";
//   // res.redirect('../task-list')
//   //
//   req.session.data, x = "Complete";
//   // set(req.session.data, x , 'Complete')
//   res.redirect('../task-list')
// }

// *********************************
//  UPLOAD DOCUMENTS FOR YOUR APPEAL
// *********************************

// Enforcement notice and additional plans
// ******************************************
router.post('/upload/enforcement-notice', function (req, res) {
  res.redirect('planning-obligation')
})

// Are you submitting a planning obligation
// ******************************************
router.post('/upload/planning-obligation', function (req, res) {

  // Make a variable from session data
  let obligation = req.session.data['enforcement-planning-obligation']
  // route depending on value
  if (obligation === 'Yes') {
   res.redirect('planning-obligation-status')
  } else {
   res.redirect('supporting-documents')
  }
})

// Are you submitting a planning obligation
// ******************************************
router.post('/upload/planning-obligation-status', function (req, res) {
  // Make a variable from session data
  let obligationstatus = req.session.data['enforcement-planning-obligation-status']
  // route depending on value
  if (obligationstatus === 'Finalised and ready to submit') {
   res.redirect('obligation-ready')
  } else if (obligationstatus === 'In draft') {
   res.redirect('obligation-draft')
  } else {
   res.redirect('obligation-not-started')
  }
})

// Do you have supporting documents?
router.post('/upload/supporting-documents', function (req, res) {

 // Make a variable from session data
 let supportingdocuments = req.session.data['enforcement-supporting-documents']

 // route depending on value
 if (supportingdocuments === 'Yes') {
   res.redirect('additional-documents')
 } else {
   req.session.data["enforcement-taskliststatus-appealdocuments"] = "Complete";
   res.redirect('../task-list')
 }
})

// ENF 00X
// Additional documents
router.post('/upload/additional-documents', function (req, res) {
 req.session.data["enforcement-taskliststatus-appealdocuments"] = "Complete";
 res.redirect('../task-list')
})


// *********************
//  SKIP LINKS FOR INDEX
// *********************

// Quick link to appeal start
// ******************************************
router.get('/appeal-start', function (req, res) {
  // clears tasklist statuses
  req.session.data["enforcement-taskliststatus-contactdetails"] = "";
  req.session.data["enforcement-taskliststatus-building"] = "";
  req.session.data["enforcement-taskliststatus-appealsite"] = "";
  req.session.data["enforcement-taskliststatus-grounds"] = "";
  req.session.data["enforcement-taskliststatus-proceduretype"] = "";
  req.session.data["enforcement-taskliststatus-appealdocuments"] = "";

  // enforcement-notice-name
  res.redirect('before-you-continue')
})

// Quick link to a complete task list
// ******************************************
router.get('/tasks-done', function (req, res) {
  // Makes all tasklist statuses Complete
  req.session.data["enforcement-taskliststatus-contactdetails"] = "Complete";
  req.session.data["enforcement-taskliststatus-building"] = "Complete";
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

  res.redirect('task-list')
})



// Add routes above
//
//
//
//
//
//
//
//
module.exports = router
