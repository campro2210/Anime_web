const express = require('express');
const router = express.Router();
const siteController = require('../app/controller/SiteController');

router.get('/search', siteController.search);
router.get('/',siteController.home);
router.get('*',siteController.notpage);


module.exports = router;


