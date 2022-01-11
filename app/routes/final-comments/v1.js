module.exports = function (router) {

  var v = "v1";
  var base = "/final-comments/"+v+"/";


  // Appellant routes
  
    router.post(base+'appellant', function (req, res) {
      res.redirect(base+'appellant/check-your-answers');
    })
    
    router.post(base+'appellant/check-your-answers', function (req, res) {
      res.redirect(base+'appellant/confirmation');
    })


  // Agent routes
  
    router.post(base+'agent', function (req, res) {
      res.redirect(base+'agent/check-your-answers');
    })
    
    router.post(base+'agent/check-your-answers', function (req, res) {
      res.redirect(base+'agent/confirmation');
    })


  // LPD routes
  
    router.post(base+'lpd', function (req, res) {
      res.redirect(base+'lpd/check-your-answers');
    })
    
    router.post(base+'lpd/check-your-answers', function (req, res) {
      res.redirect(base+'lpd/confirmation');
    })
    

}