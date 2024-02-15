const jwt = require("jsonwebtoken");
const { secretkey } = require("../constant");
const verifyToken = async(req , res , next)=>{
        const token = req.cookies.accessToken;
        console.log("token" , token);
        if(!token){
            res.send("user logged out");
        }

jwt.verify(token , secretkey , async(err , payload)=>{
    if(!payload){
       return res.send("user logged out");
    }
    console.log("payload" , payload);
    req.id= payload.id;
    next();
})
}
module.exports = {verifyToken};
