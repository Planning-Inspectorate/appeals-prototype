module.exports = function (router) {

  var v = "v10";
  var base = "/before-you-start/"+v+"/";


/******************
 *** SKIP LINKS ***
 ******************/

  router.get(base+'skip/full-bys-cya', function (req, res) {
    req.session.data["bys-"+v+"-planningdepartment"] = "BRD";
    req.session.data["bys-"+v+"-whatareyouappealing"] = "Full planning";
    req.session.data["bys-"+v+"-appealabout"] = [
      "None of these"
    ],
    req.session.data["bys-"+v+"-enforcementnotice"] = "No";
    req.session.data["bys-"+v+"-permissiongrantedrefused"] = "Refused";
    req.session.data["bys-"+v+"-decisiondate-day"] = "10";
    req.session.data["bys-"+v+"-decisiondate-month"] = "10";
    req.session.data["bys-"+v+"-decisiondate-year"] = "2021";
    req.session.data["bys-"+v+"-deadline-day"] = 10,
    req.session.data["bys-"+v+"-deadline-month"] = 4,
    req.session.data["bys-"+v+"-deadline-year"] = 2022,
    req.session.data["bys-"+v+"-claimingcosts"] = "No";
    req.session.data["bys-"+v+"-appealprocedure"] = "Written representations";
    req.session.data["bys-"+v+"-route"] = "full";
    res.redirect(base+'check-answers');
  })


/************************
 *** BEFORE YOU START ***
 ************************/

  /*
   * Routing updated and based on the logic in this Miro board frame:
   * https://miro.com/app/board/o9J_lv1IHjc=/?moveToWidget=3458764517979316217&cot=14
   * 
   * Jira ticket: https://pins-ds.atlassian.net/browse/AS-4484
   */

  // Question 1
    router.post(base+'planning-department', function (req, res) {
      if (
        // Check if selected LPA key aligns to allowed LPA in local-authority-eng.json
        // Current LPAs:
        //  - BRD (City of Bradford Metropolitan District Council)
        //  - HIL (London Borough of Hillingdon)
        //  - HAG (Harrogate Borough Council)
        req.session.data["bys-"+v+"-planningdepartment"] == "BRD" ||
        req.session.data["bys-"+v+"-planningdepartment"] == "HIL" ||
        req.session.data["bys-"+v+"-planningdepartment"] == "HAG"
      ){
        res.redirect(base+'what-are-you-appealing');
      } else {
        res.redirect(base+'shutter/lpa-ineligible');
      }
    })

  router.post(base+'what-are-you-appealing', function (req, res) {
    if (req.session.data["bys-"+v+"-whatareyouappealing"] == "I have not made a planning application") {
      res.redirect(base+'shutter/planning-application-not-made');
    } else if (req.session.data["bys-"+v+"-whatareyouappealing"] == "Something else") {
      res.redirect(base+'shutter/planning-application-something-else');
    } else if (req.session.data["bys-"+v+"-whatareyouappealing"] == "Householder planning") {
      res.redirect(base+'listed-building');
    } else if (req.session.data["bys-"+v+"-whatareyouappealing"] == "Prior approval") {
      res.redirect(base+'prior-approval');
    } else if (req.session.data["bys-"+v+"-whatareyouappealing"] == "Removal or variation of conditions") {
      res.redirect(base+'removal-variation-conditions');
    } else {
      res.redirect(base+'appeal-about');        
    }
  })

  router.post(base+'prior-approval', function (req, res) {
    if (req.session.data["bys-"+v+"-priorapproval"] == "No"){
      // full appeal
      res.redirect(base+'appeal-about');
    } else if (req.session.data["bys-"+v+"-priorapproval"] == "Yes"){
      // expedited written representations
      res.redirect(base+'listed-building');
    }
  })
  router.post(base+'removal-variation-conditions', function (req, res) {
    if (req.session.data["bys-"+v+"-removalvariationconditions"] == "No"){
      // full appeal
      res.redirect(base+'appeal-about');
    } else if (req.session.data["bys-"+v+"-removalvariationconditions"] == "Yes"){
      // expedited written representations
      res.redirect(base+'listed-building');
    }
  })

  router.post(base+'listed-building', function (req, res) {
    if (req.session.data["bys-"+v+"-listedbuilding"] == "No"){
      res.redirect(base+'permission-granted-refused');
    } else {
      res.redirect(base+'shutter/listed-building');
    }
  })

  router.post(base+'appeal-about', function (req, res) {
    if (req.session.data["bys-"+v+"-appealabout"].includes("None of these") ){
      res.redirect(base+'permission-granted-refused');
    } else {
      res.redirect(base+'shutter/appeal-about');
    }
  })

  router.post(base+'permission-granted-refused', function (req, res) {
    if (req.session.data["bys-"+v+"-permissiongrantedrefused"] == "I have not received a decision"){
      res.redirect(base+'decision-date-due');
    } else {
      res.redirect(base+'notice-decision-date');
    }
  })

  router.post(base+'notice-decision-date', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['bys-'+v+'-decisiondate-day'];
    var enteredMonth = req.session.data['bys-'+v+'-decisiondate-month'];
    var enteredYear = req.session.data['bys-'+v+'-decisiondate-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 

    // calculate deadline for appeal based on decision due date
    var deadlineDate = new Date(enteredDate);
    if (
      (req.session.data['bys-'+v+'-whatareyouappealing'] == "Full planning") ||
      (
        (req.session.data['bys-'+v+'-whatareyouappealing'] == "Householder planning") &&
        (req.session.data['bys-'+v+'-permissiongrantedrefused'] == "Granted")
      )
    ){
      // 6 months = 26 weeks for full appeals
      deadlineDate.setDate(deadlineDate.getDate() + (26*7));
    } else {
      // 12 weeks for the HAS appeals
      deadlineDate.setDate(deadlineDate.getDate() + (12*7));
    }

    req.session.data["bys-"+v+"-deadline-day"] = deadlineDate.getDate();
    req.session.data["bys-"+v+"-deadline-month"] = deadlineDate.getMonth() + 1;
    req.session.data["bys-"+v+"-deadline-year"] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      if (req.session.data['bys-'+v+'-whatareyouappealing'] == "Full planning"){
        res.redirect(base+'shutter/out-of-time-full')
      } else if (
        req.session.data['bys-'+v+'-whatareyouappealing'] == "Householder planning" &&
        req.session.data['bys-'+v+'-permissiongrantedrefused'] == "Granted"
      ) {
        res.redirect(base+'shutter/out-of-time-full')
      } else {
        res.redirect(base+'shutter/out-of-time-householder')
      }
    } else {
      res.redirect(base+'enforcement-notice');
    }
  })


  router.post(base+'decision-date-due', function (req, res) {

    // get decision due date from user
    var enteredDay = req.session.data['bys-'+v+'-decisiondatedue-day'];
    var enteredMonth = req.session.data['bys-'+v+'-decisiondatedue-month'];
    var enteredYear = req.session.data['bys-'+v+'-decisiondatedue-year'];
    var enteredDate = new Date(enteredYear, enteredMonth - 1, enteredDay); 

    // calculate deadline for appeal based on decision due date
    // 6 months = 26 weeks for the prototype
    var deadlineDate = new Date(enteredDate);
    deadlineDate.setDate(deadlineDate.getDate() + (26*7));

    req.session.data['bys-'+v+'-deadline-day'] = deadlineDate.getDate();
    req.session.data['bys-'+v+'-deadline-month'] = deadlineDate.getMonth() + 1;
    req.session.data['bys-'+v+'-deadline-year'] = deadlineDate.getFullYear();

    var todaysDate = new Date();

    if (todaysDate > deadlineDate) {
      res.redirect(base+'shutter/out-of-time-no-decision')
    } else {
      res.redirect(base+'enforcement-notice')
    }
  })

  router.post(base+'enforcement-notice', function (req, res) {
    if (req.session.data["bys-"+v+"-enforcementnotice"] == "No"){
      if ((req.session.data['bys-'+v+'-whatareyouappealing'] == "Householder planning") && (req.session.data['bys-'+v+'-permissiongrantedrefused'] == "Refused")) {
        req.session.data['bys-'+v+'-route'] = "householder"
        res.redirect(base+'claiming-costs');
      } else {
        req.session.data['bys-'+v+'-route'] = "full"
        res.redirect(base+'check-answers');
      }
    } else {
      res.redirect(base+'shutter/enforcement-notice');
    }
  })

  router.post(base+'claiming-costs', function (req, res) {
    if (req.session.data["bys-"+v+"-claimingcosts"] == "No"){
      res.redirect(base+'check-answers');
    } else {
      res.redirect(base+'shutter/claiming-costs');
    }
  })


}