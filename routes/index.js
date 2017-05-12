var express = require('express');
var router = express.Router();
var server = require('../server/server.js');

//router.get('/users',server.getAllUsers);
router.get('/user/:name',server.getSingleUser);
router.get('/mainsections',server.getMainSections);
router.get('/subsections',server.getSubSections);

module.exports = router;