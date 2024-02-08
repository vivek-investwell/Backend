const {setData, loginData }= require("../repository/db2")
var crypto = require('crypto');

const signup  = async( name , email , password)=>{
    console.log("sign up main",name ,email,password);
    if(password.length < 6){
        return "password too small! minimum 6 character allowed";
    }   

    const checkEmail = email.substring(email.length-10 , email.length +1);
    if(!(checkEmail === '@gmail.com')){
        return "not a valid email"; 
    }

    const message = password;
    const key = crypto.scryptSync(message, 'salt', 16);
    const iv = crypto.randomBytes(16);
    const storeiv = iv.toString('hex');
    const storekey = key.toString('hex');
    const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    let encryptedText = cipher.update(message, 'utf-8', 'hex');
    encryptedText += cipher.final('hex');

    const response = await setData(name , email , encryptedText ,storekey , storeiv);
    console.log("Response" , response);
    return response;
}
const login =async(email , PASSWORD)=>{
   
   
    const response = await loginData(email , PASSWORD);
    if (response.length > 0) {
        const singleData = response[0];
        console.log("single", singleData.password);
        const div = Buffer.from(singleData.storeiv , 'hex'); 
        const dkey = Buffer.from(singleData.storekey , 'hex'); 
        const decipher = crypto.createDecipheriv('aes-128-cbc', dkey, div);
        let decryptedText = decipher.update(singleData.password, 'hex', 'utf-8');
        decryptedText += decipher.final('utf-8');
        console.log('Decrypted Text:', decryptedText);

        if (decryptedText === PASSWORD) {
            console.log("loggedIn");
            return response;
        } else {    
            return "Incorrect password";
        }
    } else {
        return "User not found";
    }
    console.log("auth.service main" , response);
}

// const key = crypto.scryptSync(message, 'salt', 16);
    // const iv = crypto.randomBytes(16);
    // const storeiv = iv.toString('hex');
    // const storekey = key.toString('hex');
    // const cipher = crypto.createCipheriv('aes-128-cbc', key, iv);
    // let encryptedText = cipher.update(message, 'utf-8', 'hex');
    // encryptedText += cipher.final('hex');
    // console.log("encryptedtext" , encryptedText);
    // const div = Buffer.from(storeiv , 'hex'); 
    // const dkey = Buffer.from(storekey , 'hex'); 
    // const decipher = crypto.createDecipheriv('aes-128-cbc', dkey, div);
    // let decryptedText = decipher.update(encryptedText, 'hex', 'utf-8');
    // decryptedText += decipher.final('utf-8');
    // console.log('Decrypted Text:', decryptedText);
   
module.exports  = {signup , login}; 