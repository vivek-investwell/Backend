// const {setData, loginData }= require("../repository/db")
const {setData, loginData,getData }= require("../repository/db2")
var CryptoJS = require("crypto-js");
var SHA256 = require("crypto-js/sha256");
var crypto = require('crypto');
const {Buffer}  = require('buffer');
const encrypt = (password,salt)=>{
    // const salt = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    const hashedText = hash.update(password + salt).digest('hex');
    return hashedText;
}
// const signup  = async( name , email , password)=>{
//     console.log("sign up main",name ,email,password);
//     if(password.length < 6){
//         return "password too small! minimum 6 character allowed";
//     }   

//     const checkEmail = email.substring(email.length-10 , email.length +1);
//     if(!(checkEmail === '@gmail.com')){
//         return "not a valid email"; 
//     }
//     const message = password;
//     const salt = crypto.randomBytes(16).toString('hex');

//     const hash = crypto.createHash('sha256');
//     const hashedText = hash.update(password + salt).digest('hex');
//     const response = await setData(name , email , hashedText , salt);
//     console.log("Response" , response);
//     return response;
// }
const signup = async (name, email, password) => {
    console.log("sign up main", name, email, password);
    if (password.length < 6) {
        throw new Error("Password too small! Minimum 6 characters allowed");
    }

    const checkEmail = email.substring(email.length - 10, email.length + 1);
    if (!(checkEmail === '@gmail.com')) {
        throw new Error("Not a valid email");
    }

    const message = password;
    const salt = crypto.randomBytes(16).toString('hex');
    const HASHTEXT = encrypt(password , salt);
    // const SALT = ENCRYPT.salt;
    // const HASHTEXT = ENCRYPT.hashedText;
    // const hash = crypto.createHash('sha256');
    // const hashedText = hash.update(password + salt).digest('hex');

    const response = await setData(name, email, HASHTEXT, salt);
    if(response === 'user already exist'){
        throw new Error(response);
    }
    console.log("Response", response);
    return response;
}

// const login =async(email , PASSWORD)=>{
//     const message = PASSWORD;
    
    
//     const response = await loginData(email , PASSWORD);
//     if (response.length > 0) {
//         const singleData = response[0];
//         console.log("single", singleData.password);
//         const fetchedSalt = singleData.salt;
//         const hash = crypto.createHash('sha256');
//         const hashPass = hash.update(PASSWORD + fetchedSalt).digest('hex');
       
//         if (singleData.password === hashPass) {
//             console.log("loggedIn");
//             return response;
//         } else {    
//             return "Incorrect password";
//         }
//     } else {
//         return "User not found";
//     }
//     console.log("auth.service main" , response);
// }
const login = async (email, PASSWORD) => {
    const message = PASSWORD;
    const response = await loginData(email, PASSWORD);
    if (response.length > 0) {
        const singleData = response[0];
    // console.log("response",singleData)
        console.log("single", singleData.password);
        const fetchedSalt = singleData.salt;
        // const hash = crypto.createHash('sha256');
        const hashPass = encrypt(PASSWORD , fetchedSalt);
        // const hashPass = hash.update(PASSWORD + fetchedSalt).digest('hex');

        if (singleData.password === hashPass) {
            console.log("loggedIn");
            return response;
        } else {
            throw new Error("Incorrect password");
        }
    } else {
        throw new Error("User not found");
    }
    console.log("auth.service main", response);
}
const fetchUser = async(id)=>{
        const userData = await getData(id);
        return userData;
}
module.exports  = {signup , login , fetchUser}; 