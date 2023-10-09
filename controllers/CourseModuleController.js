const User = require('../models/User');
const Person = require('../models/Person');
const Course = require('../models/Course');
const CourseModule = require('../models/CourseModule');
const jwt= require('jsonwebtoken');
const {getPhone} = require('../components/Phone')
const {secret} = require('../config/app').jwt;

exports.all = async (req,res)=>{
    const module = await CourseModule.query().where('course_id',req.params.id).orderBy("sort","ASC");
    res.status(200).json({
        success: true,
        data: module
    })
}

exports.create = async (req,res)=> {
    try {
        const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
        // console.log('cc',candidate)
        const course_id = req.body.course_id;
        const name = req.body.name;
        let sort_q = await CourseModule.query().where("course_id",course_id).max("sort");

        let sort = sort_q[0]["max(`sort`)"];


        if(!sort){
            sort = 0;
        }
        sort ++;

        const ins = await CourseModule.query().insert({
            course_id,
            name,
            sort
        }).catch((err) => {
            return res.status(400).json({ success: false, msg: err })
        });

        res.status(200).json({success:true, data: ins});


    } catch (err) {
        return console.log(err)
    }
}

exports.update = async (req,res)=> {
    try {
        const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
        // console.log('cc',candidate)
        const query = await CourseModule.query().findOne("id",req.params.id).update({
          name : req.body.name,
        }).catch((err) => {
            return res.status(400).json({ success: false, msg: err })
        })

        res.status(200).json({success:true, message: "Item was Updated"});


    } catch (err) {
        return console.log(err)
    }
}

exports.delete = async (req,res)=> {
    try {
        CourseModule.query().deleteById(req.params.id).catch((err) => {
            return res.status(400).json({ success: false, msg: err })
        });

        res.status(200).json({success:true, message: "Item was deleted"});

    } catch (err) {
        return console.log(err)
    }
}

exports.up = async (req,res)=> {
    try {
        const modul = await CourseModule.query().where("id",req.params.id).first();
        const up = await CourseModule.query().where("course_id",modul.course_id).andWhere("sort","<",modul.sort).orderBy("sort","DESC").first();
        if(up){
            CourseModule.query().findOne("id",modul.id).update({
                sort: up.sort
            }).then((ress)=>{
                CourseModule.query().findOne("id",up.id).update({
                    sort: modul.sort
                }).catch((err)=>{
                    return res.status(400).json({success:false,message: "Modulni almashtirishda xatolik"})
                })
            }).catch((err)=>{
                return res.status(400).json({success:false,message: "Modulni almashtirishda xatolik"})
            })
        }else{
            return res.status(400).json({success:false,message: "Bu modul eng balandda turibdi"})
        }
        return res.status(200).json({
            success: true,
            message: "Modul bir pog`ona yuqoriga ko`tarildi"
        });

    } catch (err) {
        return console.log(err)
    }
}

exports.down = async (req,res)=> {
    try {
        const modul = await CourseModule.query().where("id",req.params.id).first();
        const up = await CourseModule.query().where("course_id",modul.course_id).andWhere("sort",">",modul.sort).orderBy("sort","ASC").first();
        if(up){
            CourseModule.query().findOne("id",modul.id).update({
                sort: up.sort
            }).then((ress)=>{
                CourseModule.query().findOne("id",up.id).update({
                    sort: modul.sort
                }).catch((err)=>{
                    return res.status(400).json({success:false,message: "Modulni almashtirishda xatolik"})
                })
            }).catch((err)=>{
                return res.status(400).json({success:false,message: "Modulni almashtirishda xatolik"})
            })
        }else{
            return res.status(400).json({success:false,message: "Bu modul eng pastda turibdi"})
        }
        return res.status(200).json({
            success: true,
            message: "Modul bir pog`ona pastga tushdi"
        });

    } catch (err) {
        return console.log(err)
    }
}