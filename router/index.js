const express = require("express");
const {protect} = require("../middleware/auth");
const app = express();

app.use('/user',require('./user'))
app.use('/group',protect,require('./group'))
app.use('/course',protect,require('./course'))
app.use('/module',protect,require('./course_module'))
app.use('/leads',protect,require('./lead'))


module.exports = app;