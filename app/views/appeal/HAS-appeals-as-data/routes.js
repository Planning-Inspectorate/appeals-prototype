//bys route
router.post('/before-you-start', function (req, res) {
  res.redirect('lpa')
})


//enforcement route
  
const selectedValue = document.querySelector('input[name="enforcementNotice"]:checked').value;
 if (selectedValue === "Yes") {
window.location.href = 'existing-service';
} else {
window.location.href = 'lpa';
}
    