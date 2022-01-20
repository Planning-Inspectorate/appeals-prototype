const express = require('express');
const router = express.Router();

// Add your routes here - above the module.exports line
require('./routes/eligibility/v8.js')(router);
require('./routes/eligibility/v9.js')(router);
require('./routes/appellant-submission/v10.js')(router);
require('./routes/appellant-submission/v11.js')(router);
require('./routes/appellant-submission/v12.js')(router);
require('./routes/appellant-submission/v13.js')(router);

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

module.exports = router
