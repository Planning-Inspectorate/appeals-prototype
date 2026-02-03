//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/routes
//
const govukPrototypeKit = require('govuk-prototype-kit')

const {applyAzureHostingFix} = require('./azure-hosting-fix');
applyAzureHostingFix();

const router = govukPrototypeKit.requests.setupRouter()



// Set a flag for if the proto is running locally
router.use('/', (req, res, next) => {
	res.locals.currentURL = req.url

	if (req.get('host').includes('localhost')) {
		res.locals.local = true
	}

	next()
})

// Import routes from different prototype folders
router.use("/:service/:prototype/v:version", (req, res, next) => {
	try {
		res.locals.location = `${req.params.service}/${req.params.prototype}/v${req.params.version}/`
		return require(`./views/${req.params.service}/${req.params.prototype}/v${req.params.version}/_routes`)(req, res, next)
	} catch (e) {
		next()
	}
})
router.use("/:service/v:version", (req, res, next) => {
	try {
		res.locals.location = `${req.params.service}/v${req.params.version}/`
		return require(`./views/${req.params.service}/v${req.params.version}/_routes`)(req, res, next)
	} catch (e) {
		next()
	}
})

// Import routes for ldc-bys folder
router.use("/appeal/ldc/v4/ldc-bys", (req, res, next) => {
	try {
		return require(`./views/appeal/ldc/v4/ldc-bys/_routes`)(req, res, next)
	} catch (e) {
		next()
	}
})

// Import routes for prepare-appeal folder
router.use("/appeal/ldc/v4/prepare-appeal", (req, res, next) => {
	try {
		return require(`./views/appeal/ldc/v4/prepare-appeal/_routes`)(req, res, next)
	} catch (e) {
		next()
	}
})

// Import routes for upload-documents folder
router.use("/appeal/ldc/v4/upload-documents", (req, res, next) => {
	try {
		return require(`./views/appeal/ldc/v4/upload-documents/_routes`)(req, res, next)
	} catch (e) {
		next()
	}
})

// Import routes for lpaq folder
router.use("/appeal/ldc/v4/lpaq", require('./views/appeal/ldc/v4/lpaq/_routes'))

// Easy routing by Craig Abbott - https://github.com/abbott567/radio-button-redirect
// Added for simple branching
const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)


