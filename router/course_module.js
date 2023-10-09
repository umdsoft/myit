const express = require('express');
const CourseModuleController = require('../controllers/CourseModuleController');
const {protect, authorize} = require("../middleware/auth");

const router = express.Router();

router.get('/:id',protect, CourseModuleController.all)
router.post('/create',protect, CourseModuleController.create)
router.post('/update/:id',protect, CourseModuleController.update)
router.delete('/delete/:id',protect, CourseModuleController.delete)
router.get('/up/:id',protect, CourseModuleController.up)
router.get('/down/:id',protect, CourseModuleController.down)





module.exports = router