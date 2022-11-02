/* eslint-disable-next-line no-unused-vars */
const addFilter = require('govuk-prototype-kit').views.addFilter
const moment = require('moment')

addFilter('formatMonth', function(number){
	if(number){
		var date = moment().month(number -1)
		return date.format('MMMM')
	} else {
		return ""
	}
})