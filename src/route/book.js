const express = require('express');
const router = express.Router();
const siteController = require('../app/controller/siteController');
router.get('/', siteController.showAll);
router.get('/search', siteController.searchOne);
router.get('/searchType', siteController.searchType);
router.get('/searchName', siteController.searchName);
router.get('/:slug', siteController.detail);

module.exports = router;