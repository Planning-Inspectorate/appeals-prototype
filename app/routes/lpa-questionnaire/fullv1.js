module.exports = function (router) {

  var v = "fullv1";
  var base = "/lpa-questionnaire/"+v+"/";

  // Security
  
    /*router.post(base+'security/email', function (req, res) {
      res.redirect(base+'security/sent');
    })*/


  // Tell us about the proposed development

    router.post(base+'proposed-development/site-plan', function (req, res) {
      req.session.data["lpaq-"+v+"-taskliststatus-proposeddevelopment"] = "In progress";
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
      req.session.data["lpaq-"+v+"-taskliststatus-surroundingarea"] = "In progress";
      res.redirect(base+'proposed-development/involves-listed-building');
    })


/*    router.post(base+'about-appeal/conditions', function (req, res) {
      if (req.session.data['lpaq-'+v+'-checkyouranswers']){
        res.redirect(base+'check-your-answers');
      } else {
        res.redirect(base+'task-list');
      }
    })*/

}