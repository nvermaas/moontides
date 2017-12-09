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
    getMoonPhasesAPI(year);
}

function getNewMoons(year) {
    getNewMoonsAPI(year);
}


// === IMPLEMENTATION (private functions) ===

// do the ajax api call.
function getMoonPhasesAPI(year) {
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

    // on callback, write the result into the local datamodel
    moontides = new MoonTides();
    moontides.addJsonResult(my_result);

    moontides.addDayOfTheYear();
    moontides.showData("moontides");
}

// do the ajax api call.
function getNewMoonsAPI(year_tag) {
    year = parseInt(document.getElementById(year_tag).value)
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

// do the ajax api call.
function getNewMoonsPrev(year_tag) {
    year = parseInt(document.getElementById(year_tag).value) - 1
    document.getElementById(year_tag).value = year;

    console.log("getNewMoonsPrev("+year+")")
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

// do the ajax api call.
function getNewMoonsNext(year_tag) {
    year = parseInt(document.getElementById(year_tag).value) + 1
    document.getElementById(year_tag).value = year;

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
function myNewMoonsCB(my_result, my_status) {
    // on callback, write the result into the local datamodel
    moontides = new MoonTides();
    moontides.addJsonResult(my_result, "New Moon");

    moontides.addDayOfTheYear();
    moontides.addCourseUnit();

    year = parseInt(document.getElementById("year_textbox").value);
    moontides.drawMoon(year, "canvas")
    moontides.showData("moontides");

}