module.exports = function (router) {

  var v = "v2";
  var base = "/save-progress/"+v;

  router.post(base+'/contact-details/your-details', function (req, res) {
    req.session.data["contactdetails-"+v+"-taskliststatus-contactdetails"] = "Complete";
    res.redirect(base+'/task-list');
    // data["appealsub-"+version+"-taskliststatus-contactdetails"]
  })

  router.post(base+'/what-do-you-want-to-do', function (req, res) {

    let choice = req.session.data['new-or-continue']


    // route depending on value
    if (choice === 'new') {
      res.redirect('/appellant-submission/v13/')
    } else {
      res.redirect('input-magic-link-email')
    }

  })

}
