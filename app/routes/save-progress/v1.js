module.exports = function (router) {

  var v = "v1";
  var base = "/save-progress/"+v;

  router.post(base+'/contact-details/your-details', function (req, res) {

    req.session.data["contactdetails-"+v+"-taskliststatus-contactdetails"] = "Complete";

    res.redirect(base+'/task-list');

    // data["appealsub-"+version+"-taskliststatus-contactdetails"]

  })

}
