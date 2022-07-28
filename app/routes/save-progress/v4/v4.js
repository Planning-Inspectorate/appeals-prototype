module.exports = function (router) {

  var v = "v4";
  var base = "/save-progress/"+v;

  // route for completing the contact details task
  router.post(base+'/contact-details/your-details', function (req, res) {
    req.session.data["contactdetails-"+v+"-taskliststatus-contactdetails"] = "Complete";
    res.redirect(base+'/task-list');
  })

  // route for service start
  router.post(base+'/service-start', function (req, res) {
    let choice = req.session.data['new-or-continue']
    // route depending on value
    if (choice === 'new') {
      res.redirect('/appellant-submission/v13/')
    } else {
      res.redirect('input-magic-link-email?continue=yes')
    }
  })

}
