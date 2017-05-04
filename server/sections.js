var express = require('express');
var request = require('request');
var util = require('./util');
var course = require('../sources/course.json');

function getCourseSections(req, res, next) {

    var filePath = './sources/course.json';

    console.log(course);

    console.log(1);
    console.log(util.getSingleUser(req.params.name));

    //Sync
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    console.log(2);
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(obj, null, 3));

}

module.exports = { getCourseSections: getCourseSections }