/**
 * Created by Vermaas on 6/16/2017.
 */

window.onload = function(){
    // initialisation
    // the onload makes sure that all functions in this script file are loaded before the html is rendered
 }

var moonphases_resource = "http://api.usno.navy.mil/moon/phase"

// === INTERFACE (public functions) ===

function getMoonPhases(year) {
    console.log("getMoonPhases("+year+")");
    getMoonPhasesAPI(year);
}

function getNewMoons(year) {
    console.log("getNewMoons("+year+")");
    getNewMoonsAPI(year);
}


// === IMPLEMENTATION (private functions) ===

// do the ajax api call.
function getMoonPhasesAPI(year) {
    console.log("getMoonPhasesAPI("+year+")")
    var my_url = moonphases_resource+"?date=1/1/"+year+"&nump=50";
    var html_url = "<a href = \"" + my_url + "\">" + my_url + "</a>";

    // execute an asynchronous GET to the API,
    // and execute 'myMoonTidesCB' when the results come back.
    $.ajax({
        url: my_url,
        type: 'GET',
        crossDomain: true,
        success: function() { console.log('GET completed'); }
    }).done( myMoonTidesCB );
}

// the callback function for the ajax call
function myMoonTidesCB(my_result, my_status) {
    console.log("myMoonTidesCB(" + my_result + "," + my_status + ")");

    // on callback, write the result into the local datamodel
    moontides = new MoonTides();
    moontides.addJsonResult(my_result);

    moontides.addDayOfTheYear();

    moontides.showData("moontides");
}

// do the ajax api call.
function getNewMoonsAPI(year) {
    console.log("getNewMoonsAPI("+year+")")
    var my_url = moonphases_resource+"?date=1/1/"+year+"&nump=50";
    var html_url = "<a href = \"" + my_url + "\">" + my_url + "</a>";

    // execute an asynchronous GET to the API,
    // and execute 'myMoonTidesCB' when the results come back.
    $.ajax({
        url: my_url,
        type: 'GET',
        crossDomain: true,
        success: function() { console.log('GET completed'); }
    }).done( myNewMoonsCB );
}

// the callback function for the ajax call
function myNewMoonsCB(my_result, my_status, myFilter) {
    console.log("myNewMoonsCB(" + my_result + "," + my_status + ")");

    // on callback, write the result into the local datamodel
    moontides = new MoonTides();
    moontides.addJsonResult(my_result, "New Moon");

    moontides.addDayOfTheYear();
    moontides.addCourseUnit();

    moontides.showData("moontides");
}