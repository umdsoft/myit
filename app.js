const express = require("express");
const morgan = require("morgan");
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const app = express();
const indexRouter = require('./router/index');
const cors = require('cors')
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("tiny"));
app.use(cors())

app.use('/api/v1/',indexRouter)

app.use((req,res,next)=>{
    const error = new Error("Not found");
    error.status = 404;
    next(error)
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;