const User = require('../models/User');
const jwt = require('jsonwebtoken')
const {getPhone} = require('../components/Phone')
const bcrypt = require('bcryptjs')
const authHelper = require('../config/authHelper')
const {secret} = require('../config/app').jwt
const Token = require('../models/Token')
const JWT = require("jsonwebtoken");
const updateToken = (userId)=>{
	const accessToken = authHelper.generateAccessToken(userId)
	const refreshToken = authHelper.generateRefreshToken()

	return authHelper.replaceDbRefreshToken(refreshToken.id,userId).then(()=>({
		accessToken,
		refreshToken:refreshToken.token
	}))
}

exports.findByAccessToken = async (req, res)=>{
	try {
		const model = await User.query().findOne('access_token',req.header.access_token);
		return res.status(200).json({ success: true, data: model });
	} catch (error) {
		console.log(error);
	}
}

exports.login = async (req,res)=>{
	try {
	     const user = await User.query().where("username", req.body.login).first();
			if (!user) {
				return res
					.status(404)
					.json({ success: false, message: "user-not-found" });
			}
			if (!bcrypt.compareSync(req.body.password, user.password)) {
				return res.status(400).json({ success: false, message: "error" });
			}
			updateToken(user.id).then(tokens=>res.status(200).json(tokens))
			// return res.status(200).json({ success: true, token });

	} catch (error) {
		return res.status(400).json({success: false,error})
	}
}
exports.refreshToken = async (req,res)=>{
	const {refreshToken} = req.body
	let payload
	try{
		payload = jwt.verify(refreshToken,secret)
		if(payload.type !== 'refresh'){
			res.status(400).json({success: false,error:'Invalid token!'})
		}
	} catch(e){
		if(e instanceof jwt.TokenExpiredError){
			return res.status(400).json({success: false,error:'Token expired!'})
		} else if (e instanceof jwt.JsonWebTokenError){
			return res.status(400).json({success: false,error:'Invalid token!'})
		}
	}
	await Token.query().where('tokenId',payload.id).first().execute()
		.then((token)=>{
		if(token === null){
			throw new Error('Invalid token!')

		}
		updateToken(token.userId)
	})
		.then(tokens=>res.status(200).json(tokens))
		.catch(err=>res.status(400).json({success: false,error:err.message}))



}

exports.create = async (req, res)=>{
	if(req.body.secret != "123asditkhorezmuz"){
		res.status(200).json({
			success: false,
			message: "Sizga bu joyga kirishga ruhsat yo`q!"
		})
	}
	try {
		const salt = await bcrypt.genSaltSync(12)
		const password = await bcrypt.hashSync(req.body.password,salt)
		const person = await Person.query().where('phone',req.body.phone).first();
		await User.query().insert({
			person_id: person.id,
			username: getPhone(req.body.phone),
			password: password,
		})
		return res.status(200).json({success:true})

	}catch (err){
		console.log(err);
	}
}


exports.me = async (req,res)=>{
	try{
		const candidate = jwt.decode(req.headers.authorization.split(" ")[1]);
		const person = await User.query().where('id',candidate.userId).first();
		res.status(200).json({
			success: true,
			data:person,
		});
		return;
	}catch (e){
		console.log(e);
		return;
	}

}