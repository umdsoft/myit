const express = require('express');
const UserController = require('../controllers/UserController');
const {protect} = require("../middleware/auth");

const router = express.Router();

router.get('/me',protect,UserController.me)
router.post('/create',UserController.create);
router.post('/login',UserController.login)
router.post('/refresh-token',UserController.refreshToken)



module.exports = router