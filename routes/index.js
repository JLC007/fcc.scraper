var express = require('express');
var router = express.Router();
var server = require('../server/sections.js');

//router.get('/users',server.getAllUsers);
router.get('/user/:name',server.getCourseSections);

module.exports = router;