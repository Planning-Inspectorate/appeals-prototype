const express = require('express')
const router = new express.Router()
const groundA = 'Ground A: Planning permission should be granted for the alleged breach in the enforcement notice.'
const groundB = 'Ground B: The alleged breach of planning permission has not happened.'
const groundC = 'Ground C: The alleged breach does not require planning permission.'
const groundD = 'Ground D: It’s too late for the local authority to serve the enforcement notice.'
const groundE = 'Ground E: Copies of the enforcement notice were not legally served to the right people.'
const groundF = 'Ground F: The steps to comply with the enforcement notice are excessive.'
const groundG = 'Ground G: I need more time to comply with the enforcement notice.'

router.post('/return/', function (req, res) {
  res.redirect('../your-appeals')
})

router.post('/update/grounds', function (req, res) {
  let grounds = req.session.data['statement-grounds']

  if (grounds.includes(groundB)) {
    res.redirect('reasons-b')
  } else if (grounds.includes(groundC)) {
    res.redirect('reasons-c')
  } else if (grounds.includes(groundD)) {
    res.redirect('reasons-d')
  } else if (grounds.includes(groundE)) {
    res.redirect('reasons-e')
  } else if (grounds.includes(groundF)) {
    res.redirect('reasons-e')
  } else {
    res.redirect('./')
  }
})

router.post('/update/reasons-a', function (req, res) {
  res.redirect('./')
})

router.post('/update/reasons-b', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete req.session.data['cya']
    res.redirect('./')
  } else if (grounds.includes(groundC)) {
    res.redirect('reasons-c')
  } else if (grounds.includes(groundD)) {
    res.redirect('reasons-d')
  } else if (grounds.includes(groundE)) {
    res.redirect('reasons-e')
  } else if (grounds.includes(groundF)) {
    res.redirect('reasons-e')
  } else {
    res.redirect('./')
  }
})

router.post('/update/reasons-c', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete req.session.data['cya']
    res.redirect('./')
  } else if (grounds.includes(groundD)) {
    res.redirect('reasons-d')
  } else if (grounds.includes(groundE)) {
    res.redirect('reasons-e')
  } else if (grounds.includes(groundF)) {
    res.redirect('reasons-e')
  } else {
    res.redirect('./')
  }
})

router.post('/update/reasons-d', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete req.session.data['cya']
    res.redirect('./')
  } else if (grounds.includes(groundE)) {
    res.redirect('reasons-e')
  } else if (grounds.includes(groundF)) {
    res.redirect('reasons-e')
  } else {
    res.redirect('./')
  }
})

router.post('/update/reasons-e', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete req.session.data['cya']
    res.redirect('./')
  } else if (grounds.includes(groundF)) {
    res.redirect('reasons-f')
  } else {
    res.redirect('./')
  }
})

router.post('/update/reasons-f', function (req, res) {
  res.redirect('./')
})

router.post('/update/reasons-g', function (req, res) {
  res.redirect('./')
})

router.post('/update/supporting-docs', function (req, res) {
  res.redirect('./')
})

router.post('/update/cancel', function (req, res) {
  res.redirect('cancelled')
})







// Add your routes above the module.exports line
module.exports = router
