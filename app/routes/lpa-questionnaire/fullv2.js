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
      req.session.data["lpaq-"+v+"-surroundingarea-sssi"] = "No";
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








/*****************************
 * New set of data for v2 skip to CYA
 * 
 * "lpaq-fullv2-proceduretype-decidedby": "Yes, we agree",
    "lpaq-fullv2-proceduretype-decidedby-witnesses": "",
    "lpaq-fullv2-taskliststatus-proceduretype": "Complete",
    "lpaq-fullv2-constraintsdesignations-listedbuilding": "Yes",
    "lpaq-fullv2-constraintsdesignations-listedbuildingdetails-grade": "Grade II",
    "lpaq-": [
      "blank.pdf",
      "other_relevant.pdf"
    ],
    "lpaq-fullv2-constraintsdesignations-affectslistedbuilding": "Yes",
    "lpaq-fullv2-constraintsdesignations-affectslistedbuilding-grade": "Grade II",
    "lpaq-fullv2-constraintsdesignations-ancientmonument": "Yes",
    "lpaq-fullv2-surroundingarea-conservationarea": "Yes, it is in a conservation area",
    "lpaq-fullv2-surroundingarea-conservationarea-upload": "conservation_area_map.pdf",
    "lpaq-fullv2-surroundingarea-protectedspecies": "Yes",
    "lpaq-fullv2-surroundingarea-greenbelt": "Yes",
    "lpaq-fullv2-surroundingarea-aonb": "Yes",
    "lpaq-fullv2-surroundingarea-sssi": [
      "SSSI",
      "Other"
    ],
    "lpaq-fullv2-surroundingarea-sssi-other": "Test designation",
    "lpaq-fullv2-constraintsdesignations-tpo": "Yes",
    "lpaq-fullv2-constraintsdesignations-tpo-siteplan": "",
    "lpaq-fullv2-constraintsdesignations-traveller": "No",
    "lpaq-fullv2-constraintsdesignations-rightofway": "Yes",
    "lpaq-fullv2-constraintsdesignations-rightofway-mapstatement": "blank.pdf",
    "lpaq-fullv2-taskliststatus-constraintsdesignations": "Complete",
    "lpaq-fullv2-environmentalimpact-schedule": "Schedule 2",
    "lpaq-fullv2-environmentalimpact-scheduletwo": "7. Food industry",
    "lpaq-fullv2-environmentalimpact-scheduletwo-sensitive": "Yes",
    "lpaq-fullv2-environmentalimpact-scheduletwo-sensitive-details": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse imperdiet sodales hendrerit. Duis sit amet gravida leo. Fusce suscipit dolor viverra erat iaculis dignissim.",
    "lpaq-fullv2-environmentalimpact-scheduletwo-criteria": "No",
    "lpaq-fullv2-environmentalimpact-screeningopinion": "Yes",
    "lpaq-fullv2-environmentalimpact-screeningopinion-details": "blank.pdf",
    "lpaq-fullv2-environmentalimpact-screeningopinion-eia": "Yes",
    "lpaq-fullv2-environmentalimpact-environmentalstatement": "Yes",
    "lpaq-fullv2-environmentalimpact-environmentalstatement-details": "blank.pdf",
    "lpaq-fullv2-environmentalimpact-environmentalstatement-sitenotice": "advert_notice_of_appeal.pdf",
    "lpaq-fullv2-environmentalimpact-notificationsconsultations": "No",
    "lpaq-fullv2-taskliststatus-environmentalimpact": "Complete",
    "lpaq-fullv2-notifiedpeople-notifyapplication": [
      "A site notice",
      "Letters to the neighbours",
      "A press advert"
    ],
    "lpaq-fullv2-notifiedpeople-notifyapplication-sitenotice": "blank.pdf",
    "lpaq-fullv2-notifiedpeople-notifyapplication-letters": "blank.pdf",
    "lpaq-fullv2-notifiedpeople-notifyapplication-pressadvert": "blank.pdf",
    "lpaq-fullv2-taskliststatus-notifiedpeople": "Complete",
    "lpaq-fullv2-representations-consultrelevant": "Yes",
    "lpaq-fullv2-representations-consultrelevant-whichbodies": "Morbi augue neque, ullamcorper elementum placerat eu, rhoncus id nisl. Integer non augue ut ligula blandit efficitur.",
    "lpaq-fullv2-representations-consultationresponses": "Yes",
    "lpaq-fullv2-representations-consultationresponses-upload": "blank.pdf",
    "lpaq-fullv2-representations-otherparties": "Yes",
    "lpaq-fullv2-representations-otherparties-upload": "blank.pdf",
    "lpaq-fullv2-taskliststatus-representations": "Complete",
    "lpaq-fullv2-yourdecision-planningofficersreport": "planning_officers_report.pdf",
    "lpaq-fullv2-relevantpolicies-statutorydevelopment": "statutory_development_plan.pdf",
    "lpaq-fullv2-relevantpolicies-developmentplan": "Yes",
    "lpaq-fullv2-relevantpolicies-other": "other_relevant.pdf",
    "lpaq-fullv2-relevantpolicies-supplementary": [
      "supplementary_planning_1.pdf",
      "supplementary_planning_2.pdf",
      "supplementary_planning_3.pdf"
    ],
    "lpaq-fullv2-relevantpolicies-cil": "Yes",
    "lpaq-fullv2-relevantpolicies-cil-upload": "blank.pdf",
    "lpaq-fullv2-relevantpolicies-cil-upload-adopted": "Yes",
    "lpaq-fullv2-relevantpolicies-cil-upload-adopteddate-day": "02",
    "lpaq-fullv2-relevantpolicies-cil-upload-adopteddate-month": "11",
    "lpaq-fullv2-relevantpolicies-cil-upload-adopteddate-year": "2013",
    "lpaq-fullv2-relevantpolicies-cil-upload-futureadopteddate-day": "",
    "lpaq-fullv2-relevantpolicies-cil-upload-futureadopteddate-month": "",
    "lpaq-fullv2-relevantpolicies-cil-upload-futureadopteddate-year": "",
    "lpaq-fullv2-taskliststatus-relevantpolicies": "Complete",
    "lpaq-fullv2-siteaccess-publicland": "Yes",
    "lpaq-fullv2-siteaccess-entersite": "Yes",
    "lpaq-fullv2-siteaccess-entersite-details": "Nunc accumsan nunc felis, vel tempus purus bibendum non. Cras iaculis blandit dui, quis aliquam velit posuere vel.",
    "lpaq-fullv2-siteaccess-healthsafety": "Yes",
    "lpaq-fullv2-siteaccess-healthsafety-details": "Vestibulum at viverra tortor. Aliquam erat volutpat. Sed in lacinia nisi, vitae fermentum mauris.",
    "lpaq-fullv2-taskliststatus-siteaccess": "Complete",
    "lpaq-fullv2-additionalinfo-nearbyappeals": "Yes",
    "lpaq-fullv2-additionalinfo-nearbyappeals-references": "654321, 987132",
    "lpaq-fullv2-additionalinfo-statementofcase": "Yes",
    "lpaq-fullv2-additionalinfo-extraconditions": "Yes",
    "lpaq-fullv2-additionalinfo-extraconditions-details": "Nulla facilisi. Pellentesque id aliquam ex, nec placerat mauris. Fusce lacus nulla, ultricies sed arcu quis, rutrum feugiat diam. Aliquam fringilla vestibulum massa sed sollicitudin. Morbi cursus urna metus, in convallis felis condimentum efficitur.",
    "lpaq-fullv2-taskliststatus-additionalinfo": "Complete"
  }
}

 */







  /*  router.get(base+'skip/complex-cya', function (req, res) {
    
      req.session.data["lpaq-"+v+"-proposeddevelopment-siteplan"] = "site_plan.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-proposeddevelopment"] = "Complete";
      req.session.data["lpaq-"+v+"-proposeddevelopment-listedbuilding"] = "Yes";
      req.session.data["lpaq-"+v+"-proposeddevelopment-listedbuildingdetails-grade"] = "Grade II";
      req.session.data["lpaq-"+v+"-proposeddevelopment-listedbuildingdetails-date-day"] = "10";
      req.session.data["lpaq-"+v+"-proposeddevelopment-listedbuildingdetails-date-month"] = "07";
      req.session.data["lpaq-"+v+"-proposeddevelopment-listedbuildingdetails-date-year"] = "1983";
      req.session.data["lpaq-"+v+"-proposeddevelopment-listedbuildingdetails-description"] = "Mediaeval origin, fragments of earlier church in tower surviving great fire, and C14 crypt. Rebuilt to design of Henry Jones of Northampton in 1680. Chancel and chapels; square nave with cupola on dome on cross of segmental vaults supported on 4 Ionic columns on pedestals. Western tower with a lantern and wide portico of 8 columns (finished 1701). Ornate plaster ceilings; Corporation Pew dated 1680. Font. C18 and C19 wall monuments. Statue on portico of Charles II, 1712 by John Hunt. 1928 refacing of top part of C14 tower.";
      req.session.data["lpaq-"+v+"-proposeddevelopment-listedbuildingdetails-historicengland"] = "Yes";
      req.session.data["lpaq-"+v+"-proposeddevelopment-historicengland-response"] = "historic_england_response.pdf";
      req.session.data["lpaq-"+v+"-proposeddevelopment-traveller"] = "Yes";
      req.session.data["lpaq-"+v+"-proposeddevelopment-rightofway"] = "Yes";
      req.session.data["lpaq-"+v+"-proposeddevelopment-rightofway-mapstatement"] = "rightofway_mapstatement.pdf";
      req.session.data["lpaq-"+v+"-proposeddevelopment-rightofway-details"] = "Quisque finibus diam urna, eu auctor sem vestibulum et. Praesent id molestie neque. Etiam turpis dui, volutpat in pretium eu, sollicitudin vel velit.";
      req.session.data["lpaq-"+v+"-proposeddevelopment-tpo"] = "Yes";
      req.session.data["lpaq-"+v+"-proposeddevelopment-tpo-siteplan"] = "tpo_site_plan.pdf";
      req.session.data["lpaq-"+v+"-proposeddevelopment-tpo-details"] = "Vivamus at pellentesque erat. Suspendisse ut urna sollicitudin, laoreet tellus ac, cursus tellus. Maecenas scelerisque viverra nunc vitae consequat.";
      req.session.data["lpaq-"+v+"-surroundingarea-appealsimmediatearea"] = "Yes";
      req.session.data["lpaq-"+v+"-taskliststatus-surroundingarea"] = "Complete";
      req.session.data["lpaq-"+v+"-surroundingarea-appealsimmediatearea-details"] = "12345678,98765432";
      req.session.data["lpaq-"+v+"-surroundingarea-greenbelt"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-conservationarea"] = "Yes, it is in a conservation area";
      req.session.data["lpaq-"+v+"-surroundingarea-conservationarea-upload"] = "conservation_area_map.pdf";
      req.session.data["lpaq-"+v+"-surroundingarea-aonb"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-sssi"] = "Yes";
      req.session.data["lpaq-fullv1-surroundingarea-sssi-designation"] = [
        "Site of special scientific interest",
        "Candidate special area of conservation",
        "Special area of conservation",
        "Potential special protection area",
        "Ramsar special protection area",
        "Other"
      ];
      //req.session.data["lpaq-"+v+"-surroundingarea-sssi-designation"] = "Other";
      req.session.data["lpaq-"+v+"-surroundingarea-sssi-designation-other"] = "Lorem ipsum dolor sit amet";
      req.session.data["lpaq-"+v+"-surroundingarea-sssi-consulted"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-sssi-consultation-upload"] = "sssi_consultation.pdf";
      req.session.data["lpaq-"+v+"-surroundingarea-affectslistedbuilding"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-affectslistedbuilding-description"] = "Nullam fringilla venenatis dolor. Quisque felis nunc, consectetur non ipsum vitae, consectetur sagittis nibh. Nulla facilisi. Vivamus in lacus eu ex luctus ornare. Etiam id mollis neque. In hac habitasse platea dictumst. Maecenas quis justo tellus. Cras vel elit tincidunt, tincidunt risus eget, consequat nisi.";
      req.session.data["lpaq-"+v+"-surroundingarea-affectslistedbuilding-consulted"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-ancientmonument"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-ancientmonument-consultation"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-ancientmonument-consultation-upload"] = "ancient_monument_consultation.pdf";
      req.session.data["lpaq-"+v+"-surroundingarea-protectedspecies"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-protectedspecies-consultation"] = "protected_species_consultation.pdf"
      req.session.data["lpaq-"+v+"-environmentalimpact-schedule"] = "Schedule 2";
      req.session.data["lpaq-"+v+"-environmentalimpact-scheduletwo"] = "3. Energy industry";
      req.session.data["lpaq-"+v+"-environmentalimpact-scheduletwo-sensitive"] = "Yes";
      req.session.data["lpaq-"+v+"-environmentalimpact-scheduletwo-sensitive-details"] = "Duis imperdiet est augue, et sagittis risus vehicula sed. Praesent et viverra purus, nec volutpat sapien. Nunc porta, mi nec gravida euismod, justo urna faucibus mauris, quis condimentum risus nulla id purus. Integer ut quam hendrerit, feugiat lorem ut, tincidunt ex.";
      req.session.data["lpaq-"+v+"-environmentalimpact-scheduletwo-criteria"] ="Yes"
      req.session.data["lpaq-"+v+"-environmentalimpact-screeningopinion"] = "Yes";
      req.session.data["lpaq-"+v+"-environmentalimpact-screeningopinion-details"] = "screening_opinion.pdf";
      req.session.data["lpaq-"+v+"-environmentalimpact-screeningopinion-eia"] = "Yes";
      req.session.data["lpaq-"+v+"-environmentalimpact-environmentalstatement"] = "Yes";
      req.session.data["lpaq-"+v+"-environmentalimpact-environmentalstatement-details"] = "environmental_statement.pdf";

      req.session.data["lpaq-"+v+"-environmentalimpact-environmentalstatement-sitenotice"] = "environmental_site_notice.pdf";
      req.session.data["lpaq-"+v+"-environmentalimpact-notificationsconsultations"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-environmentalimpact"] = "Complete";
      
      req.session.data["lpaq-"+v+"-yourdetails-planningofficersreport"] = "planning_officers_report.pdf";
      req.session.data["lpaq-"+v+"-yourdetails-decisionnotice"] = "decision_notice.pdf";
      req.session.data["lpaq-"+v+"-yourdetails-plansdocumentsdrawings"] = "plans_drawings_documents.pdf";
      req.session.data["lpaq-"+v+"-yourdetails-extraconditions"] = "Yes";
      req.session.data["lpaq-"+v+"-yourdetails-extraconditions-details"] = "Nulla magna nisi, vulputate quis est ac, imperdiet placerat lorem. Proin ultricies hendrerit commodo.";
      req.session.data["lpaq-"+v+"-taskliststatus-yourdecision"] = "Complete";
      req.session.data["lpaq-"+v+"-notifiedpeople-publiciseapplication"] = "Yes";
      req.session.data["lpaq-"+v+"-notifiedpeople-publiciseapplication-sitenotice"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-notifiedpeople-tellapplication"] = "Yes";
      req.session.data["lpaq-"+v+"-notifiedpeople-tellapplication-letter"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-notifiedpeople-toldappeal"] = "Yes";
      req.session.data["lpaq-"+v+"-notifiedpeople-toldappeal-letter"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-notifiedpeople"] = "Complete";
      req.session.data["lpaq-"+v+"-representations-whichparties"] = [
        "Site owners",
        "Statutory consultees",
        "Other parties"
      ],
      req.session.data["lpaq-"+v+"-representations-siteowner"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-representations-statutoryconsultee"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-representations-other"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
      req.session.data["lpaq-"+v+"-relevantpolicies-statutorydevelopment"] = "statutory_development_plan.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-neighbourhoodplan"] = "Yes";
      req.session.data["lpaq-"+v+"-relevantpolicies-other"] = "other_relevant.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-name"] = null,
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted"] = null,
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted-date-day"] = null,
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted-date-month"] = null,
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted-date-year"] = null,
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-adopted-stage"] = null,
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-file"] = null,
      req.session.data["lpaq-"+v+"-relevantpolicies-supplementary-files"] = [
        {
          "name": "Supplementary planning one",
          "adopted": "yes",
          "adopted_day": "01",
          "adopted_month": "February",
          "adopted_year": "2003",
          "adopted_stage": ""
        },
        {
          "name": "Supplementary planning two",
          "file": null,
          "adopted": "no",
          "adopted_day": "",
          "adopted_month": "",
          "adopted_year": "",
          "adopted_stage": "Final draft"
        }
      ],
      req.session.data["lpaq-"+v+"-optionalsupportingdocs-supplementary"] = "uploaded";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil"] = "Yes";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-details"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-details-adopted"] = "Yes";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-details-adopted-date-day"] = "10";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-details-adopted-date-month"] = "11";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-details-adopted-date-year"] = "2012";
      req.session.data["lpaq-"+v+"-relevantpolicies-cil-details-adopted-stage"] = "";
      req.session.data["lpaq-"+v+"-taskliststatus-relevantpolicies"] = "Complete";
      req.session.data["lpaq-"+v+"-siteaccess-publicland"] = "No";
      req.session.data["lpaq-"+v+"-siteaccess-entersite"] = "Yes";
      req.session.data["lpaq-"+v+"-siteaccess-entersite-details"] = "Etiam condimentum non eros at malesuada. Aliquam arcu dolor, tincidunt nec lacus et, malesuada finibus diam. Nullam viverra quis quam tincidunt rutrum.";
      req.session.data["lpaq-"+v+"-siteaccess-healthsafety"] = "Yes";
      req.session.data["lpaq-"+v+"-siteaccess-healthsafety-details"] = "Sed viverra tellus a lacus aliquam auctor. Vestibulum ac felis vel quam feugiat pretium sit amet in ante. Nullam pulvinar enim in ante vulputate sagittis. Pellentesque imperdiet tellus odio, at tempor eros ultrices a. Proin mauris enim, dapibus in enim lobortis, placerat laoreet turpis.";
      req.session.data["lpaq-"+v+"-taskliststatus-siteaccess"] = "Complete";
      req.session.data["lpaq-"+v+"-proceduretype-decidedby"] = "No, I recommend an inquiry";
      req.session.data["lpaq-"+v+"-proceduretype-inquirywitnesses"] = "3";
      req.session.data["lpaq-"+v+"-taskliststatus-proceduretype"] = "Complete"

      res.redirect(base+'task-list'); 

    })
*/

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
      if (req.session.data['lpaq-'+v+'-environmentalimpact-schedule'] == "Schedule 1"){
        res.redirect(base+'environmental-impact/schedule-one');
      } else if (req.session.data['lpaq-'+v+'-environmentalimpact-schedule'] == "Schedule 2"){
        res.redirect(base+'environmental-impact/schedule-two');
      } else {
        res.redirect(base+'environmental-impact/screening-opinion');
      }
    })

    router.post(base+'environmental-impact/schedule-one', function (req, res) {
      res.redirect(base+'environmental-impact/screening-opinion');
    })

    router.post(base+'environmental-impact/schedule-two', function (req, res) {
      res.redirect(base+'environmental-impact/schedule-two-sensitive');
    })

    router.post(base+'environmental-impact/schedule-two-sensitive', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-scheduletwo-sensitive'] == "Yes"){
        res.redirect(base+'environmental-impact/schedule-two-sensitive-details');
      } else {
        res.redirect(base+'environmental-impact/schedule-two-criteria');
      }
    })

    router.post(base+'environmental-impact/schedule-two-sensitive-details', function (req, res) {
      res.redirect(base+'environmental-impact/schedule-two-criteria');
    })

    router.post(base+'environmental-impact/schedule-two-criteria', function (req, res) {
      res.redirect(base+'environmental-impact/screening-opinion');
    })

    router.post(base+'environmental-impact/screening-opinion', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-screeningopinion'] == "Yes"){
        res.redirect(base+'environmental-impact/screening-opinion-details');
      } else {
        res.redirect(base+'environmental-impact/environmental-statement');
      }
    })

    router.post(base+'environmental-impact/screening-opinion-details', function (req, res) {
      res.redirect(base+'environmental-impact/screening-opinion-eia');
    })

    router.post(base+'environmental-impact/screening-opinion-eia', function (req, res) {
      res.redirect(base+'environmental-impact/environmental-statement');
    })

    router.post(base+'environmental-impact/environmental-statement', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-environmentalstatement'] == "Yes"){
        res.redirect(base+'environmental-impact/environmental-statement-details');
      } else {
        res.redirect(base+'environmental-impact/notifications-consultations');
      }
    })

    router.post(base+'environmental-impact/environmental-statement-details', function (req, res) {
      if (
        req.session.data['lpaq-'+v+'-environmentalimpact-schedule'] == "Schedule 1" ||
        req.session.data['lpaq-'+v+'-environmentalimpact-schedule'] == "Schedule 2"
      ){
        res.redirect(base+'environmental-impact/environmental-statement-sitenotice');
      } else {
        res.redirect(base+'environmental-impact/notifications-consultations');
      }
    })

    router.post(base+'environmental-impact/environmental-statement-sitenotice', function (req, res) {
        res.redirect(base+'environmental-impact/notifications-consultations');
    })

    router.post(base+'environmental-impact/notifications-consultations', function (req, res) {
      if (req.session.data['lpaq-'+v+'-environmentalimpact-notificationsconsultations'] == "No"){
        res.redirect(base+'environmental-impact/notifications-consultations-outstanding');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-environmentalimpact"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'environmental-impact/notifications-consultations-outstanding', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-environmentalimpact"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Provide details about your decision

    router.post(base+'your-decision/plans-documents-drawings', function (req, res) {
      res.redirect(base+'your-decision/statement-of-case');
    })

    router.post(base+'your-decision/statement-of-case', function (req, res) {
      if (req.session.data['lpaq-'+v+'-yourdecision-statementofcase'] == "Yes"){
        res.redirect(base+'your-decision/extra-conditions');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-yourdecision"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'your-decision/extra-conditions', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-yourdecision"] = "Complete";
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
      res.redirect(base+'relevant-policies/development-plan');
    })

    router.post(base+'relevant-policies/development-plan', function (req, res) {
      if (req.session.data["lpaq-"+v+"-relevantpolicies-developmentplan"] == "Yes"){
        res.redirect(base+'relevant-policies/development-plan-upload');
      } else {
        res.redirect(base+'relevant-policies/other');
      }
    })

    router.post(base+'relevant-policies/development-plan-upload', function (req, res) {
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