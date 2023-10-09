const Lead = require('../models/Leads')
const LeadAction = require('../models/LeadAction')
const LeadArchive = require('../models/LeadArchive')
const jwt = require('jsonwebtoken')

exports.createLead = async (req, res) => {
    try {
        const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
        // console.log('cc',candidate)
        Lead.query().insert(req.body).then(async (lead) => {
            LeadAction.query().insert({
                lead_id: lead.id,
                user_id: candidate.userId,
                type: 0,
                status: 1,
            }).then(async (action) => {
                await LeadArchive.query().insert({
                    user_id: candidate.userId,
                    action_id: action.id,
                    type: 1
                })
            }).catch((err) => {
                return res.status(400).json({ success: false, data: err })
            })
        }).catch((err) => {
            return res.status(400).json({ success: false, msg: err })
        })

        return res.status(200).json({ success: true })

    } catch (err) {
        return console.log(err)
    }
}
exports.getLeads = async (req,res)=>{
    
}