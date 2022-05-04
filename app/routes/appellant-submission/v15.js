module.exports = function (router) {

  var v = "v15";
  var base = "/appellant-submission/"+v+"/";
  
/******************
 *** SKIP LINKS ***
 ******************/

  router.get(base+'skip/bys-cya-removalvary-nondetermination', function (req, res) {
    req.session.data["appealsub-"+v+"-bys-planningdepartment"] = "BRD";
    req.session.data["appealsub-"+v+"-bys-whatareyouappealing"] = "Removal or variation of conditions";
    req.session.data["appealsub-"+v+"-bys-removalvariationconditions"] = "No";
    req.session.data["appealsub-"+v+"-bys-appealabout"] = [
      "None of these"
    ],
    req.session.data["appealsub-"+v+"-bys-permissiongrantedrefused"] = "I have not received a decision";
    req.session.data["appealsub-"+v+"-bys-decisiondatedue-day"] = "03";
    req.session.data["appealsub-"+v+"-bys-decisiondatedue-month"] = "03";
    req.session.data["appealsub-"+v+"-bys-decisiondatedue-year"] = "2022";
    req.session.data["appealsub-"+v+"-bys-deadline-day"] = 1,
    req.session.data["appealsub-"+v+"-bys-deadline-month"] = 9,
    req.session.data["appealsub-"+v+"-bys-deadline-year"] = 2022,
    req.session.data["appealsub-"+v+"-bys-enforcementnotice"] = "No";
    req.session.data["appealsub-"+v+"-bys-route"] = "full",
    res.redirect(base+'before-you-start/check-answers');
  })

  router.get(base+'skip/bys-cya-full-refused', function (req, res) {
    req.session.data["appealsub-"+v+"-bys-planningdepartment"] = "BRD";
    req.session.data["appealsub-"+v+"-bys-whatareyouappealing"] = "Full planning";
    req.session.data["appealsub-"+v+"-bys-appealabout"] = [
      "No, my planning application was not about any of these"
    ],
    req.session.data["appealsub-"+v+"-bys-permissiongrantedrefused"] = "Refused";
    req.session.data["appealsub-"+v+"-bys-decisiondatedue-day"] = "04";
    req.session.data["appealsub-"+v+"-bys-decisiondatedue-month"] = "04";
    req.session.data["appealsub-"+v+"-bys-decisiondatedue-year"] = "2022";
    req.session.data["appealsub-"+v+"-bys-deadline-day"] = 3,
    req.session.data["appealsub-"+v+"-bys-deadline-month"] = 10,
    req.session.data["appealsub-"+v+"-bys-deadline-year"] = 2022,
    req.session.data["appealsub-"+v+"-bys-enforcementnotice"] = "No";
    req.session.data["appealsub-"+v+"-bys-route"] = "full",
    res.redirect(base+'before-you-start/check-answers');
  })



/************************
 *** BEFORE YOU START ***
 ************************/

  // Question 1
    router.post(base+'before-you-start/planning-department', function (req, res) {
      if (
        // Check if selected LPA key aligns to allowed LPA in local-authority-eng.json
        // Current LPAs:
        //  - BRD (City of Bradford Metropolitan District Council)
        //  - HIL (London Borough of Hillingdon)
        //  - HAG (Harrogate Borough Council)
        req.session.data["appealsub-"+v+"-bys-planningdepartment"] == "BRD" ||
        req.session.data["appealsub-"+v+"-bys-planningdepartment"] == "HIL" ||
        req.session.data["appealsub-"+v+"-bys-planningdepartment"] == "HAG"
      ){
        res.redirect(base+'before-you-start/what-are-you-appealing');
      } else {
        res.redirect(base+'before-you-start/shutter/lpa-ineligible');
      }
    })

  router.post(base+'before-you-start/what-are-you-appealing', function (req, res) {
    if (req.session.data["appealsub-"+v+"-bys-whatareyouappealing"] == "I have not made a planning application") {
      res.redirect(base+'before-you-start/shutter/planning-application-not-made');
    } else if (req.session.data["appealsub-"+v+"-bys-whatareyouappealing"] == "Something else") {
      res.redirect(base+'before-you-start/shutter/planning-application-something-else');
    } else if (req.session.data["appealsub-"+v+"-bys-whatareyouappealing"] == "Householder planning") {
      req.session.data['appealsub-'+v+'-bys-route'] = "expedited"
      res.redirect(base+'before-you-start/listed-building');
    } else if (req.session.data["appealsub-"+v+"-bys-whatareyouappealing"] == "Prior approval") {
      res.redirect(base+'before-you-start/prior-approval');
    } else if (req.session.data["appealsub-"+v+"-bys-whatareyouappealing"] == "Removal or variation of conditions") {
      res.redirect(base+'before-you-start/removal-variation-conditions');
    } else {
      res.redirect(base+'before-you-start/appeal-about');        
    }
  })

  router.post(base+'before-you-start/prior-approval', function (req, res) {
    if (req.session.data["appealsub-"+v+"-bys-priorapproval"] == "No"){
      // full appeal
      req.session.data['appealsub-'+v+'-bys-route'] = "full"
      res.redirect(base+'before-you-start/appeal-about');
    } else if (req.session.data["appealsub-"+v+"-bys-priorapproval"] == "Yes"){
      // expedited written representations
      req.session.data['appealsub-'+v+'-bys-route'] = "expedited"
      res.redirect(base+'before-you-start/listed-building');
    }
  })
  router.post(base+'before-you-start/removal-variation-conditions', function (req, res) {
    if (req.session.data["appealsub-"+v+"-bys-removalvariationconditions"] == "No"){
      // full appeal
      req.session.data['appealsub-'+v+'-bys-route'] = "full"
      res.redirect(base+'before-you-start/appeal-about');
    } else if (req.session.data["appealsub-"+v+"-bys-removalvariationconditions"] == "Yes"){
      // expedited written representations
      req.session.data['appealsub-'+v+'-bys-route'] = "expedited"
      res.redirect(base+'before-you-start/listed-building');
    }
  })

  router.post(base+'before-you-start/listed-building', function (req, res) {
    if (req.session.data["appealsub-"+v+"-bys-listedbuilding"] == "No"){
      res.redirect(base+'before-you-start/permission-granted-refused');
    } else {
      res.redirect(base+'before-you-start/shutter/listed-building');
    }
  })

  router.post(base+'before-you-start/appeal-about', function (req, res) {
    if (req.session.data["appealsub-"+v+"-bys-appealabout"].includes("No, my planning application was not about any of these") ){
      res.redirect(base+'before-you-start/permission-granted-refused');
    } else {
      res.redirect(base+'before-you-start/shutter/appeal-about');
    }
  })

  router.post(base+'before-you-start/permission-granted-refused', function (req, res) {
    if (req.session.data["appealsub-"+v+"-bys-permissiongrantedrefused"] == "I have not received a decision"){
      req.session.data['appealsub-'+v+'-bys-route'] = "full"
      res.redirect(base+'before-you-start/decision-date-due');
    } else {
      res.redirect(base+'before-you-start/notice-decision-date');
    }
  })

  router.post(base+'before-you-start/notice-decision-date', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['appealsub-'+v+'-bys-decisiondate-day'];
    var enteredMonth = req.session.data['appealsub-'+v+'-bys-decisiondate-month'];
    var enteredYear = req.session.data['appealsub-'+v+'-bys-decisiondate-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 

    // calculate deadline for appeal based on decision due date
    var deadlineDate = new Date(enteredDate);
    if (
      (req.session.data['appealsub-'+v+'-bys-whatareyouappealing'] == "Full planning") ||
      (
        (req.session.data['appealsub-'+v+'-bys-whatareyouappealing'] == "Householder planning") &&
        (req.session.data['appealsub-'+v+'-bys-permissiongrantedrefused'] == "Granted")
      )
    ){
      // 6 months = 26 weeks for full appeals
        req.session.data['appealsub-'+v+'-bys-route'] = "full"
      deadlineDate.setDate(deadlineDate.getDate() + (26*7));
    } else {
      // 12 weeks for the HAS (expedited) appeals
        req.session.data['appealsub-'+v+'-bys-route'] = "expedited"
      deadlineDate.setDate(deadlineDate.getDate() + (12*7));
    }

    req.session.data["appealsub-"+v+"-bys-deadline-day"] = deadlineDate.getDate();
    req.session.data["appealsub-"+v+"-bys-deadline-month"] = deadlineDate.getMonth() + 1;
    req.session.data["appealsub-"+v+"-bys-deadline-year"] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      if (req.session.data['appealsub-'+v+'-bys-whatareyouappealing'] == "Full planning"){
        res.redirect(base+'before-you-start/shutter/out-of-time-full')
      } else if (
        req.session.data['appealsub-'+v+'-bys-whatareyouappealing'] == "Householder planning" &&
        req.session.data['appealsub-'+v+'-bys-permissiongrantedrefused'] == "Granted"
      ) {
        res.redirect(base+'before-you-start/shutter/out-of-time-full')
      } else {
        res.redirect(base+'before-you-start/shutter/out-of-time-householder')
      }
    } else {
      res.redirect(base+'before-you-start/enforcement-notice');
    }
  })


  router.post(base+'before-you-start/decision-date-due', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['appealsub-'+v+'-bys-decisiondatedue-day'];
    var enteredMonth = req.session.data['appealsub-'+v+'-bys-decisiondatedue-month'];
    var enteredYear = req.session.data['appealsub-'+v+'-bys-decisiondatedue-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 

    // calculate deadline for appeal based on decision due date
    // 6 months = 26 weeks for the prototype
    var deadlineDate = new Date(enteredDate);
    deadlineDate.setDate(deadlineDate.getDate() + (26*7));

    req.session.data['appealsub-'+v+'-bys-deadline-day'] = deadlineDate.getDate();
    req.session.data['appealsub-'+v+'-bys-deadline-month'] = deadlineDate.getMonth() + 1;
    req.session.data['appealsub-'+v+'-bys-deadline-year'] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      res.redirect(base+'before-you-start/shutter/out-of-time-no-decision')
    } else {
      res.redirect(base+'before-you-start/enforcement-notice')
    }
  })

  router.post(base+'before-you-start/enforcement-notice', function (req, res) {
    if (req.session.data["appealsub-"+v+"-bys-enforcementnotice"] == "No"){
      if (req.session.data['appealsub-'+v+'-bys-route'] == "expedited") {
        res.redirect(base+'before-you-start/claiming-costs');
      } else {
        //res.redirect(base+'listed-building/task-list');
        res.redirect(base+'before-you-start/check-answers');
      }
    } else {
      res.redirect(base+'before-you-start/shutter/enforcement-notice');
    }
  })

  router.post(base+'before-you-start/claiming-costs', function (req, res) {
    if (req.session.data["appealsub-"+v+"-bys-claimingcosts"] == "No"){
      //res.redirect(base+'expedited/task-list');
      res.redirect(base+'before-you-start/check-answers');
    } else {
      res.redirect(base+'before-you-start/shutter/claiming-costs');
    }
  })

    
  /************************************
   *** Provide your contact details ***
   ************************************/
  
    router.post(base+'listed-building/contact-details/who-are-you', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "In progress";
      if (req.session.data["appealsub-"+v+"-contactdetails-applicationinyourname"] == "No, I'm acting on behalf of the applicant"){
        res.redirect(base+'listed-building/contact-details/applicant-name');
      } else {
        res.redirect(base+'listed-building/contact-details/your-details');
      }
    })
  
    router.post(base+'listed-building/contact-details/applicant-name', function (req, res) {
      res.redirect(base+'listed-building/contact-details/your-details');
    })
  
    router.post(base+'listed-building/contact-details/your-details', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "Complete";
      res.redirect(base+'listed-building/task-list');
    })
  
    router.post(base+'listed-building/contact-details/how-to-answer', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "Complete";
      res.redirect(base+'listed-building/task-list');
    })
  
  
  /*******************
   *** APPEAL SITE ***
   *******************/
    
    router.post(base+'listed-building/appeal-site/site-address', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-appealsite"] = "In progress";
      res.redirect(base+'listed-building/appeal-site/own-land');
    })
  
    router.post(base+'listed-building/appeal-site/own-land', function (req, res) {
      if (req.session.data["appealsub-"+v+"-appealsite-ownland"] == "Yes"){
        res.redirect(base+'listed-building/appeal-site/agricultural-holdings');
      } else {
        res.redirect(base+'listed-building/appeal-site/own-some');
      }
    })
  
    router.post(base+'listed-building/appeal-site/own-some', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/own-rest');
    })
  
    router.post(base+'listed-building/appeal-site/own-rest', function (req, res) {
      if (req.session.data["appealsub-"+v+"-appealsite-ownrest"] == "Yes, I know who owns all the land"){
        res.redirect(base+'listed-building/appeal-site/knows-all/tell-landowners');
      } else if (req.session.data["appealsub-"+v+"-appealsite-ownrest"] == "I know who owns some of the land"){
        res.redirect(base+'listed-building/appeal-site/knows-some/identifying-landowners');
      } else {
        res.redirect(base+'listed-building/appeal-site/knows-none/identifying-landowners');
      }
    })
  
    // If all landowners known
    router.post(base+'listed-building/appeal-site/knows-all/tell-landowners', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/agricultural-holdings');
    })
  
    // If some landowners known
    router.post(base+'listed-building/appeal-site/knows-some/identifying-landowners', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/knows-some/advertising-appeal');
    })
    router.post(base+'listed-building/appeal-site/knows-some/advertising-appeal', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/knows-some/tell-landowners');
    })
    router.post(base+'listed-building/appeal-site/knows-some/tell-landowners', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/agricultural-holdings');
    })
  
    // If none of landowners known
    router.post(base+'listed-building/appeal-site/knows-none/identifying-landowners', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/knows-none/advertising-appeal');
    })
    router.post(base+'listed-building/appeal-site/knows-none/advertising-appeal', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/agricultural-holdings');
    })
  
    // Agricultural holdings
    router.post(base+'listed-building/appeal-site/agricultural-holdings', function (req, res) {
      if (req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings"] == "Yes"){
        res.redirect(base+'listed-building/appeal-site/agricultural-holdings-tenant');
      } else {
        res.redirect(base+'listed-building/appeal-site/site-visible');
      }
    })
  
    router.post(base+'listed-building/appeal-site/agricultural-holdings-tenant', function (req, res) {
      if (req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings-tenant"] == "Yes"){
        res.redirect(base+'listed-building/appeal-site/agricultural-holdings-other-tenants');
      } else {
        res.redirect(base+'listed-building/appeal-site/agricultural-holdings-tell-tenants');
      }
    })
  
    router.post(base+'listed-building/appeal-site/agricultural-holdings-other-tenants', function (req, res) {
      if (req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings-othertenants"] == "Yes"){
        res.redirect(base+'listed-building/appeal-site/agricultural-holdings-tell-tenants');
      } else {
        res.redirect(base+'listed-building/appeal-site/site-visible');
      }
    })
  
    router.post(base+'listed-building/appeal-site/agricultural-holdings-tell-tenants', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/site-visible');
    })
  
    router.post(base+'listed-building/appeal-site/site-visible', function (req, res) {
      res.redirect(base+'listed-building/appeal-site/health-safety');
    })
  
    router.post(base+'listed-building/appeal-site/health-safety', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-appealsite"] = "Complete";
      res.redirect(base+'listed-building/task-list');
    })
  
  
  /**************************************
   *** PLANNING APPLICATION DOCUMENTS ***
   **************************************/

    router.post(base+'listed-building/planning-application-documents/original-decision', function (req, res) {
      
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-applicationdocs-originaldecision"] == "") {
        if (req.session.data["appealsub-"+v+"-applicationdocs-originaldecision-existing"] != "") {
          req.session.data["appealsub-"+v+"-applicationdocs-originaldecision"] = req.session.data["appealsub-"+v+"-applicationdocs-originaldecision-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-applicationdocs-originaldecision-existing"] = req.session.data["appealsub-"+v+"-applicationdocs-originaldecision"]
      }
  
      req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "In progress";
      res.redirect(base+'listed-building/planning-application-documents/application-upload');
    })
  
    router.post(base+'listed-building/planning-application-documents/application-upload', function (req, res) {
      
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-applicationdocs-applicationform"] == "") {
        if (req.session.data["appealsub-"+v+"-applicationdocs-applicationform-existing"] != "") {
          req.session.data["appealsub-"+v+"-applicationdocs-applicationform"] = req.session.data["appealsub-"+v+"-applicationdocs-applicationform-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-applicationdocs-applicationform-existing"] = req.session.data["appealsub-"+v+"-applicationdocs-applicationform"]
      }
  
      req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "In progress";
      //res.redirect(base+'listed-building/planning-application-documents/application-number');
      res.redirect(base+'listed-building/planning-application-documents/certificates');
    })
  
    router.post(base+'listed-building/planning-application-documents/certificates', function (req, res) {
      if ( req.session.data["appealsub-"+v+"-applicationdocs-certificates"] == "No, I submitted these separately"){
        res.redirect(base+'listed-building/planning-application-documents/certificates-upload');
      } else {
        res.redirect(base+'listed-building/planning-application-documents/application-number');
      }
    })
  
    router.post(base+'listed-building/planning-application-documents/certificates-upload', function (req, res) {
      res.redirect(base+'listed-building/planning-application-documents/application-number');
    })
  
    router.post(base+'listed-building/planning-application-documents/application-number', function (req, res) {
      res.redirect(base+'listed-building/planning-application-documents/development-changed');
    })
  
    router.post(base+'listed-building/planning-application-documents/development-changed', function (req, res) {
      res.redirect(base+'listed-building/planning-application-documents/plans-drawings-upload');
    })
  
    router.post(base+'listed-building/planning-application-documents/plans-drawings-upload', function (req, res) {
      
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-applicationdocs-plansdrawings"] == "") {
        if (req.session.data["appealsub-"+v+"-applicationdocs-plansdrawings-existing"] != "") {
          req.session.data["appealsub-"+v+"-applicationdocs-plansdrawings"] = req.session.data["appealsub-"+v+"-applicationdocs-plansdrawings-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-applicationdocs-plansdrawings-existing"] = req.session.data["appealsub-"+v+"-applicationdocs-plansdrawings"]
      }
      
      res.redirect(base+'listed-building/planning-application-documents/design-access-statement');
    })
  
    router.post(base+'listed-building/planning-application-documents/design-access-statement', function (req, res) {
      if (req.session.data["appealsub-"+v+"-applicationdocs-designaccess"] == "Yes"){
        res.redirect(base+'listed-building/planning-application-documents/design-access-statement-upload');
      } else {
        if (req.session.data["appealsub-"+v+"-bys-permissiongrantedrefused"] == "I have not received a decision"){
          res.redirect(base+'listed-building/planning-application-documents/confirming-letter');
        } else {
          res.redirect(base+'listed-building/planning-application-documents/decision-letter');
        }
      }
    })
  
    router.post(base+'listed-building/planning-application-documents/design-access-statement-upload', function (req, res) {
      
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-applicationdocs-designaccess-file"] == "") {
        if (req.session.data["appealsub-"+v+"-applicationdocs-designaccess-file-existing"] != "") {
          req.session.data["appealsub-"+v+"-applicationdocs-designaccess-file"] = req.session.data["appealsub-"+v+"-applicationdocs-designaccess-file-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-applicationdocs-designaccess-file-existing"] = req.session.data["appealsub-"+v+"-applicationdocs-designaccess-file"]
      }
      if (req.session.data["appealsub-"+v+"-bys-permissiongrantedrefused"] == "I have not received a decision"){
        res.redirect(base+'listed-building/planning-application-documents/confirming-letter');
      } else {
        res.redirect(base+'listed-building/planning-application-documents/decision-letter');
      }
    })
  
    router.post(base+'listed-building/planning-application-documents/decision-letter', function (req, res) {
      
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-applicationdocs-decisionletter"] == "") {
        if (req.session.data["appealsub-"+v+"-applicationdocs-decisionletter-existing"] != "") {
          req.session.data["appealsub-"+v+"-applicationdocs-decisionletter"] = req.session.data["appealsub-"+v+"-applicationdocs-decisionletter-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-applicationdocs-decisionletter-existing"] = req.session.data["appealsub-"+v+"-applicationdocs-decisionletter"]
      }
  
      req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "Complete";
      res.redirect(base+'listed-building/task-list');
    })

    
    router.post(base+'listed-building/planning-application-documents/confirming-letter', function (req, res) {
      
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-applicationdocs-confirmingletter"] == "") {
        if (req.session.data["appealsub-"+v+"-applicationdocs-confirmingletter-existing"] != "") {
          req.session.data["appealsub-"+v+"-applicationdocs-confirmingletter"] = req.session.data["appealsub-"+v+"-applicationdocs-confirmingletter-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-applicationdocs-confirmingletter-existing"] = req.session.data["appealsub-"+v+"-applicationdocs-confirmingletter"]
      }
  
      req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "Complete";
      res.redirect(base+'listed-building/task-list');
    })
  
  
  /****************************************
   *** Upload documents for your appeal ***
   ****************************************/
    
    router.post(base+'listed-building/appeal-documents/appeal-statement', function (req, res) {
      
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-appealdocs-appealstatement"] == "") {
        if (req.session.data["appealsub-"+v+"-appealdocs-appealstatement-existing"] != "") {
          req.session.data["appealsub-"+v+"-appealdocs-appealstatement"] = req.session.data["appealsub-"+v+"-appealdocs-appealstatement-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-appealdocs-appealstatement-existing"] = req.session.data["appealsub-"+v+"-appealdocs-appealstatement"]
      }
  
      req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "In progress";
      res.redirect(base+'listed-building/appeal-documents/plans-drawings');
    })
  
    router.post(base+'listed-building/appeal-documents/plans-drawings', function (req, res) {
      if (req.session.data["appealsub-"+v+"-appealdocs-plansdrawings"] == "Yes"){
        res.redirect(base+'listed-building/appeal-documents/plans-drawings-upload');
      } else {
        res.redirect(base+'listed-building/appeal-documents/planning-obligation');
      }
    })
  
    router.post(base+'listed-building/appeal-documents/plans-drawings-upload', function (req, res) {
      
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-appealdocs-plansdrawings-files"] == "") {
        if (req.session.data["appealsub-"+v+"-appealdocs-plansdrawings-files-existing"] != "") {
          req.session.data["appealsub-"+v+"-appealdocs-plansdrawings-files"] = req.session.data["appealsub-"+v+"-appealdocs-plansdrawings-files-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-appealdocs-plansdrawings-files-existing"] = req.session.data["appealsub-"+v+"-appealdocs-plansdrawings-files"]
      }
  
      res.redirect(base+'listed-building/appeal-documents/planning-obligation');
    })
  
    router.post(base+'listed-building/appeal-documents/planning-obligation', function (req, res) {
      if (req.session.data["appealsub-"+v+"-appealdocs-planningobligation"] == "Yes"){
        res.redirect(base+'listed-building/appeal-documents/planning-obligation-status');
      } else {
        res.redirect(base+'listed-building/appeal-documents/supporting-documents');
      }
    })
  
    router.post(base+'listed-building/appeal-documents/planning-obligation-status', function (req, res) {
      res.redirect(base+'listed-building/appeal-documents/planning-obligation-upload');
    })
  
    router.post(base+'listed-building/appeal-documents/planning-obligation-upload', function (req, res) {
      res.redirect(base+'listed-building/appeal-documents/supporting-documents');
    })
  
    router.post(base+'listed-building/appeal-documents/supporting-documents', function (req, res) {
      if (req.session.data["appealsub-"+v+"-appealdocs-supportingdocuments"] == "Yes"){
        res.redirect(base+'listed-building/appeal-documents/supporting-documents-upload');
      } else {
        req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "Complete";
        res.redirect(base+'listed-building/task-list');
      }
    })
  
    router.post(base+'listed-building/appeal-documents/supporting-documents-upload', function (req, res) {
  
      // Don't overwrite previously uploaded files with a blank upload
      if (req.session.data["appealsub-"+v+"-appealdocs-supportingdocuments-files"] == "") {
        if (req.session.data["appealsub-"+v+"-appealdocs-supportingdocuments-files-existing"] != "") {
          req.session.data["appealsub-"+v+"-appealdocs-supportingdocuments-files"] = req.session.data["appealsub-"+v+"-appealdocs-supportingdocuments-files-existing"]
        }
      } else {
        req.session.data["appealsub-"+v+"-appealdocs-supportingdocuments-files-existing"] = req.session.data["appealsub-"+v+"-appealdocs-supportingdocuments-files"]
      }
  
      req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "Complete";
      res.redirect(base+'listed-building/task-list');
    })
  
  
  /**********************************************
   *** Upload an application for appeal costs ***
   **********************************************/
    
    router.post(base+'listed-building/claiming-costs', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-claimingcosts"] = "Complete";
      res.redirect(base+'listed-building/task-list');
    })
  
  
  /***********************************************************
   *** Tell us how you would like us to decide your appeal ***
   ***********************************************************/
    
    router.post(base+'listed-building/procedure-type/decide', function (req, res) {
      if (req.session.data['appealsub-'+v+'-proceduretype-decide'] == "Written representations") {
        req.session.data["appealsub-"+v+"-taskliststatus-proceduretype"] = "Complete";
        res.redirect(base+'listed-building/task-list');
      } else if (req.session.data['appealsub-'+v+'-proceduretype-decide'] == "Hearing") {
        res.redirect(base+'listed-building/procedure-type/hearing/why');
      } else if (req.session.data['appealsub-'+v+'-proceduretype-decide'] == "Inquiry") {
        res.redirect(base+'listed-building/procedure-type/inquiry/why');
      }
    })
    
    router.post(base+'listed-building/procedure-type/hearing/why', function (req, res) {
      res.redirect(base+'listed-building/procedure-type/common-ground');
    })
    
    router.post(base+'listed-building/procedure-type/inquiry/why', function (req, res) {
      res.redirect(base+'listed-building/procedure-type/inquiry/days');
    })
    
    router.post(base+'listed-building/procedure-type/inquiry/days', function (req, res) {
      res.redirect(base+'listed-building/procedure-type/common-ground');
    })
    
    router.post(base+'listed-building/procedure-type/common-ground', function (req, res) {
      req.session.data["appealsub-"+v+"-taskliststatus-proceduretype"] = "Complete";
      res.redirect(base+'listed-building/task-list');
    })

}