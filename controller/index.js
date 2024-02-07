const {signup , login} = require('../services')
// const {signup , login} = require('../services/aes')
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
            "success":"true",
            "Message":"message from controller",
            "controllerResponse": "Not a valid Password"
            })
        }else{
            const controllerResponse = await signup(name, email, password);
        
            console.log("controllerResponse", controllerResponse);
            res.status(201).send({
                "success":"true",
                "Message":"message from controller",
                controllerResponse});
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

        console.log("login controller", controllerResponse);
        res.send(controllerResponse);
    } catch (error) {
        console.log("sdfds" , error.message);
        if (error.message == "User not found") {
            return res.send("user not found");
        } else if (error.message == "Incorrect password") {
            // return res.send({
            //     success : false,
            //     message : "Incorrect password"
            // });
            return res.send("Incorrect password")
        } else {
            return res.send("Internal Server Error");
        }
    }
};

module.exports = {signController , loginController};