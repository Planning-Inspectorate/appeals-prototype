module.exports = function (router) {

  var v = "v13";
  var base = "/appellant-submission/"+v+"/";


/******************
 *** SKIP LINKS ***
 ******************/

  router.get(base+'skip/full-bys-cya', function (req, res) {
    req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] = "BRD";
    req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] = "Full planning";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealabout"] = [
      "None of these"
    ],
    req.session.data["appealsub-"+v+"-beforeyoustart-enforcementnotice"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] = "Refused";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-day"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-month"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-year"] = "2021";
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-day"] = 10,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-month"] = 4,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-year"] = 2022,
    req.session.data["appealsub-"+v+"-beforeyoustart-claimingcosts"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealprocedure"] = "Written representations";
    req.session.data["appealsub-"+v+"-route"] = "full";
    res.redirect(base+'before-you-start/check-answers');
  })

  router.get(base+'skip/full-task-list', function (req, res) {
    req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] = "BRD";
    req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] = "Full planning";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealabout"] = [
      "None of these"
    ],
    req.session.data["appealsub-"+v+"-beforeyoustart-enforcementnotice"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] = "Refused";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-day"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-month"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-year"] = "2021";
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-day"] = 10,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-month"] = 4,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-year"] = 2022,
    req.session.data["appealsub-"+v+"-beforeyoustart-claimingcosts"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealprocedure"] = "Written representations";
    req.session.data["appealsub-"+v+"-route"] = "full";
    res.redirect(base+'full/task-list');
  })

  router.get(base+'skip/full-non-determinaton-task-list', function (req, res) {
    req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] = "BRD";
    req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] = "Full planning";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealabout"] = [
      "None of these"
    ],
    req.session.data["appealsub-"+v+"-beforeyoustart-enforcementnotice"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] = "I have not received a decision";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondatedue-day"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondatedue-month"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondatedue-year"] = "2021";
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-day"] = 10,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-month"] = 4,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-year"] = 2022,
    req.session.data["appealsub-"+v+"-beforeyoustart-claimingcosts"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealprocedure"] = "Written representations";
    req.session.data["appealsub-"+v+"-route"] = "full";
    res.redirect(base+'full/task-list');
  })

  router.get(base+'skip/full-check-answers', function (req, res) {
    req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] = "BRD";
    req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] = "Full planning";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealabout"] = [
      "None of these"
    ],
    req.session.data["appealsub-"+v+"-beforeyoustart-enforcementnotice"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] = "Refused";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-day"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-month"] = "10";
    req.session.data["appealsub-"+v+"-beforeyoustart-decisiondate-year"] = "2021";
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-day"] = 10,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-month"] = 4,
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-year"] = 2022,
    req.session.data["appealsub-"+v+"-beforeyoustart-claimingcosts"] = "No";
    req.session.data["appealsub-"+v+"-beforeyoustart-appealprocedure"] = "Written representations";
    req.session.data["appealsub-"+v+"-route"] = "full";

    req.session.data["appealsub-"+v+"-aboutyou-applicationinyourname"] = "No, I'm acting on behalf of the applicant"
    req.session.data["appealsub-"+v+"-aboutyou-applicantname"] = "John Smith"
    req.session.data["appealsub-"+v+"-aboutyou-yourname"] = "David Jones"
    req.session.data["appealsub-"+v+"-aboutyou-company"] = "DJ Planning Ltd"
    req.session.data["appealsub-"+v+"-aboutyou-youremail"] = "djones@djplanning.co.uk"
    req.session.data["appealsub-"+v+"-aboutyou-telephone"] = "01234567890"
    req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "Complete"

    req.session.data["appealsub-"+v+"-appealsite-address-line-1"] = "123 Main Road"
    req.session.data["appealsub-"+v+"-appealsite-address-town"] = "London"
    req.session.data["appealsub-"+v+"-appealsite-address-postcode"] = "N1 1NN"
    req.session.data["appealsub-"+v+"-appealsite-ownland"] = "No"
    req.session.data["appealsub-"+v+"-appealsite-ownsome"] = "Yes"
    req.session.data["appealsub-"+v+"-appealsite-ownrest"] = "I know who owns some of the land"
    req.session.data["appealsub-"+v+"-appealsite-knowsome-identifying"] = [
      "I confirm that I've attempted to identify all the other landowners, but have not been successful."
    ]
    req.session.data["appealsub-"+v+"-appealsite-knowsome-advertising"] = [
      "I've advertised my appeal in the press",
      "I've done this within the last 21 days",
      "I used a copy of the form in annexe 2A or 2B"
    ]
    req.session.data["appealsub-"+v+"-appealsite-knowsome-toldlandowners"] = [
      "I've told all the other landowners about my appeal",
      "I've done this within the last 21 days",
      "I used a copy of the form in annexe 2A or 2B"
    ]
    req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings"] = "Yes",
    req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings-tenant"] = "No",
    req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings-toldtenants"] = [
      "I've told all the tenants about my appeal",
      "I've done this within the last 21 days",
      "I used a copy of the form in Annexe 2a"
    ]
    req.session.data["appealsub-"+v+"-appealsite-visible"] = "Yes"
    req.session.data["appealsub-"+v+"-appealsite-healthsafety"] = "No"
    req.session.data["appealsub-"+v+"-taskliststatus-appealsite"] = "Complete"

    req.session.data["appealsub-"+v+"-proceduretype-decide"] = "Written representations"
    req.session.data["appealsub-"+v+"-taskliststatus-proceduretype"] = "Complete"

    req.session.data["appealsub-"+v+"-aboutapplication-applicationform"] = "planning_application_form.pdf"
    req.session.data["appealsub-"+v+"-aboutapplication-applicationform-existing"] = "planning_application_form.pdf"
    req.session.data["appealsub-"+v+"-aboutapplication-applicationnumber"] = "987654321"
    req.session.data["appealsub-"+v+"-aboutapplication-plansdrawings"] = "plans_drawings_documents.pdf"
    req.session.data["appealsub-"+v+"-aboutapplication-plansdrawings-existing"] = "plans_drawings_documents.pdf"

    req.session.data["appealsub-"+v+"-aboutapplication-designaccess"] = "Yes"
    req.session.data["appealsub-"+v+"-aboutapplication-designaccess-file"] = "design_access_statement.pdf"
    req.session.data["appealsub-"+v+"-aboutapplication-designaccess-file-existing"] = "design_access_statement.pdf"
    req.session.data["appealsub-"+v+"-aboutapplication-decisionletter"] = "decision_letter.pdf"
    req.session.data["appealsub-"+v+"-aboutapplication-decisionletter-existing"] = "decision_letter.pdf"
    req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "Complete"

    req.session.data["appealsub-"+v+"-appealdocuments-appealstatement"] = "appeal_statement.pdf"
    req.session.data["appealsub-"+v+"-appealdocuments-appealstatement-existing"] = "appeal_statement.pdf"
    req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings"] = "Yes",
    req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings-files"] = [
      "plan_one.pdf",
      "drawings_two.pdf"
    ],
    req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings-files-existing"] = [
      "plan_one.pdf",
      "drawings_two.pdf"
    ],
    req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments"] = "Yes",
    req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments-files"] = [
      "supporting_document_one.pdf",
      "supporting_document_two.pdf",
      "supporting_document_three.pdf"
    ],
    req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments-files-existing"] = [
      "supporting_document_one.pdf",
      "supporting_document_two.pdf",
      "supporting_document_three.pdf"
    ],
    req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "Complete"

    res.redirect(base+'full/task-list');
  })


/************************
 *** BEFORE YOU START ***
 ************************/

  /*
   * All routing in theis file is based on the logic in thes Miro board frame:
   * https://miro.com/app/board/o9J_lv1IHjc=/?moveToWidget=3074457365971757787&cot=14
   *
   * The relevant frame is titled "v9a Before you start (eligibility checker)"
   */

  // Question 1
    router.post(base+'before-you-start/planning-department', function (req, res) {
      if (
        // Check if selected LPA key aligns to allowed LPA in local-authority-eng.json
        // Current LPAs:
        //  - BRD (City of Bradford Metropolitan District Council)
        //  - HIL (London Borough of Hillingdon)
        //  - HAG (Harrogate Borough Council)
        req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] == "BRD" ||
        req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] == "HIL" ||
        req.session.data["appealsub-"+v+"-beforeyoustart-planningdepartment"] == "HAG"
      ){
        res.redirect(base+'before-you-start/what-are-you-appealing');
      } else {
        res.redirect(base+'before-you-start/shutter/lpa-ineligible');
      }
    })

  router.post(base+'before-you-start/what-are-you-appealing', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] == "I have not made a planning application") {
      res.redirect(base+'before-you-start/shutter/planning-application-not-made');
    } else if (req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] == "Something else") {
      res.redirect(base+'before-you-start/shutter/planning-application-something-else');
    } else if (req.session.data["appealsub-"+v+"-beforeyoustart-whatareyouappealing"] == "Householder planning") {
      res.redirect(base+'before-you-start/listed-building');
    } else {
      res.redirect(base+'before-you-start/appeal-about');
    }
  })

  router.post(base+'before-you-start/listed-building', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-listedbuilding"] == "No"){
      res.redirect(base+'before-you-start/permission-granted-refused');
    } else {
      res.redirect(base+'before-you-start/shutter/listed-building');
    }
  })

  router.post(base+'before-you-start/appeal-about', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-appealabout"].includes("None of these") ){
      res.redirect(base+'before-you-start/permission-granted-refused');
    } else {
      res.redirect(base+'before-you-start/shutter/appeal-about');
    }
  })

  router.post(base+'before-you-start/permission-granted-refused', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] == "I have not received a decision"){
      res.redirect(base+'before-you-start/decision-date-due');
    } else {
      res.redirect(base+'before-you-start/notice-decision-date');
    }
  })

  router.post(base+'before-you-start/notice-decision-date', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondate-day'];
    var enteredMonth = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondate-month'];
    var enteredYear = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondate-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay);

    // calculate deadline for appeal based on decision due date
    var deadlineDate = new Date(enteredDate);
    if (
      (req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Full planning") ||
      (
        (req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Householder planning") &&
        (req.session.data['appealsub-'+v+'-beforeyoustart-permissiongrantedrefused'] == "Granted")
      )
    ){
      // 6 months = 26 weeks for full appeals
      deadlineDate.setDate(deadlineDate.getDate() + (26*7));
    } else {
      // 12 weeks for the HAS appeals
      deadlineDate.setDate(deadlineDate.getDate() + (12*7));
    }

    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-day"] = deadlineDate.getDate();
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-month"] = deadlineDate.getMonth() + 1;
    req.session.data["appealsub-"+v+"-beforeyoustart-deadline-year"] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      if (req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Full planning"){
        res.redirect(base+'before-you-start/shutter/out-of-time-full')
      } else if (
        req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Householder planning" &&
        req.session.data['appealsub-'+v+'-beforeyoustart-permissiongrantedrefused'] == "Granted"
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
    var enteredDay = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondatedue-day'];
    var enteredMonth = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondatedue-month'];
    var enteredYear = req.session.data['appealsub-'+v+'-beforeyoustart-decisiondatedue-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay);

    // calculate deadline for appeal based on decision due date
    // 6 months = 26 weeks for the prototype
    var deadlineDate = new Date(enteredDate);
    deadlineDate.setDate(deadlineDate.getDate() + (26*7));

    req.session.data['appealsub-'+v+'-beforeyoustart-deadline-day'] = deadlineDate.getDate();
    req.session.data['appealsub-'+v+'-beforeyoustart-deadline-month'] = deadlineDate.getMonth() + 1;
    req.session.data['appealsub-'+v+'-beforeyoustart-deadline-year'] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      res.redirect(base+'before-you-start/shutter/out-of-time-no-decision')
    } else {
      res.redirect(base+'before-you-start/enforcement-notice')
    }
  })

  router.post(base+'before-you-start/enforcement-notice', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-enforcementnotice"] == "No"){
      if ((req.session.data['appealsub-'+v+'-beforeyoustart-whatareyouappealing'] == "Householder planning") && (req.session.data['appealsub-'+v+'-beforeyoustart-permissiongrantedrefused'] == "Refused")) {
        req.session.data['appealsub-'+v+'-route'] = "householder"
        res.redirect(base+'before-you-start/claiming-costs');
      } else {
        req.session.data['appealsub-'+v+'-route'] = "full"
        res.redirect(base+'before-you-start/check-answers');
      }
    } else {
      res.redirect(base+'before-you-start/shutter/enforcement-notice');
    }
  })

  router.post(base+'before-you-start/claiming-costs', function (req, res) {
    if (req.session.data["appealsub-"+v+"-beforeyoustart-claimingcosts"] == "No"){
      res.redirect(base+'before-you-start/check-answers');
    } else {
      res.redirect(base+'before-you-start/shutter/claiming-costs');
    }
  })


/************************************
 *** Provide your contact details ***
 ************************************/

  router.post(base+'full/contact-details/who-are-you', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "In progress";
    if (req.session.data["appealsub-"+v+"-aboutyou-applicationinyourname"] == "No, I'm acting on behalf of the applicant"){
      res.redirect(base+'full/contact-details/applicant-name');
    } else {
      res.redirect(base+'full/contact-details/your-details');
    }
  })

  router.post(base+'full/contact-details/applicant-name', function (req, res) {
    res.redirect(base+'full/contact-details/your-details');
  })

  router.post(base+'full/contact-details/your-details', function (req, res) {
    if (req.session.data["appealsub-"+v+"-aboutyou-applicationinyourname"] == "No, I'm acting on behalf of the applicant"){
      res.redirect(base+'full/contact-details/how-to-answer');
    } else {
      req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "Complete";
      res.redirect(base+'full/task-list');
    }
  })

  router.post(base+'full/contact-details/how-to-answer', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-contactdetails"] = "Complete";
    res.redirect(base+'full/task-list');
  })


/*******************
 *** APPEAL SITE ***
 *******************/

  router.post(base+'full/appeal-site/site-address', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-appealsite"] = "In progress";
    res.redirect(base+'full/appeal-site/own-land');
  })

  router.post(base+'full/appeal-site/own-land', function (req, res) {
    if (req.session.data["appealsub-"+v+"-appealsite-ownland"] == "Yes"){
      res.redirect(base+'full/appeal-site/agricultural-holdings');
    } else {
      res.redirect(base+'full/appeal-site/own-some');
    }
  })

  router.post(base+'full/appeal-site/own-some', function (req, res) {
    res.redirect(base+'full/appeal-site/own-rest');
  })

  router.post(base+'full/appeal-site/own-rest', function (req, res) {
    if (req.session.data["appealsub-"+v+"-appealsite-ownrest"] == "Yes, I know who owns all the land"){
      res.redirect(base+'full/appeal-site/knows-all/tell-landowners');
    } else if (req.session.data["appealsub-"+v+"-appealsite-ownrest"] == "I know who owns some of the land"){
      res.redirect(base+'full/appeal-site/knows-some/identifying-landowners');
    } else {
      res.redirect(base+'full/appeal-site/knows-none/identifying-landowners');
    }
  })

  // If all landowners known
  router.post(base+'full/appeal-site/knows-all/tell-landowners', function (req, res) {
    res.redirect(base+'full/appeal-site/agricultural-holdings');
  })

  // If some landowners known
  router.post(base+'full/appeal-site/knows-some/identifying-landowners', function (req, res) {
    res.redirect(base+'full/appeal-site/knows-some/advertising-appeal');
  })
  router.post(base+'full/appeal-site/knows-some/advertising-appeal', function (req, res) {
    res.redirect(base+'full/appeal-site/knows-some/tell-landowners');
  })
  router.post(base+'full/appeal-site/knows-some/tell-landowners', function (req, res) {
    res.redirect(base+'full/appeal-site/agricultural-holdings');
  })

  // If none of landowners known
  router.post(base+'full/appeal-site/knows-none/identifying-landowners', function (req, res) {
    res.redirect(base+'full/appeal-site/knows-none/advertising-appeal');
  })
  router.post(base+'full/appeal-site/knows-none/advertising-appeal', function (req, res) {
    res.redirect(base+'full/appeal-site/agricultural-holdings');
  })

  // Agricultural holdings
  router.post(base+'full/appeal-site/agricultural-holdings', function (req, res) {
    if (req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings"] == "Yes"){
      res.redirect(base+'full/appeal-site/agricultural-holdings-tenant');
    } else {
      res.redirect(base+'full/appeal-site/site-visible');
    }
  })

  router.post(base+'full/appeal-site/agricultural-holdings-tenant', function (req, res) {
    if (req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings-tenant"] == "Yes"){
      res.redirect(base+'full/appeal-site/agricultural-holdings-other-tenants');
    } else {
      res.redirect(base+'full/appeal-site/agricultural-holdings-tell-tenants');
    }
  })

  router.post(base+'full/appeal-site/agricultural-holdings-other-tenants', function (req, res) {
    if (req.session.data["appealsub-"+v+"-appealsite-agriculturalholdings-othertenants"] == "Yes"){
      res.redirect(base+'full/appeal-site/agricultural-holdings-tell-tenants');
    } else {
      res.redirect(base+'full/appeal-site/site-visible');
    }
  })

  router.post(base+'full/appeal-site/agricultural-holdings-tell-tenants', function (req, res) {
    res.redirect(base+'full/appeal-site/site-visible');
  })

  router.post(base+'full/appeal-site/site-visible', function (req, res) {
    res.redirect(base+'full/appeal-site/health-safety');
  })

  router.post(base+'full/appeal-site/health-safety', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-appealsite"] = "Complete";
    res.redirect(base+'full/task-list');
  })


/**************************************
 *** PLANNING APPLICATION DOCUMENTS ***
 **************************************/

  router.post(base+'full/planning-application-documents/application-number', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "In progress";
    res.redirect(base+'full/planning-application-documents/application-upload');
  })

  router.post(base+'full/planning-application-documents/application-upload', function (req, res) {

    // Don't overwrite previously uploaded files with a blank upload
    if (req.session.data["appealsub-"+v+"-aboutapplication-applicationform"] == "") {
      if (req.session.data["appealsub-"+v+"-aboutapplication-applicationform-existing"] != "") {
        req.session.data["appealsub-"+v+"-aboutapplication-applicationform"] = req.session.data["appealsub-"+v+"-aboutapplication-applicationform-existing"]
      }
    } else {
      req.session.data["appealsub-"+v+"-aboutapplication-applicationform-existing"] = req.session.data["appealsub-"+v+"-aboutapplication-applicationform"]
    }

    res.redirect(base+'full/planning-application-documents/plans-drawings-upload');
  })

  router.post(base+'full/planning-application-documents/plans-drawings-upload', function (req, res) {

    // Don't overwrite previously uploaded files with a blank upload
    if (req.session.data["appealsub-"+v+"-aboutapplication-plansdrawings"] == "") {
      if (req.session.data["appealsub-"+v+"-aboutapplication-plansdrawings-existing"] != "") {
        req.session.data["appealsub-"+v+"-aboutapplication-plansdrawings"] = req.session.data["appealsub-"+v+"-aboutapplication-plansdrawings-existing"]
      }
    } else {
      req.session.data["appealsub-"+v+"-aboutapplication-plansdrawings-existing"] = req.session.data["appealsub-"+v+"-aboutapplication-plansdrawings"]
    }

    res.redirect(base+'full/planning-application-documents/design-access-statement');
  })

  router.post(base+'full/planning-application-documents/design-access-statement', function (req, res) {
    if (req.session.data["appealsub-"+v+"-aboutapplication-designaccess"] == "Yes"){
      res.redirect(base+'full/planning-application-documents/design-access-statement-upload');
    } else {
      if (req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] == "I have not received a decision"){
        req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "Complete";
        res.redirect(base+'full/task-list');
      } else {
        res.redirect(base+'full/planning-application-documents/decision-letter');
      }
    }
  })

  router.post(base+'full/planning-application-documents/design-access-statement-upload', function (req, res) {

    // Don't overwrite previously uploaded files with a blank upload
    if (req.session.data["appealsub-"+v+"-aboutapplication-designaccess-file"] == "") {
      if (req.session.data["appealsub-"+v+"-aboutapplication-designaccess-file-existing"] != "") {
        req.session.data["appealsub-"+v+"-aboutapplication-designaccess-file"] = req.session.data["appealsub-"+v+"-aboutapplication-designaccess-file-existing"]
      }
    } else {
      req.session.data["appealsub-"+v+"-aboutapplication-designaccess-file-existing"] = req.session.data["appealsub-"+v+"-aboutapplication-designaccess-file"]
    }

    if (req.session.data["appealsub-"+v+"-beforeyoustart-permissiongrantedrefused"] == "I have not received a decision"){
      req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "Complete";
      res.redirect(base+'full/task-list');
    } else {
      res.redirect(base+'full/planning-application-documents/decision-letter');
    }
  })

  router.post(base+'full/planning-application-documents/decision-letter', function (req, res) {

    // Don't overwrite previously uploaded files with a blank upload
    if (req.session.data["appealsub-"+v+"-aboutapplication-decisionletter"] == "") {
      if (req.session.data["appealsub-"+v+"-aboutapplication-decisionletter-existing"] != "") {
        req.session.data["appealsub-"+v+"-aboutapplication-decisionletter"] = req.session.data["appealsub-"+v+"-aboutapplication-decisionletter-existing"]
      }
    } else {
      req.session.data["appealsub-"+v+"-aboutapplication-decisionletter-existing"] = req.session.data["appealsub-"+v+"-aboutapplication-decisionletter"]
    }

    req.session.data["appealsub-"+v+"-taskliststatus-planningapplicationdocuments"] = "Complete";
    res.redirect(base+'full/task-list');
  })


/****************************************
 *** Upload documents for your appeal ***
 ****************************************/

  router.post(base+'full/appeal-documents/appeal-statement', function (req, res) {

    // Don't overwrite previously uploaded files with a blank upload
    if (req.session.data["appealsub-"+v+"-appealdocuments-appealstatement"] == "") {
      if (req.session.data["appealsub-"+v+"-appealdocuments-appealstatement-existing"] != "") {
        req.session.data["appealsub-"+v+"-appealdocuments-appealstatement"] = req.session.data["appealsub-"+v+"-appealdocuments-appealstatement-existing"]
      }
    } else {
      req.session.data["appealsub-"+v+"-appealdocuments-appealstatement-existing"] = req.session.data["appealsub-"+v+"-appealdocuments-appealstatement"]
    }

    req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "In progress";
    res.redirect(base+'full/appeal-documents/plans-drawings');
  })

  router.post(base+'full/appeal-documents/plans-drawings', function (req, res) {
    if (req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings"] == "Yes"){
      res.redirect(base+'full/appeal-documents/plans-drawings-upload');
    } else {
      res.redirect(base+'full/appeal-documents/supporting-documents');
    }
  })

  router.post(base+'full/appeal-documents/plans-drawings-upload', function (req, res) {

    // Don't overwrite previously uploaded files with a blank upload
    if (req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings-files"] == "") {
      if (req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings-files-existing"] != "") {
        req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings-files"] = req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings-files-existing"]
      }
    } else {
      req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings-files-existing"] = req.session.data["appealsub-"+v+"-appealdocuments-plansdrawings-files"]
    }

    res.redirect(base+'full/appeal-documents/supporting-documents');
  })

  router.post(base+'full/appeal-documents/supporting-documents', function (req, res) {
    if (req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments"] == "Yes"){
      res.redirect(base+'full/appeal-documents/supporting-documents-upload');
    } else {
      req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "Complete";
      res.redirect(base+'full/task-list');
    }
  })

  router.post(base+'full/appeal-documents/supporting-documents-upload', function (req, res) {

    // Don't overwrite previously uploaded files with a blank upload
    if (req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments-files"] == "") {
      if (req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments-files-existing"] != "") {
        req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments-files"] = req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments-files-existing"]
      }
    } else {
      req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments-files-existing"] = req.session.data["appealsub-"+v+"-appealdocuments-supportingdocuments-files"]
    }

    req.session.data["appealsub-"+v+"-taskliststatus-appealdocuments"] = "Complete";
    res.redirect(base+'full/task-list');
  })


/**********************************************
 *** Upload an application for appeal costs ***
 **********************************************/

  router.post(base+'full/claiming-costs', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-claimingcosts"] = "Complete";
    res.redirect(base+'full/task-list');
  })


/***********************************************************
 *** Tell us how you would like us to decide your appeal ***
 ***********************************************************/

  router.post(base+'full/procedure-type/decide', function (req, res) {
    if (req.session.data['appealsub-'+v+'-proceduretype-decide'] == "Written representations") {
      req.session.data["appealsub-"+v+"-taskliststatus-proceduretype"] = "Complete";
      res.redirect(base+'full/task-list');
    } else if (req.session.data['appealsub-'+v+'-proceduretype-decide'] == "Hearing") {
      res.redirect(base+'full/procedure-type/hearing/why');
    } else if (req.session.data['appealsub-'+v+'-proceduretype-decide'] == "Inquiry") {
      res.redirect(base+'full/procedure-type/inquiry/why');
    }
  })

  router.post(base+'full/procedure-type/hearing/why', function (req, res) {
    res.redirect(base+'full/procedure-type/common-ground');
  })

  router.post(base+'full/procedure-type/inquiry/why', function (req, res) {
    res.redirect(base+'full/procedure-type/inquiry/days');
  })

  router.post(base+'full/procedure-type/inquiry/days', function (req, res) {
    res.redirect(base+'full/procedure-type/common-ground');
  })

  router.post(base+'full/procedure-type/common-ground', function (req, res) {
    req.session.data["appealsub-"+v+"-taskliststatus-proceduretype"] = "Complete";
    res.redirect(base+'full/task-list');
  })

}
