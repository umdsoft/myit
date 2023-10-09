const express = require('express');
const CourseController = require('../controllers/CourseController');
const {protect, authorize} = require("../middleware/auth");

const router = express.Router();

router.get('/',protect, CourseController.all)
router.post('/create',protect, CourseController.create)
router.post('/update/:id',protect, CourseController.update)



module.exports = router