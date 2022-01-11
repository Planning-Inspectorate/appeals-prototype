module.exports = function (router) {

  var v = "v1";
  var base = "/statement-of-case/"+v+"/";

  router.post(base, function (req, res) {
    res.redirect(base+'check-your-answers');
  })
  
  router.post(base+'check-your-answers', function (req, res) {
    res.redirect(base+'confirmation');
  })

}