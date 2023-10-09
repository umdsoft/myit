const jwt = require('jsonwebtoken')
const {secret,tokens} = require('./app').jwt
const { uuid } = require('uuidv4');
const Token = require('../models/Token')
const generateAccessToken = (userId) =>{
    const payload = {userId,type:tokens.access.type}
    const options = {expiresIn:tokens.access.expiresIn}
    return jwt.sign(payload,secret,options)
}
const generateRefreshToken = () =>{
    const payload = {
        id: uuid(),
        type:tokens.refresh.type
    }
    const options = {
        expiresIn: tokens.refresh.expiresIn
    }
    return {
        id: payload.id,
        token:jwt.sign(payload,secret,options)
    }
}

const replaceDbRefreshToken = async (tokenId,userId)=>{
    await Token.query().where('userId',userId).del()
    await Token.query().insert({tokenId,userId})
}

module.exports={
    generateAccessToken,
    generateRefreshToken,
    replaceDbRefreshToken
}