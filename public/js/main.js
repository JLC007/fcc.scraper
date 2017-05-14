function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}


//test function removing http call for testing
function httpGetTest(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", '/sources/jlc007.json', false); // false for synchronous request
    xmlHttp.send(null);
    //console.log(xmlHttp.responseText);
    return xmlHttp.responseText;
}

function getUserStats(name) {
    //console.log(name);
    //return httpGet('http://localhost:3500/user/' + name);
    return httpGet('https://fcc-scraper.herokuapp.com/user/' + name);
}

function getMainSections() {
    //console.log(name);
    return httpGet('http://localhost:3500/mainsections');
}

function getSubSections()
{
    return httpGet('http://localhost:3500/subsections');
}


