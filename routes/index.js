const express = require('express');
const { signController , loginController ,checkUser , readFile, pdfLink,logout } = require('../controller');
const router = express.Router();
const {verifyToken} = require('../middleware/middleware')
// router.post('/login' , );
router.post('/sign', signController);
router.post('/login',loginController);
router.get('/checkuser',verifyToken,checkUser);
router.get('/getPDFlist', readFile);
router.get('/pdfLink', pdfLink);
router.post('/logout', logout);

// router.get('/pdfLink/:name', singlePdfLink);

module.exports = router;