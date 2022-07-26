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


//---- GROUNDS
router.post('/update/grounds', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  delete req.session.data['cya']

  if (grounds.includes(groundB)) {
    res.redirect('reasons-b')
  } else if (grounds.includes(groundC)) {
    res.redirect('reasons-c')
  } else if (grounds.includes(groundD)) {
    res.redirect('reasons-d')
  } else if (grounds.includes(groundE)) {
    res.redirect('reasons-e')
  } else if (grounds.includes(groundF)) {
    res.redirect('reasons-f')
  } else if (grounds.includes(groundG)) {
    res.redirect('reasons-g')
  } else {
    res.redirect('./')
  }
})
//---- /GROUNDS





//---- GROUND A
router.post('/update/reasons-a', function (req, res) {
  delete req.session.data['cya']
  res.redirect('./')
})

router.post('/update/supporting-check-a', function (req, res) {
  delete req.session.data['cya']
  let check = req.session.data['statement-supporting-check-a']

  if (check == 'Yes') {
    res.redirect('supporting-upload-a')
  } else {
    res.redirect('./')
  }
})

router.post('/update/supporting-upload-a', function (req, res) {
  delete req.session.data['cya']
  res.redirect('./')
})
//---- /GROUND A





//---- GROUND B
router.post('/update/reasons-b', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {
    res.redirect('supporting-check-b')
  }
})

router.post('/update/supporting-check-b', function (req, res) {
  let check = req.session.data['statement-supporting-check-b']
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya && check == 'No') {
    delete cya
    res.redirect('./')
  } else {

    if (check == 'Yes') {
      res.redirect('supporting-upload-b')
    } else if (!cya && grounds.includes(groundC)) {
      res.redirect('reasons-c')
    } else if (!cya && grounds.includes(groundD)) {
      res.redirect('reasons-d')
    } else if (!cya && grounds.includes(groundE)) {
      res.redirect('reasons-e')
    } else if (!cya && grounds.includes(groundF)) {
      res.redirect('reasons-f')
    } else if (!cya && grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})

router.post('/update/supporting-upload-b', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {

    if (grounds.includes(groundC)) {
      res.redirect('reasons-c')
    } else if (grounds.includes(groundD)) {
      res.redirect('reasons-d')
    } else if (grounds.includes(groundE)) {
      res.redirect('reasons-e')
    } else if (grounds.includes(groundF)) {
      res.redirect('reasons-f')
    } else if (grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})
//---- /GROUND B





//---- GROUND C
router.post('/update/reasons-c', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {
    res.redirect('supporting-check-c')
  }
})

router.post('/update/supporting-check-c', function (req, res) {
  let check = req.session.data['statement-supporting-check-c']
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya && check == 'No') {
    delete cya
    res.redirect('./')
  } else {

    if (check == 'Yes') {
      res.redirect('supporting-upload-c')
    } else if (!cya && grounds.includes(groundD)) {
      res.redirect('reasons-d')
    } else if (!cya && grounds.includes(groundE)) {
      res.redirect('reasons-e')
    } else if (!cya && grounds.includes(groundF)) {
      res.redirect('reasons-f')
    } else if (!cya && grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})

router.post('/update/supporting-upload-c', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {

    if (grounds.includes(groundD)) {
      res.redirect('reasons-d')
    } else if (grounds.includes(groundE)) {
      res.redirect('reasons-e')
    } else if (grounds.includes(groundF)) {
      res.redirect('reasons-f')
    } else if (grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})
//---- /GROUND C





//---- GROUND D
router.post('/update/reasons-d', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {
    res.redirect('supporting-check-d')
  }
})

router.post('/update/supporting-check-d', function (req, res) {
  let check = req.session.data['statement-supporting-check-d']
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya && check == 'No') {
    delete cya
    res.redirect('./')
  } else {

    if (check == 'Yes') {
      res.redirect('supporting-upload-d')
    } else if (!cya && grounds.includes(groundE)) {
      res.redirect('reasons-e')
    } else if (!cya && grounds.includes(groundF)) {
      res.redirect('reasons-f')
    } else if (!cya && grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})

router.post('/update/supporting-upload-d', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {

    if (grounds.includes(groundE)) {
      res.redirect('reasons-e')
    } else if (grounds.includes(groundF)) {
      res.redirect('reasons-f')
    } else if (grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})
//---- /GROUND D





//---- GROUND E
router.post('/update/reasons-e', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {
    res.redirect('supporting-check-e')
  }
})

router.post('/update/supporting-check-e', function (req, res) {
  let check = req.session.data['statement-supporting-check-e']
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya && check == 'No') {
    delete cya
    res.redirect('./')
  } else {

    if (check == 'Yes') {
      res.redirect('supporting-upload-e')
    } else if (!cya && grounds.includes(groundF)) {
      res.redirect('reasons-f')
    } else if (!cya && grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})

router.post('/update/supporting-upload-e', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {

    if (grounds.includes(groundF)) {
      res.redirect('reasons-f')
    } else if (grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})
//---- /GROUND E





//---- GROUND F
router.post('/update/reasons-f', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {
    res.redirect('supporting-check-f')
  }
})

router.post('/update/supporting-check-f', function (req, res) {
  let check = req.session.data['statement-supporting-check-f']
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya && check == 'No') {
    delete cya
    res.redirect('./')
  } else {

    if (check == 'Yes') {
      res.redirect('supporting-upload-f')
    } else if (!cya && grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})

router.post('/update/supporting-upload-f', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {

    if (grounds.includes(groundG)) {
      res.redirect('reasons-g')
    } else {
      res.redirect('./')
    }

  }
})
//---- /GROUND F





//---- GROUND G
router.post('/update/reasons-g', function (req, res) {
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya) {
    delete cya
    res.redirect('./')
  } else {
    res.redirect('supporting-check-g')
  }
})

router.post('/update/supporting-check-g', function (req, res) {
  let check = req.session.data['statement-supporting-check-g']
  let grounds = req.session.data['statement-grounds']
  let cya = req.session.data['cya']

  if (cya && check == 'No') {
    delete cya
    res.redirect('./')
  } else {

    if (check == 'Yes') {
      res.redirect('supporting-upload-g')
    } else {
      res.redirect('./')
    }

  }
})

router.post('/update/supporting-upload-g', function (req, res) {
  delete req.session.data['cya']
  res.redirect('./')
})
//---- /GROUND G





//---- CANCEL
router.post('/update/cancel', function (req, res) {
  res.redirect('cancelled')
})
//---- /CANCEL






// Add your routes above the module.exports line
module.exports = router