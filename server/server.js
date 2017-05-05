var express = require('express');
var request = require('request');
var cheerio = require('cheerio');

function getSingleUser(req, res, next) {
    
    if(req.params.name === undefined){
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify("ErrorMessage", "Please provide a user name"));
    }

    var url = 'https://www.freecodecamp.com/' + req.params.name;
    var r = request.defaults();
    var user =  {name:'', profileImage: '', location : '', completed: []};
    
    user.name = ""; 
    user.profileImage = ""; 
    user.location = "";
    
    r(url, function (error, response, body) {

        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(body);

            $('.public-profile-img').filter(function(){
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
                challenge.status = 1;

                user.completed.push(challenge);
            });
        }


function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        console.log(myArray[i].name);
        console.log(nameKey);
        if (myArray[i].name === nameKey) {
            
            return myArray[i];
        }
    }
}

    var result =[];


        var filePath = './sources/course.json';



            //Sync
            var fs = require('fs');
            var obj = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            //console.log(obj);

            obj.forEach(function(element) {
                element.subheader.forEach(function(item) {
                        //console.log(element.subheader[i]);
                        //item.forEach(function(section) {
                        //console.log(item);
                        var found = search(item[0], user);
                        result.push(found);   
                
                });
                
            });
            console.log(JSON.stringify(result));



        if (!error && response.statusCode != 200) {
            res.setHeader('content-type', 'application/json');
            res.send(JSON.stringify("ErrorMessage", "Please enter a valid user name"));
        }
        res.setHeader('content-type', 'application/json');
        res.send(JSON.stringify(user, null, 3));
    });
}

module.exports = { getSingleUser: getSingleUser }