const {signup , login, fetchUser } = require('../services')
// const {signup , login} = require('../services/aes')
const {secretkey} = require('../constant');
const  jwt  = require("jsonwebtoken");
const fs = require('node:fs');
const folderPath = '/home/vivek/office/first_project/frontend/public/pdf';
const path = require('path');
const {uppercaseRegex ,lowercaseRegex , digitRegex , specialRegex} = require('../constant');
const { json } = require('body-parser');
const client = require('../redisconnect');

const signController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(name, email, password);
        if(!(uppercaseRegex.test(password) && lowercaseRegex.test(password) && digitRegex.test(password) && specialRegex.test(password))){
            res.status(200).send({
            "success":"false",
            "Message":"Not a valid Password"
            })
        }else{
            try{
            const controllerResponse = await signup(name, email, password);
            console.log("controllerResponse", controllerResponse);
            res.status(201).send({
                "success":"true",
                "Message":"no error",
                controllerResponse});
            }catch(error){
                console.log("error", error.message);
                const issue  = error.message;
                res.status(201).send({
                    "success":"false",  
                    "Message":issue,
                    });
            }
        
            // console.log("controllerResponse", controllerResponse);
            // res.status(201).send({
            //     "success":"true",
            //     "Message":"no error",
            //     controllerResponse});
        }
      
       
    } catch (error) {
        console.error("Error in signController:", error);
        res.status(500).send({
            "success":"false",
            "Message":"Internal Server Error"},
            {}
            );
    }
};


const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const controllerResponse = await login(email, password);
        console.log("controller main check" , controllerResponse)
        const userData = controllerResponse[0];
        console.log("login controller", controllerResponse[0].id);
        const token =  jwt.sign(
            {
                id:userData.id,
                name:userData.name,
                email:userData.email
            },
            secretkey,
            { expiresIn: '1200s' } 
        );
        console.log(token);
        res.cookie("accessToken", token, {
            httpOnly: false,
            path: "/" ,
            secure:true,
            sameSite: "none",
        })

        // await client.hSet('users', {
        //     id:userData.id,
        //     name:userData.name,
        //     email:userData.email
        // })
        res.send(controllerResponse);
    } catch (error) {
        console.log("sdfds" , error.message);
   
        res.send({
            "success":"false",
            "message": error.message
        })
    }
};
const checkUser = async(req, res)=>{
        // const {id} = req.body;
        const id  = req.id;
        // const user = await client.hGetAll('users');
        // console.log(user.id);
        // if(user){
        //     return res.send({
        //         "id":user.id,
        //         "name":user.name
        //     })
        // }
        const userData = await fetchUser(id);
        console.log("checkUser",userData);
        return res.send(userData);
}

const readFile=(req , res)=>{
    const file =  fs.readdirSync(folderPath).map((fileName)=>{
            const filePath = path.join(folderPath , fileName); 
            if(path.extname(filePath) === '.pdf'){
            return filePath;
            }
    }).filter(Boolean);
    console.log(file);
    const result = []; 
    file.forEach((single)=>{
        const name = path.basename(single , path.extname(single));
        result.push({
            "name":name,
            "path": single
        })
    })
    console.log(result);
          
    console.log(file);
    return res.send(result);
}

const pdfLink = (req, res) => {
    const file =  fs.readdirSync(folderPath).map((fileName)=>{
        const filePath = path.join(folderPath , fileName); 
        if(path.extname(filePath) === '.pdf'){
        return filePath;
        }
}).filter(Boolean);
    // return res.send(file);
    console.log(file[0]);
    const fileStream = fs.createReadStream(file[0]);
    // fileStream.pipe(res);
    // return res.send(file); 
    fileStream.on('open', () => {
        res.setHeader('Content-Type', 'application/pdf');
        fileStream.pipe(res);
    });
}

const logout = async (req , res)=>{
    await client.hDel('users','id');
    await client.hDel('users','name');
    await client.hDel('users','email');
    res.clearCookie("accessToken",{
        sameSite:"none",
        secure:true,
    })
    .send("user has been logged out");
}
module.exports = {signController , loginController , checkUser, readFile, pdfLink,logout} ;