const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const auth = require('./routes')
var mysql = require('mysql')
app.use(bodyParser.json());
// const pool = require('./dataabase')
// const{ pool} = require('./repository/db');
// pool;
const{ con} = require('./repository/db2');
con;
const cors = require('cors');
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposedHeaders: ["Content-Length", "Authorization"],
    credentials: true,
  })
);
  // const pool = mysql.createPool(
  //   {
  //       host:"localhost",
  //       user:"root",
  //       password:"ajjuvivek123",
  //       database:"first_project" 
  //     }
  // );
  // pool.getConnection((err , connecttion)=>{
  //   if(err){
  //     console.log(err);
  //   }else{
  //     console.log("connected")
  //   }
  // })
  app.use('/auth',auth)
 
  app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

  // module.exports = pool;
  // console.log(pool);