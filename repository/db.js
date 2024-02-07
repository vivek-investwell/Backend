
var mysql = require('mysql')
var pool;
const config  = require('../database.json');
console.log(config);
 pool = mysql.createPool(
    config
  );
  pool.getConnection((err , connecttion)=>{
    if(err){
      console.log(err);
    }else{
      console.log("connected")
    }
})
// var con;
// con = mysql.createConnection(config);
// con.connect(function(err){
//     if(err) throw err;
//     console.log("connected");
   
//   })

const setData = async ( NAME, EMAIL, PASSWORD,SALT) => {
    return new Promise((resolve, reject) => {
        console.log("database main", NAME, EMAIL, PASSWORD);
        pool.query(`SELECT * FROM users WHERE email = ? `, [EMAIL], (err, data) =>{
            if (err) {
                console.error(err);
                reject("error checking user existence");
                return;
            }

            if(data.length>0){
                resolve("user already exist");
            }else{
                pool.query(`INSERT INTO users (name, email, password,salt) VALUES ('${NAME}', '${EMAIL}', '${PASSWORD}' ,'${SALT}')`, (err, res) => {
                    if (err) {
                        console.error(err);
                        reject("errorrrrr");
                    } else {
                        resolve("user registered");
                    }
                });
            }
        })
       
    });
};

// const loginData =  (EMAIL, PASSWORD) => {
//     return new Promise((resolve, reject) => {
//         pool.query(`SELECT * FROM users WHERE email ='${EMAIL}'`, (err, data) => {
//             if (err) {
//                 console.error(err);
//                 reject("errorrrrr");
//             } else {
//                 if (data.length > 0) {
//                     const singleData = data[0];
//                     console.log("single", singleData.password);
//                     if (singleData.password === PASSWORD) {
//                         console.log("loggedIn");
//                         resolve(data);
//                     } else {    
//                         resolve("Incorrect password");
//                     }
//                 } else {
//                     resolve("User not found");
//                 }
//             }
//         });
//     });
// }
const loginData =  (EMAIL, PASSWORD) => {
  return new Promise((resolve, reject) => {
      pool.query(`SELECT * FROM users WHERE email ='${EMAIL}'`, (err, data) => {
          if (err) {
              console.error(err);
              reject("errorrrrr");
          } else {
              resolve(data);
          }
      });
  });
}


module.exports = {setData  , loginData , pool};
