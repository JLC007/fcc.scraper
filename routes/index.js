var express = require('express');
var router = express.Router();
var server = require('../server/server.js');

//router.get('/users',server.getAllUsers);
router.get('/user/:name',server.getSingleUser);

module.exports = router;