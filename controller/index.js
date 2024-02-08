const {signup , login, fetchUser} = require('../services')
// const {signup , login} = require('../services/aes')
const {secretkey} = require('../constant');
const  jwt  = require("jsonwebtoken");
const {uppercaseRegex ,lowercaseRegex , digitRegex , specialRegex} = require('../constant');
// const signController = async (req, res) => {
//     try {
//         const { name, email, password } = req.body;
//         console.log(name, email, password);

//         const controllerResponse = await signup(name, email, password);
        
//         console.log("controllerResponse", controllerResponse);
//         // res.send("user registered");
//         res.send(controllerResponse);
//     } catch (error) {
//         console.error("Error in signController:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };

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

// const loginController = async (req, res) => {
//     try {
//         const { email, password } = req.body;
//         const controllerResponse = await login(email, password);

//         console.log("login controller", controllerResponse);
//         res.send(controllerResponse);
//     } catch (error) {
//         console.error("Error in loginController:", error);
//         res.status(500).send("Internal Server Error");
//     }
// };
const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const controllerResponse = await login(email, password);
        const userData = controllerResponse[0];
        console.log("login controller", controllerResponse[0].id);
        const token =  jwt.sign(
            {
                id:userData.id,
                name:userData.name,
                email:userData.email
            },
            secretkey,
            { expiresIn: '15s' } 
        );
        console.log(token);
        res.cookie("accessToken", token, {
            httpOnly: false,
            path: "/" ,
            secure:true,
            sameSite: "none",
        })
        res.send(controllerResponse);
    } catch (error) {
        console.log("sdfds" , error.message);
        // if (error.message == "User not found") {
        //     return res.send("user not found");
        // } else if (error.message == "Incorrect password") {
        //     // return res.send({
        //     //     success : false,
        //     //     message : "Incorrect password"
        //     // });
        //     return res.send("Incorrect password")
        // } else {
        //     return res.send("Internal Server Error");
        // }
        res.send({
            "success":"false",
            "message": error.message
        })
    }
};
const checkUser = async(req, res)=>{
        // const {id} = req.body;
        const id  = req.id;
        console.log("checkUser",id);
        const userData = await fetchUser(id);
        return res.send(userData);
}
module.exports = {signController , loginController , checkUser};