module.exports = function (router) {

  var v = "fullv1";
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
    router.get(base+'skip/simplest-cya', function (req, res) {
   
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
      req.session.data["lpaq-"+v+"-interestedparties-publiciseapplication"] = "No";
      req.session.data["lpaq-"+v+"-interestedparties-tellapplication"] = "No";
      req.session.data["lpaq-"+v+"-interestedparties-toldappeal"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-interestedparties"] = "Complete";
      req.session.data["lpaq-"+v+"-representations-whichparties"] = [
        "We did not receive representation from any parties"
      ],
      req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
      req.session.data["lpaq-"+v+"-localplanspolicies-statutorydevelopment"] = "statutory_development_plan.pdf";
      req.session.data["lpaq-"+v+"-localplanspolicies-neighbourhoodplan"] = "No";
      req.session.data["lpaq-"+v+"-localplanspolicies-other"] = "other_relevant.pdf";
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary"] = "supplementary_planning_2.pdf";
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-name"] = null;
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted"] = null;
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted-date-day"] = null;
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted-date-month"] = null;
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted-date-year"] = null;
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted-stage"] = null;
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-file"] = null;
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-files"] = [
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
      req.session.data["lpaq-"+v+"-localplanspolicies-cil"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-localplanspolicies"] = "Complete";
      req.session.data["lpaq-"+v+"-siteaccess-publicland"] = "Yes";
      req.session.data["lpaq-"+v+"-siteaccess-entersite-details"] = "";
      req.session.data["lpaq-"+v+"-siteaccess-entersite"] = "No";
      req.session.data["lpaq-"+v+"-siteaccess-healthsafety-details"] = "";
      req.session.data["lpaq-"+v+"-siteaccess-healthsafety"] = "No";
      req.session.data["lpaq-"+v+"-taskliststatus-siteaccess"] = "Complete";
      req.session.data["lpaq-"+v+"-proceduretype-decidedby"] = "Yes, I agree";
      req.session.data["lpaq-"+v+"-taskliststatus-proceduretype"] = "Complete"

      res.redirect(base+'task-list'); 

    })

  // Skip link to most complex completed questionnaire
    router.get(base+'skip/complex-cya', function (req, res) {
    
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
      req.session.data["lpaq-"+v+"-surroundingarea-sssi-designation"] = "Other";
      req.session.data["lpaq-"+v+"-surroundingarea-sssi-designation-other"] = "Lorem ipsum dolor sit amet";
      req.session.data["lpaq-"+v+"-surroundingarea-sssi-consulted"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-sssi-consultation-upload"] = "sssi_consultation.pdf";
      req.session.data["lpaq-"+v+"-surroundingarea-affectslistedbuilding"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-affectslistedbuilding-description"] = "Nullam fringilla venenatis dolor. Quisque felis nunc, consectetur non ipsum vitae, consectetur sagittis nibh. Nulla facilisi. Vivamus in lacus eu ex luctus ornare. Etiam id mollis neque. In hac habitasse platea dictumst. Maecenas quis justo tellus. Cras vel elit tincidunt, tincidunt risus eget, consequat nisi.";
      req.session.data["lpaq-"+v+"-surroundingarea-affectslistedbuilding-consulted"] = "Yes";
      req.session.data["lpaq-"+v+"-surroundingarea-ancientmonument"] = "Yes";
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
      req.session.data["lpaq-"+v+"-interestedparties-publiciseapplication"] = "Yes";
      req.session.data["lpaq-"+v+"-interestedparties-publiciseapplication-sitenotice"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-interestedparties-tellapplication"] = "Yes";
      req.session.data["lpaq-"+v+"-interestedparties-tellapplication-letter"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-interestedparties-toldappeal"] = "Yes";
      req.session.data["lpaq-"+v+"-interestedparties-toldappeal-letter"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-interestedparties"] = "Complete";
      req.session.data["lpaq-"+v+"-representations-whichparties"] = [
        "Site owners",
        "Statutory consultees",
        "Other parties"
      ],
      req.session.data["lpaq-"+v+"-representations-siteowner"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-representations-statutoryconsultee"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-representations-other"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
      req.session.data["lpaq-"+v+"-localplanspolicies-statutorydevelopment"] = "statutory_development_plan.pdf";
      req.session.data["lpaq-"+v+"-localplanspolicies-neighbourhoodplan"] = "Yes";
      req.session.data["lpaq-"+v+"-localplanspolicies-other"] = "other_relevant.pdf";
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-name"] = null,
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted"] = null,
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted-date-day"] = null,
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted-date-month"] = null,
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted-date-year"] = null,
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-adopted-stage"] = null,
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-file"] = null,
      req.session.data["lpaq-"+v+"-localplanspolicies-supplementary-files"] = [
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
      req.session.data["lpaq-"+v+"-localplanspolicies-cil"] = "Yes";
      req.session.data["lpaq-"+v+"-localplanspolicies-cil-details"] = "blank.pdf";
      req.session.data["lpaq-"+v+"-localplanspolicies-cil-details-adopted"] = "Yes";
      req.session.data["lpaq-"+v+"-localplanspolicies-cil-details-adopted-date-day"] = "10";
      req.session.data["lpaq-"+v+"-localplanspolicies-cil-details-adopted-date-month"] = "11";
      req.session.data["lpaq-"+v+"-localplanspolicies-cil-details-adopted-date-year"] = "2012";
      req.session.data["lpaq-"+v+"-localplanspolicies-cil-details-adopted-stage"] = "";
      req.session.data["lpaq-"+v+"-taskliststatus-localplanspolicies"] = "Complete";
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

  // Security
  
    router.post(base+'security/email', function (req, res) {
      res.redirect(base+'security/sent');
    })
  
    router.post(base+'security/email-link-expired', function (req, res) {
      res.redirect(base+'security/sent');
    })


  // Tell us about the proposed development

    router.post(base+'proposed-development/site-plan', function (req, res) {
      if (req.session.data['lpaq-'+v+'-taskliststatus-proposeddevelopment'] != "Complete"){
        req.session.data['lpaq-'+v+'-taskliststatus-proposeddevelopment'] = "In progress";
      }
      res.redirect(base+'proposed-development/involves-listed-building');
    })

    router.post(base+'proposed-development/involves-listed-building', function (req, res) {
      if (req.session.data['lpaq-'+v+'-proposeddevelopment-listedbuilding'] == "Yes"){
        res.redirect(base+'proposed-development/listed-building-details');
      } else {
        res.redirect(base+'proposed-development/traveller'); 
      }
    })

    router.post(base+'proposed-development/listed-building-details', function (req, res) {
      if (req.session.data['lpaq-'+v+'-proposeddevelopment-listedbuildingdetails-historicengland'] == "Yes"){
        res.redirect(base+'proposed-development/historic-england');
      } else {
        res.redirect(base+'proposed-development/traveller'); 
      }
    })

    router.post(base+'proposed-development/historic-england', function (req, res) {
      res.redirect(base+'proposed-development/traveller');
    })

    router.post(base+'proposed-development/traveller', function (req, res) {
      res.redirect(base+'proposed-development/rightofway');
    })

    router.post(base+'proposed-development/rightofway', function (req, res) {
      if (req.session.data['lpaq-'+v+'-proposeddevelopment-rightofway'] == "Yes"){
        res.redirect(base+'proposed-development/rightofway-details');
      } else {
        res.redirect(base+'proposed-development/tpo'); 
      }
    })

    router.post(base+'proposed-development/rightofway-details', function (req, res) {
      res.redirect(base+'proposed-development/tpo'); 
    })

    router.post(base+'proposed-development/tpo', function (req, res) {
      if (req.session.data['lpaq-'+v+'-proposeddevelopment-tpo'] == "Yes"){
        res.redirect(base+'proposed-development/tpo-details');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-proposeddevelopment"] = "Complete";
        res.redirect(base+'task-list'); 
      }
    })

    router.post(base+'proposed-development/tpo-details', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-proposeddevelopment"] = "Complete";
      res.redirect(base+'task-list'); 
    })


  // Tell us about the surrounding area

    router.post(base+'surrounding-area/appeals-immediate-area', function (req, res) {
      if (req.session.data['lpaq-'+v+'-taskliststatus-surroundingarea'] != "Complete"){
        req.session.data['lpaq-'+v+'-taskliststatus-surroundingarea'] = "In progress";
      }
      if (req.session.data['lpaq-'+v+'-surroundingarea-appealsimmediatearea'] == "Yes"){
        res.redirect(base+'surrounding-area/appeals-immediate-area-details');
      } else {
        res.redirect(base+'surrounding-area/green-belt');
      }
    })

    router.post(base+'surrounding-area/appeals-immediate-area-details', function (req, res) {
      res.redirect(base+'surrounding-area/green-belt'); 
    })

    router.post(base+'surrounding-area/green-belt', function (req, res) {
      res.redirect(base+'surrounding-area/conservation-area'); 
    })

    router.post(base+'surrounding-area/conservation-area', function (req, res) {
      if (req.session.data['lpaq-'+v+'-surroundingarea-conservationarea'] != "No, it is not in or near a conservation area"){
        res.redirect(base+'surrounding-area/conservation-area-upload'); 
      } else {
        res.redirect(base+'surrounding-area/aonb'); 
      }
    })

    router.post(base+'surrounding-area/conservation-area-upload', function (req, res) {
      res.redirect(base+'surrounding-area/aonb'); 
    })

    router.post(base+'surrounding-area/aonb', function (req, res) {
      res.redirect(base+'surrounding-area/sssi'); 
    })

    router.post(base+'surrounding-area/sssi', function (req, res) {
      if (req.session.data['lpaq-'+v+'-surroundingarea-sssi'] == "Yes"){
        res.redirect(base+'surrounding-area/sssi-designation');
      } else {
        res.redirect(base+'surrounding-area/affects-listed-building');
      }
    })

    router.post(base+'surrounding-area/sssi-designation', function (req, res) {
      if (req.session.data['lpaq-'+v+'-surroundingarea-sssi-consulted'] == "Yes"){
        res.redirect(base+'surrounding-area/sssi-consultation');
      } else {
        res.redirect(base+'surrounding-area/affects-listed-building');
      }
    })

    router.post(base+'surrounding-area/sssi-consultation', function (req, res) {
      res.redirect(base+'surrounding-area/affects-listed-building'); 
    })

    router.post(base+'surrounding-area/affects-listed-building', function (req, res) {
      if (req.session.data['lpaq-'+v+'-surroundingarea-affectslistedbuilding'] == "Yes"){
        res.redirect(base+'surrounding-area/affects-listed-building-details');
      } else {
        res.redirect(base+'surrounding-area/ancient-monument');
      }
    })

    router.post(base+'surrounding-area/affects-listed-building-details', function (req, res) {
      if (req.session.data['lpaq-'+v+'-surroundingarea-affectslistedbuilding-consulted'] == "Yes"){
        res.redirect(base+'surrounding-area/affects-listed-building-consultation');
      } else {
        res.redirect(base+'surrounding-area/ancient-monument');
      }
    })

    router.post(base+'surrounding-area/affects-listed-building-consultation', function (req, res) {
      res.redirect(base+'surrounding-area/ancient-monument');
    })

    router.post(base+'surrounding-area/ancient-monument', function (req, res) {
      if (req.session.data['lpaq-'+v+'-surroundingarea-ancientmonument'] == "Yes"){
        res.redirect(base+'surrounding-area/ancient-monument-consultation');
      } else {
        res.redirect(base+'surrounding-area/protected-species');
      }
    })

    router.post(base+'surrounding-area/ancient-monument-consultation', function (req, res) {
      res.redirect(base+'surrounding-area/protected-species');
    })

    router.post(base+'surrounding-area/protected-species', function (req, res) {
      if (req.session.data['lpaq-'+v+'-surroundingarea-protectedspecies'] == "Yes"){
        res.redirect(base+'surrounding-area/protected-species-consultation');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-surroundingarea"] = "Complete";
        res.redirect(base+'task-list'); 
      }
    })

    router.post(base+'surrounding-area/protected-species-consultation', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-surroundingarea"] = "Complete";
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

    router.post(base+'your-decision/planning-officers-report', function (req, res) {
      res.redirect(base+'your-decision/decision-notice');
    })

    router.post(base+'your-decision/decision-notice', function (req, res) {
      res.redirect(base+'your-decision/plans-documents-drawings');
    })

    router.post(base+'your-decision/plans-documents-drawings', function (req, res) {
      res.redirect(base+'your-decision/extra-conditions');
    })

    router.post(base+'your-decision/extra-conditions', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-yourdecision"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Tell us how you've informed interested parties 

    router.post(base+'interested-parties/publicise-application', function (req, res) {
      if (req.session.data['lpaq-'+v+'-interestedparties-publiciseapplication'] == "Yes"){
        res.redirect(base+'interested-parties/publicise-application-sitenotice');
      } else {
        res.redirect(base+'interested-parties/tell-application');
      }
    })

    router.post(base+'interested-parties/publicise-application-sitenotice', function (req, res) {
      res.redirect(base+'interested-parties/tell-application');
    })

    router.post(base+'interested-parties/tell-application', function (req, res) {
      if (req.session.data['lpaq-'+v+'-interestedparties-tellapplication'] == "Yes"){
        res.redirect(base+'interested-parties/tell-application-letter');
      } else {
        res.redirect(base+'interested-parties/told-appeal');
      }
    })

    router.post(base+'interested-parties/tell-application-letter', function (req, res) {
      res.redirect(base+'interested-parties/told-appeal');
    })

    router.post(base+'interested-parties/told-appeal', function (req, res) {
      if (req.session.data['lpaq-'+v+'-interestedparties-toldappeal'] == "Yes"){
        res.redirect(base+'interested-parties/told-appeal-letter');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-interestedparties"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'interested-parties/told-appeal-letter', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-interestedparties"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Upload representations from interest parties

    router.post(base+'representations/which-parties', function (req, res) {
      if (req.session.data['lpaq-'+v+'-representations-whichparties'].includes("Site owners")){
        res.redirect(base+'representations/site-owners');
      } else if (req.session.data['lpaq-'+v+'-representations-whichparties'].includes("Statutory consultees")){
        res.redirect(base+'representations/statutory-consultees');
      } else if (req.session.data['lpaq-'+v+'-representations-whichparties'].includes("Other parties")){
        res.redirect(base+'representations/other');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'representations/site-owners', function (req, res) {
      if (req.session.data['lpaq-'+v+'-representations-whichparties'].includes("Statutory consultees")){
        res.redirect(base+'representations/statutory-consultees');
      } else if (req.session.data['lpaq-'+v+'-representations-whichparties'].includes("Other parties")){
        res.redirect(base+'representations/other');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'representations/statutory-consultees', function (req, res) {
      if (req.session.data['lpaq-'+v+'-representations-whichparties'].includes("Other parties")){
        res.redirect(base+'representations/other');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'representations/other', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-representations"] = "Complete";
      res.redirect(base+'task-list');
    })


  // Upload your local plans and policies

    router.post(base+'local-plans-policies/statutory-development', function (req, res) {
      res.redirect(base+'local-plans-policies/neighbourhood-plan');
    })

    router.post(base+'local-plans-policies/neighbourhood-plan', function (req, res) {
      res.redirect(base+'local-plans-policies/other');
    })

    router.post(base+'local-plans-policies/other', function (req, res) {
      res.redirect(base+'local-plans-policies/supplementary');
    })

    router.post(base+'local-plans-policies/supplementary', function (req, res) {

      // collate all variables from form
      var newSupplementary = {
        'name': req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-name'],
        'file': req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-file'],
        'adopted': req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted'],
        'adopted_day': req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted-date-day'],
        'adopted_month': monthNumToFullName(req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted-date-month']),
        'adopted_year': req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted-date-year'],
        'adopted_stage': req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted-stage']
      }
    
      // delete form data so revisiting the upload page doesn't show stored info from last upload
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-name'] = null
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-file'] = null
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted'] = null
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted-date-day'] = null
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted-date-month'] = null
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted-date-year'] = null
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-adopted-stage'] = null


      // if array doesn't exist, create it
      if (!req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-files']) {
        req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-files'] = []
      }

      // Add uploaded file info to array
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-files'].push(newSupplementary)

      // redirect to list of uploaded files
      res.redirect(base+'local-plans-policies/supplementary-list');
      
    })

    router.post(base+'local-plans-policies/supplementary-delete', function (req, res) {
  
      // remove item from array
      req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-files'].splice(req.session.data['deleterow'],1);
  
      // if all files removed, mark task list as not started
      if (req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-files'].length === 0) {
        req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-completed'] = "false"
      } else {
        req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-completed'] = "true"
      }
      
      // redirect the user to the relevant page
      res.redirect(base+'local-plans-policies/supplementary-redirect');
      
    })

    router.get(base+'local-plans-policies/supplementary-redirect', function (req, res) {
      // take the user to the right screen based on previous actions (if any)
      if (!req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-files'] || req.session.data['lpaq-'+v+'-localplanspolicies-supplementary-files'].length === 0 ) {
        // if no files uploaded yet, go to upload first file
        res.redirect(base+'local-plans-policies/supplementary');
      } else {
        // show files that have been uploaded
        res.redirect(base+'local-plans-policies/supplementary-list');
      }
    })

    router.post(base+'local-plans-policies/supplementary-list', function (req, res) {
      res.redirect(base+'local-plans-policies/cil');
    })

    router.post(base+'local-plans-policies/cil', function (req, res) {
      if (req.session.data['lpaq-'+v+'-localplanspolicies-cil'] == "Yes"){
        res.redirect(base+'local-plans-policies/cil-details');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-localplanspolicies"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'local-plans-policies/cil-details', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-localplanspolicies"] = "Complete";
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


  // Review the procedure type

    router.post(base+'procedure-type/decided-by', function (req, res) {
      if (req.session.data['lpaq-'+v+'-proceduretype-decidedby'] == "No, I recommend an inquiry"){
        res.redirect(base+'procedure-type/inquiry-witnesses');
      } else {
        req.session.data["lpaq-"+v+"-taskliststatus-proceduretype"] = "Complete";
        res.redirect(base+'task-list');
      }
    })

    router.post(base+'procedure-type/inquiry-witnesses', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-proceduretype"] = "Complete";
      res.redirect(base+'task-list');
    })
    
} 