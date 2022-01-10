module.exports = function (router) {

  var v = "v1";
  var base = "/final-comments/"+v+"/";

  
  router.post(base+'appellant', function (req, res) {
    res.redirect(base+'appellant/check-your-answers');
  })
/*
  router.post(base+'validate-appeal', function (req, res) {
    res.redirect(base+'review-complete');
  })

  router.post(base+'what-next', function (req, res) {
    res.redirect(base+'review-complete');
  })*/

}