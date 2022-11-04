/* eslint-disable-next-line no-unused-vars */
const addFilter = require('govuk-prototype-kit').views.addFilter
const moment = require('moment')

addFilter('formatMonth', (number) => {
	if(number){
		var date = moment().month(number -1)
		return date.format('MMMM')
	} else {
		return ""
	}
})

addFilter('push', (array, item) => {
	array.push(item)
	return array
})

addFilter('cleanArray', (array) => {
	return array.filter(item => {
		return (item && (item !==""))
	})
})