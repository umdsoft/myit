const User = require('../models/User');
const Person = require('../models/Person');
const Course = require('../models/Course');
const jwt = require('jsonwebtoken')
const {getPhone} = require('../components/Phone')
const Lead = require("../models/Leads");
const LeadAction = require("../models/LeadAction");
const LeadArchive = require("../models/LeadArchive");
const {secret} = require('../config/app').jwt;

exports.all = async (req,res)=>{
    const course = await Course.query()
    res.status(200).json({
        success: true,
        data: course
    })

}

exports.create = async (req,res)=>{
    try {
        const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
        // console.log('cc',candidate)
        Course.query().insert(req.body).then(async (course) => {
            return res.status(200).json({success:true, message: "Muvoffaqiyatli saqlandi",data: course});


        }).catch((err) => {
            return res.status(400).json({ success: false, msg: err })
        })


        return res.status(200).json({ success: true })

    } catch (err) {
        return console.log(err)
    }
}

exports.update = async (req,res)=>{
    try {
        const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);

        Course.query().findOne("id",req.params.id).update(req.body).then(async (course) => {
            return res.status(200).json({success:true, message: "Muvoffaqiyatli saqlandi",data: course});
        }).catch((err) => {
            return res.status(400).json({ success: false, msg: err })
        })

        return res.status(200).json({ success: true })
    } catch (err) {
        return console.log(err)
    }
}