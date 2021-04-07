const express = require('express');
const objectController = require('../controllers/object');
const auth = require('../middleware/auth');

const router = express.Router();




router.get('/', auth, objectController.getAllObject);

router.get('/:id', auth, objectController.getOneObject);

router.post('/', auth, objectController.createObject);

router.put('/:id', auth, objectController.updateOneObject);

router.delete('/:id', auth, objectController.deleteObject);



module.exports = router;