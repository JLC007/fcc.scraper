var express = require('express');
var request = require('request');
var cheerio = require('cheerio');




function getSingleUser(req, res, next) {

    if (req.params.name === undefined) {
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify("ErrorMessage", "Please provide a user name"));
    }

    var url = 'https://www.freecodecamp.com/' + req.params.name;
    var r = request.defaults();
    var user = { name: '', profileImage: '', location: '', completed: [] };

    user.name = "";
    user.profileImage = "";
    user.location = "";

    r(url, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);

            $('.public-profile-img').filter(function () {
                var data = $(this);

                profileImage = data[0].attribs.src;
                name = data.next().next().text();
                location = data.parent().find('.flat-top.wrappable').slice(1).text();

                user.name = name;
                user.profileImage = profileImage;
                user.location = location;
            })

            $('tr').filter(function (i, element) {
                if (i === 0) {
                    return true;
                }

                var challenge = {};
                challenge.title = '';
                challenge.completed_at = '';
                challenge.title = $(this).children().first().text();
                challenge.completed_at = $(this).children().eq(1).text();
                challenge.status = 0;

                user.completed.push(challenge);
            });
        }

        function search(nameKey, myArray) {
            var array = myArray.completed;
            for (var i = 0; i < array.length; i++) {
                if (array[i].title === nameKey) {
                    return array[i];
                }
            }
        }

        var result = [];

        var filePath = './sources/course.json';
        //Sync
        var fs = require('fs');
        var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        var totalmainsections = 0;
        var totalsubsections = 0;
        var totalsections = 0;

        var totalmainsectionscompleted = 0;
        var totalsubsectionscompleted = 0;

        obj.forEach(function (element) {
            element.subheader.forEach(function (item) {
                item.sections.forEach(function (section) {
                    var found = search(section, user);
                    if (found !== undefined) {
                        result.push(
                            {
                                mainsection: element.name,
                                subsection: item.name,
                                maptitle: section,
                                title: found.title,
                                completed: found.title === section,
                                date_completed: found.completed_at
                            });
                    }
                    else {
                        result.push({
                            mainsection: element.name,
                            subsection: item.name,
                            maptitle: section,
                            title: "Not Completed",
                            completed: false,
                            date_completed: ''
                        });
                    }

                });

            });
        });

        if (!error && response.statusCode != 200) {
            res.setHeader('content-type', 'application/json');
            res.send(JSON.stringify("ErrorMessage", "Please enter a valid user name"));
        }
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify({ name: user.name, avater: user.profileImage, progress: result }, null, 3));
    });
}

function getMainSections(req, res, next) {
    var mainsections = [];
    var filePath = './sources/course.json';
    //Sync
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    obj.forEach(function (element) {

        mainsections.push(element.name);
    });
   
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(mainsections, null, 3));
}

function getSubSections(req, res, next) {
    var subsections = [];
    var filePath = './sources/course.json';
    //Sync
    var fs = require('fs');
    var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));

    obj.forEach(function (element) {
        element.subheader.forEach(function (item) {
            subsections.push(item.name);
        });
    });
    res.setHeader('content-type', 'application/json');
    res.send(JSON.stringify(subsections, null, 3));
}

module.exports = { getSingleUser: getSingleUser, getMainSections: getMainSections, getSubSections: getSubSections }