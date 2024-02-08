const express = require('express');
const { signController , loginController ,checkUser} = require('../controller');
const router = express.Router();
const {verifyToken} = require('../middleware/middleware')
// router.post('/login' , );
router.post('/sign', signController);
router.post('/login',loginController);
router.get('/checkuser',verifyToken,checkUser);
module.exports = router;