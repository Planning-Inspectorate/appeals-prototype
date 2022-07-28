const express = require('express');
const router = express.Router();

router.use('/', (req, res, next) => {
	// Grab the current URL
	res.locals.currentURL = req.url

	// Set a flag for if the proto is running locally
	if (req.get('host').includes('localhost')) {
		res.locals.local = true
	}

	next()
})

// Import routes for new versioning system
router.use("/:folder/v:version", (req, res, next) => {
	try {
		return require(`./views/${req.params.folder}/v${req.params.version}/_routes`)(req, res, next)
	} catch (e) {
		next()
	}
})

// Old versioning imports
require('./routes/eligibility/v8.js')(router);
require('./routes/eligibility/v9.js')(router);
require('./routes/before-you-start/v10.js')(router);
require('./routes/before-you-start/v11.js')(router);
require('./routes/before-you-start/v12.js')(router);

require('./routes/enforcement/v1.js')(router);
require('./routes/enforcement/v2.js')(router);
require('./routes/enforcement/v3.js')(router);
require('./routes/enforcement/v4.js')(router);
require('./routes/enforcement/v5.js')(router);

require('./routes/appellant-submission/v10.js')(router);
require('./routes/appellant-submission/v11.js')(router);
require('./routes/appellant-submission/v12.js')(router);
require('./routes/appellant-submission/v13.js')(router);
require('./routes/appellant-submission/v14.js')(router);
require('./routes/appellant-submission/v15.js')(router);
require('./routes/appellant-submission/v16.js')(router);

require('./routes/mvp-full-appeal/v1.js')(router);
require('./routes/mvp-full-appeal/v2.js')(router);

require('./routes/appeal-submission.js')(router);

require('./routes/lpa-questionnaire/v8.js')(router);
require('./routes/lpa-questionnaire/v9.js')(router);
require('./routes/lpa-questionnaire/fullv1.js')(router);
require('./routes/lpa-questionnaire/fullv2.js')(router);

require('./routes/validation-officer/v1.js')(router);
require('./routes/validation-officer/v2.js')(router);
require('./routes/validation-officer/v3.js')(router);

require('./routes/case-officer/v1.js')(router);
require('./routes/case-officer/v2.js')(router);
require('./routes/case-officer/v3.js')(router);
require('./routes/case-officer/v4.js')(router);
require('./routes/case-officer/v5.js')(router);
require('./routes/case-officer/v6.js')(router);
require('./routes/case-officer/v7.js')(router);

require('./routes/statement-of-case/v1.js')(router);

require('./routes/final-comments/v1.js')(router);

require('./routes/inspector/v4.js')(router);
require('./routes/inspector/v5.js')(router);

require('./routes/cst/v1.js')(router);
require('./routes/cst/v2.js')(router);
require('./routes/cst/v3.js')(router);
require('./routes/cst/v4.js')(router);
require('./routes/cst/v5.js')(router);
require('./routes/cst/v5a.js')(router);

require('./routes/standalone/as-2078.js')(router);
require('./routes/standalone/lpa-questionnaire-security.js')(router);
require('./routes/standalone/appeal-submission-security.js')(router);
require('./routes/standalone/appeal-submission-security-magiclink.js')(router);

require('./routes/interested-party/upload-comments.js')(router);
require('./routes/save-progress/v1/v1.js')(router);
require('./routes/save-progress/v2/v2.js')(router);
require('./routes/save-progress/v3/v3.js')(router);
require('./routes/save-progress/v4/v4.js')(router);

// Add your routes above the module.exports line
module.exports = router
