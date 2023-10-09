const User = require('../models/User');
const Person = require('../models/Person');
const group = require('../models/Group');
const jwt = require('jsonwebtoken')
const {getPhone} = require('../components/Phone');
const Student = require('../models/Student');
const {secret} = require('../config/app').jwt;

exports.new = async (req,res)=>{
    const data = await group.query().where('status_id',1).orderBy('id',"desc")
    res.status(200).json({
        success: true,
        data: data
    })
}

exports.running = async (req,res)=>{
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const data = await group.query().whereRaw("id in (select group_id from student where person_id = "+candidate.userId+") and status_id = 2")

    res.status(200).json({
        success: true,
        data: data
    })

}

exports.done = async (req,res)=>{
    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const data = await group.query().whereRaw("id in (select group_id from student where person_id = "+candidate.userId+") and status_id = 3")

    res.status(200).json({
        success: true,
        data: data
    })

}

exports.my = async (req,res)=>{

    const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
    const student = Student.query().where('group_id',req.params.id).andWhere("person_id",candidate.userId).andWhere("<>","status",2).groupBy("group_id").first();

    res.status(200).json({
        success: true,
        data: student,
    })

}