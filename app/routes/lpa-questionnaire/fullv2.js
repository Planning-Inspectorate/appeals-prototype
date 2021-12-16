module.exports = function (router) {

  var v = "fullv2";
  var base = "/lpa-questionnaire/"+v+"/";
    
  var months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May',
    'Jun', 'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
    ];
  function monthNumToName(monthnum) {
    return months[monthnum - 1] || '';
  }
  var fullmonths = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];
  function monthNumToFullName(monthnum) {
    return fullmonths[monthnum - 1] || '';
  }

  // Skip link to simplest completed questionnaire
  /*  router.get(base+'skip/simplest-cya', function (req, res) {
   
      req.session.data["lpaq-"+v+"-proposeddevelopment-siteplan"] = "site_plan.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-proposeddevelopment"] = "Complete";
      req.session.data["lpaq-"+v+"-proposeddevelopment-listedbuilding"] = "No";
      req.session.data["lpaq-"+v+"-proposeddevelopment-traveller"] = "No";
      req.session.data["lpaq-"+v+"-proposeddevelopment-rightofway"] = "No";
      req.session.data["lpaq-"+v+"-proposeddevelopment-tpo"] = "No";
      req.session.data["lpaq-"+v+"-surroundingarea-appealsimmediatearea"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-surroundingarea"] = "Complete";
      req.session.data["lpaq-"+v+"-surroundingarea-greenbelt"] = "No";
      req.session.data["lpaq-"+v+"-surroundingarea-conservationarea"] = "No, it is not in or near a conservation area";
      req.session.data["lpaq-"+v+"-surroundingarea-aonb"] = "No";
      req.session.data["lpaq-"+v+"-surroundingarea-designatedsite"] = "No";
      req.session.data["lpaq-"+v+"-surroundingarea-affectslistedbuilding"] = "No";
      req.session.data["lpaq-"+v+"-surroundingarea-ancientmonument"] = "No";
      req.session.data["lpaq-"+v+"-surroundingarea-protectedspecies"] = "No";
      req.session.data["lpaq-"+v+"-environmentalimpact-schedule"] = "It is neither a schedule 1 or schedule 2 development";
      req.session.data["lpaq-"+v+"-environmentalimpact-screeningopinion"] = "No";
      req.session.data["lpaq-"+v+"-environmentalimpact-environmentalstatement"] = "No";
      req.session.data["lpaq-"+v+"-environmentalimpact-notificationsconsultations"] = "Yes";
      req.session.data["lpaq-"+v+"-taskliststatus-environmentalimpact"] = "Complete";
      req.session.data["lpaq-"+v+"-yourdetails-planningofficersreport"] = "planning_officers_report.pdf";
      req.session.data["lpaq-"+v+"-yourdetails-decisionnotice"] = "decision_letter.pdf";
      req.session.data["lpaq-"+v+"-yourdetails-plansdocumentsdrawings"] = "plans_drawings_documents.pdf";
      req.session.data["lpaq-"+v+"-yourdetails-extraconditions-details"] = "";
      req.session.data["lpaq-"+v+"-yourdetails-extraconditions"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-yourdecision"] = "Complete";
      req.session.data["lpaq-"+v+"-notifiedpeople-publiciseapplication"] = "No";
      req.session.data["lpaq-"+v+"-notifiedpeople-tellapplication"] = "No";
      req.session.data["lpaq-"+v+"-notifiedpeople-toldappeal"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-notifiedpeople"] = "Complete";
      req.session.data["lpaq-"+v+"-representations-whichparties"] = [
        "We did not receive representation from any parties"
      ],
      req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
      req.session.data["lpaq-"+v+"-relevantpolicies-statutorydevelopment"] = "statutory_development_plan.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-neighbourhoodplan"] = "No";
      req.session.data["lpaq-"+v+"-relevantpolicies-other"] = "other_relevant.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary"] = "supplementary_planning_2.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-name"] = null;
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted"] = null;
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted-date-day"] = null;
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted-date-month"] = null;
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted-date-year"] = null;
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted-stage"] = null;
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-file"] = null;
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-files"] = [
        {
          "name": "Supplementary planning document one",
          "adopted": "yes",
          "adopted_day": "01",
          "adopted_month": "February",
          "adopted_year": "2003",
          "adopted_stage": ""
        },
        {
          "name": "Supplementary planning document two",
          "file": null,
          "adopted": "no",
          "adopted_day": "",
          "adopted_month": "",
          "adopted_year": "",
          "adopted_stage": "Final draft"
        }
      ],
      req.session.data["lpaq-"+v+"-optionalsupportingdocs-supplementary"] = "uploaded";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-relevantpolicies"] = "Complete";
      req.session.data["lpaq-"+v+"-siteaccess-publicland"] = "Yes";
      req.session.data["lpaq-"+v+"-siteaccess-entersite-details"] = "";
      req.session.data["lpaq-"+v+"-siteaccess-entersite"] = "No";
      req.session.data["lpaq-"+v+"-siteaccess-healthsafety-details"] = "";
      req.session.data["lpaq-"+v+"-siteaccess-healthsafety"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-siteaccess"] = "Complete";
      req.session.data["lpaq-"+v+"-proceduretype-decidedby"] = "Yes, I agree";
      req.session.data["lpaq-"+v+"-taskliststatus-proceduretype"] = "Complete"

      res.redirect(base+'task-list'); 

    })*/

    
  // Skip link to most complex completed questionnaire

    router.get(base+'skip/complex-cya', function (req, res) {
    
      req.session.data["lpaq-"+v+"-proposeddevelopment-siteplan"] = "site_plan.pdf";
      req.session.data["lpaq-"+v+"-proceduretype-decidedby"] = "Yes, we agree";
      req.session.data["lpaq-"+v+"-proceduretype-decidedby-witnesses"] = "";
      req.session.data["lpaq-"+v+"-taskliststatus-proceduretype"] = "Complete";

      req.session.data["lpaq-"+v+"-constraintsdesignations-listedbuilding"] = "Yes";
      req.session.data["lpaq-"+v+"-constraintsdesignations-listedbuildingdetails-grade"] = "Grade II";
      req.session.data["lpaq-"+v+"-constraintsdesignations-affectslistedbuilding-upload"] = [
        "listed_building_1.pdf",
        "listed_building_2.pdf"
      ],
      req.session.data["lpaq-"+v+"-constraintsdesignations-affectslistedbuilding"] = "Yes";
      req.session.data["lpaq-"+v+"-constraintsdesignations-affectslistedbuilding-grade"] = "Grade II";
      req.session.data["lpaq-"+v+"-constraintsdesignations-ancientmonument"] = "Yes";
      req.session.data["lpaq-"+v+"-constraintsdesignations-conservationarea"] = "Yes, it is in a conservation area";
      req.session.data["lpaq-"+v+"-constraintsdesignations-conservationarea-upload"] = "conservation_area_map.pdf";
      req.session.data["lpaq-"+v+"-constraintsdesignations-protectedspecies"] = "Yes";
      req.session.data["lpaq-"+v+"-constraintsdesignations-greenbelt"] = "Yes";
      req.session.data["lpaq-"+v+"-constraintsdesignations-aonb"] = "Yes";
      req.session.data["lpaq-"+v+"-constraintsdesignations-designatedsite"] = [
        "SSSI",
        "Other"
      ],
      req.session.data["lpaq-"+v+"-constraintsdesignations-designatedsite-other"] = "Test designation";

      req.session.data["lpaq-"+v+"-constraintsdesignations-tpo"] = "Yes";
      req.session.data["lpaq-"+v+"-constraintsdesignations-tpo-siteplan"] = "";
      req.session.data["lpaq-"+v+"-constraintsdesignations-traveller"] = "No";
      req.session.data["lpaq-"+v+"-constraintsdesignations-rightofway"] = "Yes";
      req.session.data["lpaq-"+v+"-constraintsdesignations-rightofway-mapstatement"] = "right_of_way.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-constraintsdesignations"] = "Complete";

      req.session.data["lpaq-"+v+"-environmentalimpact-schedule"] = "Yes";
      req.session.data["lpaq-"+v+"-environmentalimpact-schedule-type"] = "Schedule 2";
      req.session.data["lpaq-"+v+"-environmentalimpact-descriptionofdevelopment"] = "3. Energy industry";
      req.session.data["lpaq-"+v+"-environmentalimpact-sensitivearea"] = "Yes";
      req.session.data["lpaq-"+v+"-environmentalimpact-sensitivearea-details"] = "Curabitur ex velit, consectetur at tempor quis, elementum vel neque.";
      req.session.data["lpaq-"+v+"-environmentalimpact-columntwo"] = "No";
      req.session.data["lpaq-"+v+"-environmentalimpact-screeningopinion"] = "Yes";
      req.session.data["lpaq-"+v+"-environmentalimpact-screeningopinion-details"] = "screening_opinion.pdf";
      req.session.data["lpaq-"+v+"-environmentalimpact-screeningopinion-es"] = "Yes";
      req.session.data["lpaq-"+v+"-environmentalimpact-lpaenvironmentalstatement"] = "Yes, we did the environmental statement";
      req.session.data["lpaq-"+v+"-environmentalimpact-environmentalstatement"] = "environmental_statement.pdf";
      req.session.data["lpaq-"+v+"-environmentalimpact-consultationresponses"] = "consultation_responses.pdf";
      req.session.data["lpaq-"+v+"-environmentalimpact-sitenoticeadvert"] = "site_notice.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-environmentalimpact"] = "Complete";

      req.session.data["lpaq-"+v+"-notifiedpeople-notifyapplication"] = [
        "A site notice",
        "Letters to the neighbours",
        "A press advert"
      ],
      req.session.data["lpaq-"+v+"-notifiedpeople-notifyapplication-sitenotice"] = "site_notice.pdf";
      req.session.data["lpaq-"+v+"-notifiedpeople-notifyapplication-letters"] = "letters.pdf";
      req.session.data["lpaq-"+v+"-notifiedpeople-notifyapplication-pressadvert"] = "press_advert.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-notifiedpeople"] = "Complete";

      req.session.data["lpaq-"+v+"-representations-consultrelevant"] = "Yes";
      req.session.data["lpaq-"+v+"-representations-consultrelevant-whichbodies"] = "Morbi augue neque, ullamcorper elementum placerat eu, rhoncus id nisl. Integer non augue ut ligula blandit efficitur.";
      req.session.data["lpaq-"+v+"-representations-consultationresponses"] = "Yes";
      req.session.data["lpaq-"+v+"-representations-consultationresponses-upload"] = "consultation_responses.pdf";
      req.session.data["lpaq-"+v+"-representations-otherparties"] = "Yes";
      req.session.data["lpaq-"+v+"-representations-otherparties-upload"] = "other_parties.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
      
      req.session.data["lpaq-"+v+"-relevantpolicies-statutorydevelopment"] = "statutory_development_plan.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-emergingplan"] = "Yes";
      req.session.data["lpaq-"+v+"-relevantpolicies-emergingplan-upload"] = [
        "front_cover.pdf",
        "relevant_section.pdf",
        "relevant_policy.pdf",
        "summary_of_plan_status.pdf"
      ];
      req.session.data["lpaq-"+v+"-relevantpolicies-other"] = "other_relevant.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary"] = [
        "supplementary_planning_1.pdf",
        "supplementary_planning_2.pdf",
        "supplementary_planning_3.pdf"
      ],
      req.session.data["lpaq-"+v+"-relevantpolicies-cil"] = "Yes";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-upload"] = "cil.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-upload-adopted"] = "Yes";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-upload-adopteddate-day"] = "02";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-upload-adopteddate-month"] = "11";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-upload-adopteddate-year"] = "2013";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-upload-futureadopteddate-day"] = "";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-upload-futureadopteddate-month"] = "";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-upload-futureadopteddate-year"] = "";
      req.session.data["lpaq-"+v+"-taskliststatus-relevantpolicies"] = "Complete";

      req.session.data["lpaq-"+v+"-siteaccess-publicland"] = "Yes";
      req.session.data["lpaq-"+v+"-siteaccess-entersite"] = "Yes";
      req.session.data["lpaq-"+v+"-siteaccess-entersite-details"] = "Nunc accumsan nunc felis, vel tempus purus bibendum non. Cras iaculis blandit dui, quis aliquam velit posuere vel.";
      req.session.data["lpaq-"+v+"-siteaccess-healthsafety"] = "Yes";
      req.session.data["lpaq-"+v+"-siteaccess-healthsafety-details"] = "Vestibulum at viverra tortor. Aliquam erat volutpat. Sed in lacinia nisi, vitae fermentum mauris.";
      req.session.data["lpaq-"+v+"-taskliststatus-siteaccess"] = "Complete";

      req.session.data["lpaq-"+v+"-additionalinfo-nearbyappeals"] = "Yes";
      req.session.data["lpaq-"+v+"-additionalinfo-nearbyappeals-references"] = "654321, 987132";
      req.session.data["lpaq-"+v+"-additionalinfo-statementofcase"] = "Yes";
      req.session.data["lpaq-"+v+"-additionalinfo-extraconditions"] = "Yes";
      req.session.data["lpaq-"+v+"-additionalinfo-extraconditions-details"] = "Nulla facilisi. Pellentesque id aliquam ex, nec placerat mauris. Fusce lacus nulla, ultricies sed arcu quis, rutrum feugiat diam. Aliquam fringilla vestibulum massa sed;sollicitudin. Morbi cursus urna metus, in convallis felis condimentum efficitur.",
      req.session.data["lpaq-"+v+"-taskliststatus-additionalinfo"] = "Complete";

      res.redirect(base+'task-list'); 

    })


  // Security
  
    router.post(base+'security/email', function (req, res) {
      res.redirect(base+'security/sent');
    })
  
    router.post(base+'security/email-link-expired', function (req, res) {
      res.redirect(base+'security/sent');
    })


  // Review the procedure type

    router.post(base+'procedure-type/decided-by', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-proceduretype"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Tell us about constraints, designations and other issues

    router.post(base+'constraints-designations/involves-listed-building', function (req, res) {
      if (req.session.data['lpaq-'+v+'-constraintsdesignations-listedbuilding'] == "Yes"){
        res.redirect(base+'constraints-designations/involves-listed-building-details');
      } else {
        res.redirect(base+'constraints-designations/affects-listed-building'); 
      }
    })

    router.post(base+'constraints-designations/involves-listed-building-details', function (req, res) {
      res.redirect(base+'constraints-designations/affects-listed-building');
    })

    router.post(base+'constraints-designations/affects-listed-building', function (req, res) {
      if (req.session.data['lpaq-'+v+'-constraintsdesignations-affectslistedbuilding'] == "Yes"){
        res.redirect(base+'constraints-designations/affects-listed-building-details');
      } else {
        res.redirect(base+'constraints-designations/ancient-monument');
      }
    })

    router.post(base+'constraints-designations/affects-listed-building-details', function (req, res) {
      res.redirect(base+'constraints-designations/ancient-monument');
    })

    router.post(base+'constraints-designations/ancient-monument', function (req, res) {
      res.redirect(base+'constraints-designations/conservation-area');
    })

    router.post(base+'constraints-designations/conservation-area', function (req, res) {
      if (req.session.data['lpaq-'+v+'-constraintsdesignations-conservationarea'] != "No, it is not in or next to a conservation area"){
        res.redirect(base+'constraints-designations/conservation-area-upload'); 
      } else {
        res.redirect(base+'constraints-designations/protected-species'); 
      }
    })

    router.post(base+'constraints-designations/conservation-area-upload', function (req, res) {
      res.redirect(base+'constraints-designations/protected-species'); 
    })

    router.post(base+'constraints-designations/protected-species', function (req, res) {
      res.redirect(base+'constraints-designations/green-belt');
    })

    router.post(base+'constraints-designations/green-belt', function (req, res) {
      res.redirect(base+'constraints-designations/aonb'); 
    })

    router.post(base+'constraints-designations/aonb', function (req, res) {
      res.redirect(base+'constraints-designations/designated-site'); 
    })

    router.post(base+'constraints-designations/designated-site', function (req, res) {
      res.redirect(base+'constraints-designations/tpo'); 
    })

    router.post(base+'constraints-designations/tpo', function (req, res) {
      if (req.session.data['lpaq-'+v+'-constraintsdesignations-tpo'] == "Yes"){
        res.redirect(base+'constraints-designations/tpo-details');
      } else {
        res.redirect(base+'constraints-designations/traveller');
      }
    })

    router.post(base+'constraints-designations/tpo-details', function (req, res) {
      res.redirect(base+'constraints-designations/traveller');
    })

    router.post(base+'constraints-designations/traveller', function (req, res) {
      res.redirect(base+'constraints-designations/rightofway');
    })

    router.post(base+'constraints-designations/rightofway', function (req, res) {
      if (req.session.data['lpaq-'+v+'-constraintsdesignations-rightofway'] == "Yes"){
        res.redirect(base+'constraints-designations/rightofway-details');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-constraintsdesignations"] = "Complete";
        res.redirect(base+'task-list'); 
      }
    })

    router.post(base+'constraints-designations/rightofway-details', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-constraintsdesignations"] = "Complete";
      res.redirect(base+'task-list'); 
    })


  // Tell us about the environmental impact

    router.post(base+'environmental-impact/schedule', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-schedule'] == "No"){
        res.redirect(base+'environmental-impact/screening-opinion');
      } else {
        if (req.session.data['lpaq-'+v+'-environmentalimpact-schedule-type'] == "Schedule 1"){
          res.redirect(base+'environmental-impact/lpa-environmental-statement');
        } else {
          res.redirect(base+'environmental-impact/description-of-development');
        }
      }
    })

    router.post(base+'environmental-impact/description-of-development', function (req, res) {
      res.redirect(base+'environmental-impact/sensitive-area');
    })

    router.post(base+'environmental-impact/sensitive-area', function (req, res) {
      res.redirect(base+'environmental-impact/column-two');
    })

    router.post(base+'environmental-impact/column-two', function (req, res) {
      res.redirect(base+'environmental-impact/screening-opinion');
    })

    router.post(base+'environmental-impact/screening-opinion', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-screeningopinion'] == "Yes"){
        res.redirect(base+'environmental-impact/screening-opinion-upload');
      } else {
        res.redirect(base+'environmental-impact/applicant-environmental-statement');
      }
    })

    router.post(base+'environmental-impact/screening-opinion-upload', function (req, res) {
      res.redirect(base+'environmental-impact/screening-opinion-es');
    })

    router.post(base+'environmental-impact/screening-opinion-es', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-screeningopinion-es'] == "No"){
        res.redirect(base+'environmental-impact/applicant-environmental-statement');
      } else {
        res.redirect(base+'environmental-impact/lpa-environmental-statement');
      }
    })

    router.post(base+'environmental-impact/applicant-environmental-statement', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-applicantenvironmentalstatement'] == "Yes"){
        res.redirect(base+'environmental-impact/consultation-responses');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-environmentalimpact"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'environmental-impact/lpa-environmental-statement', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-lpaenvironmentalstatement'] == "Yes, we did the environmental statement"){
        res.redirect(base+'environmental-impact/environmental-statement');
      } else {
        res.redirect(base+'environmental-impact/screening-direction');
      }
    })

    router.post(base+'environmental-impact/environmental-statement', function (req, res) {
      res.redirect(base+'environmental-impact/consultation-responses');
    })

    router.post(base+'environmental-impact/consultation-responses', function (req, res) {
      res.redirect(base+'environmental-impact/site-notice-advert');
    })

    router.post(base+'environmental-impact/site-notice-advert', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-environmentalimpact"] = "Complete";
      res.redirect(base+'task-list'); 
    })

    router.post(base+'environmental-impact/screening-direction', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-environmentalimpact"] = "Complete";
      res.redirect(base+'task-list'); 
    })


  // Tell us how you've informed interested parties 

    router.post(base+'notified-people/notify-application', function (req, res) {
      if (req.session.data['lpaq-'+v+'-notifiedpeople-notifyapplication'].includes("A site notice")){
        res.redirect(base+'notified-people/notify-application-sitenotice');
      } else if (req.session.data['lpaq-'+v+'-notifiedpeople-notifyapplication'].includes("Letters to the neighbours")){
          res.redirect(base+'notified-people/notify-application-letters');
      } else if (req.session.data['lpaq-'+v+'-notifiedpeople-notifyapplication'].includes("A press advert")){
          res.redirect(base+'notified-people/notify-application-pressadvert');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-notifiedpeople"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'notified-people/notify-application-sitenotice', function (req, res) {
      if (req.session.data['lpaq-'+v+'-notifiedpeople-notifyapplication'].includes("Letters to the neighbours")){
        res.redirect(base+'notified-people/notify-application-letters');
      } else if (req.session.data['lpaq-'+v+'-notifiedpeople-notifyapplication'].includes("A press advert")){
        res.redirect(base+'notified-people/notify-application-pressadvert');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-notifiedpeople"] = "Complete";
        res.redirect(base+'task-list');
      } 
    })

    router.post(base+'notified-people/notify-application-letters', function (req, res) {
      if (req.session.data['lpaq-'+v+'-notifiedpeople-notifyapplication'].includes("A press advert")){
        res.redirect(base+'notified-people/notify-application-pressadvert');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-notifiedpeople"] = "Complete";
        res.redirect(base+'task-list');
      } 
    })

    router.post(base+'notified-people/notify-application-pressadvert', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-notifiedpeople"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Upload representations from interest parties
  
    router.post(base+'representations/consult-relevant-consultees', function (req, res) {
      res.redirect(base+'representations/consultation-responses');
    })

    router.post(base+'representations/consultation-responses', function (req, res) {
      if (req.session.data["lpaq-"+v+"-representations-consultationresponses"] == "Yes"){
        res.redirect(base+'representations/consultation-responses-upload');
      } else  {
        res.redirect(base+'representations/other-parties');
      }
    })

    router.post(base+'representations/consultation-responses-upload', function (req, res) {
      res.redirect(base+'representations/other-parties');
    })

    router.post(base+'representations/other-parties', function (req, res) {
      if (req.session.data["lpaq-"+v+"-representations-otherparties"] == "Yes"){
        res.redirect(base+'representations/other-parties-upload');
      } else  {
        req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'representations/other-parties-upload', function (req, res) {
      res.redirect(base+'representations/letter-upload');
    })

    router.post(base+'representations/letter-upload', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Upload the Planning Officer's report and relevant policies

    router.post(base+'relevant-policies/planning-officers-report', function (req, res) {
      res.redirect(base+'relevant-policies/statutory-development');
    })

    router.post(base+'relevant-policies/statutory-development', function (req, res) {
      res.redirect(base+'relevant-policies/emerging-plan');
    })

    router.post(base+'relevant-policies/emerging-plan', function (req, res) {
      if (req.session.data["lpaq-"+v+"-relevantpolicies-emergingplan"] == "Yes"){
        res.redirect(base+'relevant-policies/emerging-plan-upload');
      } else {
        res.redirect(base+'relevant-policies/other');
      }
    })

    router.post(base+'relevant-policies/emerging-plan-upload', function (req, res) {
      res.redirect(base+'relevant-policies/other');
    })

    router.post(base+'relevant-policies/other', function (req, res) {
      res.redirect(base+'relevant-policies/supplementary');
    })

    router.post(base+'relevant-policies/supplementary', function (req, res) {
      if (req.session.data["lpaq-"+v+"-relevantpolicies-supplementary"] == "Yes"){
        res.redirect(base+'relevant-policies/supplementary-upload');
      } else  {
        res.redirect(base+'relevant-policies/cil');
      }
    })

    router.post(base+'relevant-policies/supplementary-upload', function (req, res) {
      res.redirect(base+'relevant-policies/cil');
    })

    router.post(base+'relevant-policies/cil', function (req, res) {
      if (req.session.data['lpaq-'+v+'-relevantpolicies-cil'] == "Yes"){
        res.redirect(base+'relevant-policies/cil-details');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-relevantpolicies"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'relevant-policies/cil-details', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-relevantpolicies"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Tell us about access to the appeal site

    router.post(base+'site-access/public-land', function (req, res) {
      res.redirect(base+'site-access/enter-site');
    })

    router.post(base+'site-access/enter-site', function (req, res) {
      res.redirect(base+'site-access/health-safety');
    })

    router.post(base+'site-access/health-safety', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-siteaccess"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Provide additional information for the inspector

    router.post(base+'additional-info/nearby-appeals', function (req, res) {
      res.redirect(base+'additional-info/statement-of-case');
    })

    router.post(base+'additional-info/statement-of-case', function (req, res) {
      if (req.session.data['lpaq-'+v+'-additionalinfo-statementofcase'] == "Yes"){
        res.redirect(base+'additional-info/extra-conditions');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-additionalinfo"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'additional-info/extra-conditions', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-additionalinfo"] = "Complete";
      res.redirect(base+'task-list');
    })

    
} 