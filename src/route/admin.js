const express = require('express');
const router = express.Router();
const bookController = require('../app/controller/bookController');

router.get('/', bookController.manager);
router.get('/trash', bookController.trash);
//create
router.post('/create', bookController.store);
//update
router.get('/update/:id', bookController.edit);
router.put('/update/:id', bookController.update);
//delete
router.post('/control-actionForm',bookController.handleFormAction)
router.delete('/delete/:id', bookController.destroy);
router.delete('/delete/:id/force', bookController.forceDestroy);
//restore
router.patch('/trash/restore/:id',bookController.restore);

module.exports = router;