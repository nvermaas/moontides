/**
 * Created by Vermaas on 6/16/2017.
 */

window.onload = function(){
    // initialisation
    // the onload makes sure that all functions in this script file are loaded before the html is rendered
}

//var moonphases_resource_old = "http://api.usno.navy.mil/moon/phase"

var moonphases_api_uilennest = "https://uilennest.net/my_astrobase/moonphases" // no cors headers
//var moonphases_api_uilennest = "https://uilennest.net/homebase/datacenter/moonphases" // no cors headers
//var moonphases_api_uilennest = "http://localhost:8000/homebase/moonphases" // gives back cors headers!

// === INTERFACE (public functions) ===

function getNewMoons(year) {
    getNewMoonsAPI(year);
}


// === IMPLEMENTATION (private functions) ===

// do the ajax api call.
function getNewMoonsAPI(year_tag) {
    year = parseInt(document.getElementById(year_tag).value)

    var my_url = moonphases_api_uilennest+"?year="+year;

    // execute an asynchronous GET to the API,
    // and execute 'myMoonTidesCB' when the results come back.
    $.ajax({
        url: my_url,
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        success: function() { console.log('GET completed'); }
    }).done( myNewMoonsCB );
}

// do the xhr api call.
function getNewMoonsAPI_xhr(year_tag) {
    year = parseInt(document.getElementById(year_tag).value)
    var my_url = moonphases_api_uilennest+"?year="+year;

    // execute an asynchronous GET to the API,
    // and execute 'myMoonTidesCB' when the results come back.
    var xhr = new XMLHttpRequest();
    xhr.open("GET", my_url, true);
    xhr.onload = myMoonTidesCB;
    xhr.send();
}

// do the ajax api call.
function getNewMoonsAPI_ajax(year_tag) {
    year = parseInt(document.getElementById(year_tag).value)
    var my_url = moonphases_api_uilennest+"?year="+year;

    // execute an asynchronous GET to the API,
    // and execute 'myMoonTidesCB' when the results come back.
    $.ajax({
        url: my_url,
        type: 'GET',
        crossDomain: true,
        success: function() { console.log('GET completed'); }
    }).done( myNewMoonsCB );
}

// do the fetch api call.
function getNewMoonsAPI_fetch(year_tag) {
    year = parseInt(document.getElementById(year_tag).value)
    var my_url = moonphases_api_uilennest+"?year="+year;

    // execute an asynchronous GET to the API,
    // and execute 'myMoonTidesCB' when the results come back.
    fetch(my_url, {mode : 'cors'})
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            myNewMoonsCB(data)
        });
}


// do a ajax api call.
function getNewMoonsPrev(year_tag) {
    year = parseInt(document.getElementById(year_tag).value) - 1
    document.getElementById(year_tag).value = year;
    getNewMoons(year_tag)
}

// do the ajax api call.
function getNewMoonsNext(year_tag) {
    year = parseInt(document.getElementById(year_tag).value) + 1
    document.getElementById(year_tag).value = year;
    getNewMoons(year_tag)
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

// the callback function for the ajax call
function myNewMoonsCB_testing(my_result, my_status) {
    // on callback, write the result into the local datamodel
    alert(my_result)
}