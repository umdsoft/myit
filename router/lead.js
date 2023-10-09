const express = require('express');
const LeadsController = require('../controllers/LeadsController');
const {protect, authorize} = require("../middleware/auth");

const router = express.Router();

router.post('/create',protect, LeadsController.createLead)



module.exports = router