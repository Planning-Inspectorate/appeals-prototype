module.exports = function (router) {

  var v = "fullv1";
  var base = "/lpa-questionnaire/"+v+"/";

  // Security
  
    /*router.post(base+'security/email', function (req, res) {
      res.redirect(base+'security/sent');
    })*/


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
        res.redirect(base+'surrounding-area/affect-listed-building');
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

}