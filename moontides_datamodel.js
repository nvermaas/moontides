/**
 * Created by Vermaas on 12/3/2017.
 */
// ========= DATA MODEL ==========

/*

// example of the API results:
// http://api.usno.navy.mil/moon/phase?date=1/1/2018&nump=48
{
    "error":false,
    "apiversion":"2.0.0",
    "year":2018,
    "month":1,
    "day":1,
    "numphases":48,
    "datechanged":false,
    "phasedata":[
    {
        "phase":"Full Moon",
        "date":"2018 Jan 02",
        "time":"02:24"
    },
    {
        "phase":"Last Quarter",
        "date":"2018 Jan 08",
        "time":"22:25"
    },
    {
        "phase":"New Moon",
        "date":"2018 Jan 17",
        "time":"02:17"
    },
    {
        "phase":"First Quarter",
        "date":"2018 Jan 24",
        "time":"22:20"
    },
*/

const names = ["Star Frost", "White Waking", "Wind Tossed", "Flower Shower", "White Lady", "Love Bright", "Field Poppy", "Claim Song", "Green Still", "Blood Berry", "Leaf Dance", "Fire Friend", "Star Frost"]

const urls = [
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-one/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-two/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-three/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-four/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-five/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-six/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-seven/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-eight/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-nine/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-ten/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-eleven/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-twelve/",
    "https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-one/"
]

function getTableHeader() {
    myOutput = "<table id=\"geel\"+><tr><th>Phase</th><th>Date</th><th>Name</th><th>Day</th></tr>";
    return myOutput;
    //document.getElementById(tagOutput).innerHTML = myOutput;
}

function getTableFooter() {
    myOutput = "</table>"
    return myOutput;
    // document.getElementById(tagOutput).innerHTML = myOutput;
}

/* Phase Object */
function Phase() {

    this.addJsonResult = function (jsonObject) {
        this.phase = jsonObject.phase;
        this.date = jsonObject.date;
        this.time = jsonObject.time;
        this.name = "";
        this.url = "";
    }

    this.getShowData = function(){
        myOutput = "<tr><td>"+this.phase + "</td><td>" + this.date + "</td><td>" + "<a href = \""+this.url+"\">" +this.name + "</a>" + "</td><td>" + this.day + "</td></tr>";


        return myOutput;
    }
}

// location on the wheel (365 days is close enough to 360 degrees)
function getDayOfTheYear(now) {
    var start = new Date(now.getFullYear(), 0, 0);
    var diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
    var oneDay = 1000 * 60 * 60 * 24;
    var day = Math.floor(diff / oneDay);
    console.log('Day of year: ' + day);
    return day;
}


// the MoonTides 'Object'
function MoonTides(){

    this.myOutput
    this.myList = [];

    this.addJsonResult = function(jsonResult, filterPhase) {
        this.result = jsonResult;
        // console.log("this.result[0].title: "+this.result[0].title);
        // console.log("isArray? :"+Array.isArray(this.result))
        console.log("numphases = "+jsonResult.numphases);

        for (i = 0; i < jsonResult.numphases; i++) {
            phase = new Phase();
            var myPhase = jsonResult.phasedata[i]
            if (filterPhase != null) {
                if (myPhase.phase.indexOf(filterPhase)>=0) {
                    phase.addJsonResult(myPhase);
                    this.myList.push(phase);
                }
            } else {
                phase.addJsonResult(myPhase);
                this.myList.push(phase);
            }
        }
    }

    this.addDayOfTheYear = function() {
        for (i = 0; i < this.myList.length; i++) {
            var d = new Date(this.myList[i].date);
            this.myList[i].day = getDayOfTheYear(d);
       }

       // check if the array ends with the last day (the numphases of 50 sometimes ends with a new Moon in the next year)
       while (this.myList[this.myList.length-1].day < this.myList[this.myList.length-2].day) {
            this.myList.pop()
       }
    }


    this.addQuarter = function(moonname, season, i) {
        j = names.indexOf(moonname)
        this.myList[i].name = names[j];
        this.myList[i].url = urls[j++]

        this.myList[i+1].name = names[j];
        this.myList[i+1].url = urls[j++]

        this.myList[i+2].name = names[j];
        this.myList[i+2].url = urls[j++]
        return j;
    }

    // add the proper name of the living druidry course
    this.addCourseUnit = function() {
        /*
         The 'algorithm' by Emma Restall-Orr:
         "The trick is to ensure that Leaf Dance Moon moves across Samhain, 1 November;
         Imbolc is within White Waking Moon, 2 February;
         the 1 May festival, Beltane, is within White Lady Moon;
         and Claim Song is the Lammas moon of 1 August.
         Let the others find their place, and if a moon is left unmarked, name this the Quickening Moon"
         */

        imbolc = getDayOfTheYear(new Date("2000 Feb 1"))
        beltane = getDayOfTheYear(new Date("2000 May 1"))
        lammas = getDayOfTheYear(new Date("2000 Aug 1"))
        samhain = getDayOfTheYear(new Date("2000 Nov 1"))

        j = 0;
        j = names.indexOf("White Waking")

        for (i = 0; i < this.myList.length-1; i++) {
            start_day = this.myList[i].day
            end_day = this.myList[i+1].day

            if ((start_day <= imbolc) && (end_day > imbolc)) {
                j = this.addQuarter("White Waking"," (Imbolc)", i)
            }

            if ((start_day <= beltane) && (end_day > beltane)) {
                j = this.addQuarter("White Lady"," (Beltane)", i)
            }

            if ((start_day <= lammas) && (end_day > lammas)) {
                j = this.addQuarter("Claim Song"," (Lammas)", i)
            }

            if ((start_day <= samhain) && (end_day > samhain)) {
                j = this.addQuarter("Leaf Dance"," (Samhain)", i)
            }

            if (j > names.length) {
                j = 0;
            }
        }

        for (i = 0; i < this.myList.length; i++) {
            if (this.myList[i].name=='') {
                this.myList[i].name="Quickening"
                this.myList[i].url="https://druidnetwork.org/what-is-druidry/learning-resources/perennial/unit-thirteen/"
            }
        }
    }



    this.showData = function(tagOutput){
        this.myOutput = getTableHeader();
        for (i = 0; i < this.myList.length; i++) {
            this.myOutput += this.myList[i].getShowData();
        }
        this.myOutput += getTableFooter();

        // this.myList.forEach(showPhase)

        document.getElementById(tagOutput).innerHTML = this.myOutput;
    }


    this.drawMoon = function(tagOutput) {
    // https://www.w3schools.com/graphics/canvas_clock_numbers.asp

        function drawNumbers(ctx, radius, myList) {
            var ang;
            var num;
            ctx.font = radius*0.15 + "px arial";
            ctx.textBaseline="middle";
            ctx.textAlign="center";
            for (i = 0; i < myList.length; i++) {
                position = myList[i].day * 365 / 360
                ang = position * Math.PI / 180;
                ctx.rotate(ang);
                ctx.translate(0, -radius*0.85);
                ctx.rotate(-ang);

                ctx.font="Bold 14px Arial";
                ctx.fillStyle = 'red';
                ctx.textBaseline = 'middle';
                ctx.fillText(myList[i].name, 0);

                ctx.font="Bold 12px Arial";
                ctx.fillStyle = 'green';
                ctx.textBaseline = 'middle';
                ctx.fillText(myList[i].date, 0);

                // ctx.fillText(num.toString(), 0, 0);
                ctx.rotate(ang);
                ctx.translate(0, radius*0.85);
                ctx.rotate(-ang);
            }
        }

        function drawFace(ctx, radius) {
            var grad;

            ctx.beginPath();
            ctx.arc(0, 0, radius, 0, 2*Math.PI);
            ctx.fillStyle = 'white';
            ctx.fill();

            grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
            grad.addColorStop(0, '#333');
            grad.addColorStop(0.5, 'white');
            grad.addColorStop(1, '#333');
            ctx.strokeStyle = grad;
            ctx.lineWidth = radius*0.1;
            ctx.stroke();

            ctx.beginPath();
            ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
            ctx.fillStyle = '#333';
            ctx.fill();
        }

        function drawClock(myList) {
            ctx.arc(0, 0, radius, 0 , 2*Math.PI);
            ctx.fillStyle = "white";
            ctx.fill();
            drawFace(ctx, radius);
            drawNumbers(ctx, radius, myList);
        }

        var canvas = document.getElementById(tagOutput);
        var ctx = canvas.getContext("2d");
        var radius = canvas.height / 2;
        ctx.translate(radius, radius);
        radius = radius * 0.90

        drawClock(this.myList);
    }
}
// ======================================================================
