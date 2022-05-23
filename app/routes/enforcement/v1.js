module.exports = function (router) {

  var v = "v1";
  var base = "/enforcement/"+v+"/";

 /******************************
  *** ENFORCEMENT SUBMISSION ***
  ******************************/

  // ENF 00X
  // Enforcement
  // Who are you?
  router.post('/whoareyou', function (req, res) {

    // Make a variable from session data
    let user = req.session.data['identity']

    // route depending on value
    if (user === 'appellant') {
      res.redirect('/enforcement/v1/contact-details/contact-details')
    } else {
      res.redirect('/enforcement/v1/agent-enforcement')
    }
  })

  // ENF 00X
  // Enforcement
  // Additional people
  router.post('/additionalpeople', function (req, res) {

    // Make a variable from session data
    let addedpeople = req.session.data['addedpeople']

    // route depending on value
    if (addedpeople === 'yes') {
      res.redirect('morepeople')
    } else {
      res.redirect('/enforcement/v1/appeal-site/postcode-address')
    }
  })

  // ENF 00X
  // Enforcement
  // Site visibility
  router.post('/sitevisible', function (req, res) {

    // Make a variable from session data
    let visibility = req.session.data['sitevisibility']

    // route depending on value
    if (visibility === 'yes') {
      res.redirect('morepeople')
    } else {
      res.redirect('/enforcement/v1/appeal-site/postcode-address')
    }
  })

  // ENF 00X
  // Enforcement
  // Site interest
  router.post('/siteinterest', function (req, res) {

    // Make a variable from session data
    let interest = req.session.data['interest']

    // route depending on value
    if (interest === 'none') {
      res.redirect('moreinfo')
    } else {
      res.redirect('/enforcement/v1/grounds/grounds')
    }
  })

  // ENF 00X
  // Enforcement
  // Grounds
  router.post('/grounds', function (req, res) {

    // Make a variable from session data
    let groundA = req.session.data['grounds-1']
    let groundB = req.session.data['grounds-2']
    let groundC = req.session.data['grounds-3']
    let groundD = req.session.data['grounds-4']
    let groundE = req.session.data['grounds-5']
    let groundF = req.session.data['grounds-6']
    let groundG = req.session.data['grounds-7']

    // route depending on value
    if (groundA) {
      res.redirect('/enforcement/v1/grounds/groundA-text')
    } else if (groundB) {
      res.redirect('/enforcement/v1/grounds/groundB-text')
    } else if (groundC) {
      res.redirect('/enforcement/v1/grounds/groundC-text')
    } else if (groundD) {
      res.redirect('/enforcement/v1/grounds/groundD-text')
    } else if (groundE) {
      res.redirect('/enforcement/v1/grounds/groundE-text')
    } else if (groundF) {
      res.redirect('/enforcement/v1/grounds/groundF-text')
    } else {
      res.redirect('/enforcement/v1/grounds/groundG-text')
    }
  })

  // ENF 00X
  // Enforcement
  // Prefered procedure
  // How would you like us to decide your appeal?
  router.post('/enforcementprocedure', function (req, res) {

    // Make a variable from session data
    let how = req.session.data['procedure']

    // route depending on value
    if (how === 'written') {
      res.redirect('/enforcement/v1/upload/planning-obligation')
    } else if (how === 'hearing') {
      res.redirect('hearing')
    } else {
      res.redirect('inqury')
    }
  })

  router.post('/planningobligation', function (req, res) {

    // Make a variable from session data
    let obligation = req.session.data['enf-planning-obligation']
    // route depending on value
    if (obligation === 'Yes') {
      res.redirect('/enforcement/v1/upload/planning-obligation-stuff')
    } else {
      res.redirect('/enforcement/v1/upload/plans-or-drawings')
    }
  })




}
