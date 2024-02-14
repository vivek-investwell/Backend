const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const auth = require('./routes')
const redis = require('./redisconnect');
var mysql = require('mysql')
// const folderPath = './pdf';
app.use(bodyParser.json());
app.use(cookieParser());
// const pool = require('./dataabase')
// const{ pool} = require('./repository/db');
// pool;
const{ con} = require('./repository/db2');
con;
redis;
const cors = require('cors');
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    exposedHeaders: ["Content-Length", "Authorization"],
    credentials: true,
  })
);


  app.use('/auth',auth)
 
  app.listen(8000, () => {
    console.log('Server is running on port 8000');
});

  // module.exports = pool;
  // console.log(pool);