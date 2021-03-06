// version 3 routes

module.exports = function (router) {

  var base = "/interested-party/v3/"

  router.get(base+'upload-comments-redirect', function (req, res) {
    // take the user to the right screen based on previous actions (if any)
    if (!req.session.data['comments'] || req.session.data['comments'].length === 0 ) {
      // if no files uploaded yet, go to upload first file
      res.redirect(base+'comment-upload');
    } else {
      // show files that have been uploaded
      res.redirect(base+'comment-upload-list');
    }
  })

  router.post(base+'comment-upload-check', function (req, res) {

    // if array doesn't exist, create it
    if (!req.session.data['comments']) {
      req.session.data['comments'] = []
    }

    // Append uploaded files to the existing array of uploads
    req.session.data['comments'] = req.session.data['comments'].concat(req.session.data['comments-file']);

    // delete form data so revisiting the upload page doesn't show stored info from last upload
    req.session.data['comments-file'] = null

    // redirect to list of uploaded files
    res.redirect(base+'comment-upload-list');

  })

  router.post(base+'comment-delete', function (req, res) {

    // remove item from array
    req.session.data['comments'].splice(req.session.data['deleterow'],1);

    // redirect the user to the relevant page
    res.redirect(base+'upload-comments-redirect');

  })

}



// version 4 routes
module.exports = function (router) {

  var base = "/interested-party/v4/"
  router.post(base+'appealOption', function (req, res) {

    // Make a variable from session data
    let appealType = req.session.data['hasAppealNumber']

    // route depending on value
    if (appealType === 'appealNumber') {
      res.redirect('appeal-search-reference')
    } else {
      res.redirect('appeal-search-postcode')
    }

  })

  router.post(base+'comment-upload-check', function (req, res) {

    // if array doesn't exist, create it
    if (!req.session.data['comments']) {
      req.session.data['comments'] = []
    }

    // Append uploaded files to the existing array of uploads
    req.session.data['comments'] = req.session.data['comments'].concat(req.session.data['comments-file']);

    // delete form data so revisiting the upload page doesn't show stored info from last upload
    req.session.data['comments-file'] = null

    // redirect to list of uploaded files
    res.redirect(base+'comment-upload-list');

  })

  router.post(base+'comment-delete', function (req, res) {

    // remove item from array
    req.session.data['comments'].splice(req.session.data['deleterow'],1);

    // redirect the user to the relevant page
    res.redirect(base+'upload-comments-redirect');

  })

}
