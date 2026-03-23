//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/routes
//
const govukPrototypeKit = require('govuk-prototype-kit')

const {applyAzureHostingFix} = require('./azure-hosting-fix');
applyAzureHostingFix();

const router = govukPrototypeKit.requests.setupRouter()

// Ensure posted form data is stored in session (for environments where auto-store data is disabled)
router.use((req, res, next) => {
	if (req.method === 'POST' && req.body) {
		if (!req.session.data) {
			req.session.data = {}
		}
		Object.assign(req.session.data, req.body)
	}
	next()
})

// additions to add the flash functionality
const flash = require('connect-flash')
router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.flash = req.flash('success')[0]
  next()
})

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

// Easy routing by Craig Abbott - https://github.com/abbott567/radio-button-redirect
// Added for simple branching
const radioButtonRedirect = require('radio-button-redirect')
router.use(radioButtonRedirect)
