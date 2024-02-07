const express = require('express');
const { signController , loginController} = require('../controller');
const router = express.Router();
// router.post('/login' , );
router.post('/sign', signController);
router.post('/login',loginController);
module.exports = router;