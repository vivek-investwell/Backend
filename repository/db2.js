
var mysql = require('mysql')
// var pool;
const config  = require('../database.json');
console.log(config);
//  pool = mysql.createPool(
//     config
//   );
//   pool.getConnection((err , connecttion)=>{
//     if(err){
//       console.log(err);
//     }else{
//       console.log("connected")
//     }
// })
var con;
con = mysql.createConnection(config);
con.connect(function(err){
    if(err) throw err;
    console.log("connected now");
   
  })
  const { promisify } = require('util');
  const queryAsync = promisify(con.query).bind(con);
  

const setData = async ( NAME, EMAIL, PASSWORD,SALT) => {
  console.log(EMAIL);
      const data = await queryAsync(`SELECT * FROM users WHERE email = ? `, [EMAIL]);
console.log("data" , data)
          if(data.length>0){
                return "user already exist";
          }else{
            await queryAsync(`INSERT INTO users (name, email, password,salt) VALUES ('${NAME}', '${EMAIL}', '${PASSWORD}' ,'${SALT}')`);
            return "user registered";
          }
};


// const setData = async ( NAME, EMAIL, PASSWORD,KEY,SALT) => {
//   console.log(EMAIL);
//       const data = await queryAsync(`SELECT * FROM newuser WHERE email = ? `, [EMAIL]);
// console.log("data" , data)
//           if(data.length>0){
//                 return "user already exist";
//           }else{
//             await queryAsync(`INSERT INTO newuser (name, email, password,storekey,storeiv) VALUES ('${NAME}', '${EMAIL}', '${PASSWORD}','${KEY}' ,'${SALT}')`);
//             return "user registered";
//           }
// };


const loginData = async (EMAIL, PASSWORD) => {
  
        const data = await queryAsync(`SELECT * FROM users WHERE email ='${EMAIL}'`);
        console.log("db2 login", data);
        return data;
   
};
// const loginData = async (EMAIL, PASSWORD) => {
  
//   const data = await queryAsync(`SELECT * FROM newuser WHERE email ='${EMAIL}'`);
//   console.log("db2 login", data);
//   return data;

// };
const getData = async(ID)=>{
  const data = await queryAsync(`SELECT id,name,email FROM users WHERE id ='${ID}'`);
  return data;
}
module.exports = {setData  , loginData ,getData,con};
