const express = require('express');
const GroupController = require('../controllers/GroupController');

const router = express.Router();

router.get('/', GroupController.new)
router.get('/running', GroupController.running)
router.get('/done', GroupController.done)
router.get('/my:id', GroupController.my)


module.exports = router