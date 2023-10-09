const JWT = require("jsonwebtoken");
const User = require("../models/User");
const {secret} = require("../config/app").jwt
exports.protect = async (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            data: "No authorize to access this route",
        });
    }
    try {
        //  verify token
        const decoded = JWT.verify(token, secret);
        // console.log(decoded);
        req.user = await User.query().findOne('id', decoded.userId);
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            data: "No authorize to access this route",
        });
    }
};
// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ success: false, message: "forbidden" });
        }
        next();
    };
};
// Grant access to specific roles
exports.type = (...types) => {
    return (req, res, next) => {
        if (!types.includes(req.user.type)) {
            return res.status(403).json({ success: false, message: "forbidden" });
        }
        next();
    };
};