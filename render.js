//=============================================================================//
// --------------------------------- Header ---------------------------------- //
//=============================================================================//
//                 Gravitational Wave Events Application                       //
//                      Created by Kevin Johansmeyer                           //
//                    Email: kevinjohansmeyer@gmail.com                        //
//                 University: Montclair State University                      //
//                        Advisor: Dr. Marc Favata                             //
//                        www.soundsofspacetime.org                            //
//=============================================================================//

'use strict'

// Timer needed in order to make page load before alert shows:
function headphoneAlert() {
    window.alert("Headphones are recommended for the best user experience. Cellphone and laptop speakers may not be able to produce low frequencies.");
}

//=============================================================================//
// ------------------------- Populate Dropdown Menu -------------------------- //
//=============================================================================//

// Original working dropdown menu:
// Citation: https://1bestcsharp.blogspot.com/2017/03/javascript-populate-select-option-from-array.html
var select = document.getElementById("selectGWEvent");
for(var j = 1; j < GWevents.length; j++) { //j = 1 since j = 0 already in dropdown by default
    var option = document.createElement("OPTION"),
        txt = document.createTextNode(GWevents[j].name);
    option.appendChild(txt);
    option.setAttribute("value",GWevents[j].name);
    select.insertBefore(option,select.lastChild);
}

// Adding "All Events" optgroup to dropdown menu:
// Citation: https://www.w3schools.com/jsref/dom_obj_optgroup.asp
var optgroup = document.createElement("OPTGROUP");
optgroup.setAttribute("label", "All Events");
// optgroup.appendChild(select.options[numTopEvents])
select.insertBefore(optgroup, select.options[numTopEvents]);

//=============================================================================//
// ------------------------------- Time Arrays ------------------------------- //
//=============================================================================//

// Plots have sampling rates of either 4096, 8192, or 16384.
// Three time arrays, corresponding to each sample rate are created:

// Sampling Rate = 4096:
let NFixed4096 = 140000 //rounded up number of indices for longest event (GW200105_162426 with f0 = 20 Hz)
let tFixed4096 = new Float32Array(NFixed4096).fill(0); //probably can define with time steps instead of defining with zeros
tFixed4096[0] = 0; //fills t array with [0, deltat, 2*deltat, 3*deltat...]
for (let i = 1; i < NFixed4096; i++) {
    tFixed4096[i] = tFixed4096[i - 1] + 1/4096;
}

// Sampling Rate = 8192:
let NFixed8192 = 140000 //rounded up number of indices for longest event (GW200105_162426 with f0 = 20 Hz)
let tFixed8192 = new Float32Array(NFixed8192).fill(0); //probably can define with time steps instead of defining with zeros
tFixed8192[0] = 0; //fills t array with [0, deltat, 2*deltat, 3*deltat...]
for (let i = 1; i < NFixed8192; i++) {
    tFixed8192[i] = tFixed8192[i - 1] + 1/8192;
}

// Sampling Rate = 16384:
let NFixed16384 = 140000 //rounded up number of indices for longest event (GW200105_162426 with f0 = 20 Hz)
let tFixed16384 = new Float32Array(NFixed16384).fill(0); //probably can define with time steps instead of defining with zeros
tFixed16384[0] = 0; //fills t array with [0, deltat, 2*deltat, 3*deltat...]
for (let i = 1; i < NFixed16384; i++) {
    tFixed16384[i] = tFixed16384[i - 1] + 1/16384;
}

//=============================================================================//
// ----------------------------- Update function ----------------------------- //
//=============================================================================//
// This entire function updates every time a slider is changed
function updateFunction(normalizedStrainData) {

    //----------------- Importing Data From GWevents.js ------------------- //
    // var data = GWevents[selectGWEvent.selectedIndex].data;
    // var eventName = GWevents[selectGWEvent.selectedIndex].name;
    // var normalizedStrainData = new Float32Array(data);
    // console.log({eventName});

    //----------------- Importing Data From GWevents.js ------------------- //
    var data = GWevents[selectGWEvent.selectedIndex].data;
    var eventName = GWevents[selectGWEvent.selectedIndex].name;
    var normalizedStrainData = new Float32Array(data);
    console.log({eventName});
    
    // ------------------------ Information Box ------------------------ //
    var numSigFigs = 3; //rounds all values to this number of significant figures

    // Mass #1:
    var mass1 = GWevents[selectGWEvent.selectedIndex].mass1;
    document.getElementById('mass1').innerHTML = Number(mass1.toPrecision(numSigFigs));

    // var spin1x = GWevents[selectGWEvent.selectedIndex].spin1x;
    // document.getElementById('spin1x').innerHTML = Number(spin1x.toPrecision(numSigFigs));

    // var spin1y = GWevents[selectGWEvent.selectedIndex].spin1y;
    // document.getElementById('spin1y').innerHTML = Number(spin1y.toPrecision(numSigFigs));

    // var spin1z = GWevents[selectGWEvent.selectedIndex].spin1z;
    // document.getElementById('spin1z').innerHTML = Number(spin1z.toPrecision(numSigFigs));

    // Mass #2:
    var mass2 = GWevents[selectGWEvent.selectedIndex].mass2;
    document.getElementById('mass2').innerHTML = Number(mass2.toPrecision(numSigFigs));

    // var spin2x = GWevents[selectGWEvent.selectedIndex].spin2x;
    // document.getElementById('spin2x').innerHTML = Number(spin2x.toPrecision(numSigFigs));

    // var spin2y = GWevents[selectGWEvent.selectedIndex].spin2y;
    // document.getElementById('spin2y').innerHTML = Number(spin2y.toPrecision(numSigFigs));

    // var spin2z = GWevents[selectGWEvent.selectedIndex].spin2z;
    // document.getElementById('spin2z').innerHTML = Number(spin2z.toPrecision(numSigFigs));

    // Other Parameters:
    // var rightAscension = GWevents[selectGWEvent.selectedIndex].rightAscension;
    // document.getElementById('rightAscension').innerHTML = Number(rightAscension.toPrecision(numSigFigs));

    // var declination = GWevents[selectGWEvent.selectedIndex].declination;
    // document.getElementById('declination').innerHTML = Number(declination.toPrecision(numSigFigs));

    // var inclination = GWevents[selectGWEvent.selectedIndex].inclination;
    // document.getElementById('inclination').innerHTML = Number(inclination.toPrecision(numSigFigs));

    // var psi = GWevents[selectGWEvent.selectedIndex].psi;
    // document.getElementById('psi').innerHTML = Number(psi.toPrecision(numSigFigs));

    var luminosityDistance = GWevents[selectGWEvent.selectedIndex].luminosityDistance;
    document.getElementById('luminosityDistance').innerHTML = Number(luminosityDistance.toPrecision(numSigFigs));

    var chi_eff = GWevents[selectGWEvent.selectedIndex].chi_eff;
    document.getElementById('chi_eff').innerHTML = Number(chi_eff.toPrecision(numSigFigs));

    var totalMass = GWevents[selectGWEvent.selectedIndex].totalMass;
    document.getElementById('totalMass').innerHTML = Number(totalMass.toPrecision(numSigFigs));

    // var geocentricGPSTime = GWevents[selectGWEvent.selectedIndex].geocentricGPSTime;
    // document.getElementById('geocentricGPSTime').innerHTML = geocentricGPSTime;
    // document.getElementById('geocentricGPSTime').innerHTML = Number(geocentricGPSTime.toPrecision(numSigFigs));

    // Initial Frequency:
    var initialFreq = GWevents[selectGWEvent.selectedIndex].initialFreq;
    document.getElementById('initialFreq').innerHTML = Number(initialFreq.toFixed(1));


    // Event Description:
    var eventDescription = GWevents[selectGWEvent.selectedIndex].description;
    document.getElementById('eventDescription').innerHTML = eventDescription;

    // Event URL:
    var eventURL = GWevents[selectGWEvent.selectedIndex].url;
    document.getElementById('infoURL').href = eventURL;

    // ------------ Choosing Correct Time Array and Sampling Rate --------- //
    if (GWevents[selectGWEvent.selectedIndex].sampleRate == 4096) {
        var tFixed = tFixed4096;
        var sampleRate = GWevents[selectGWEvent.selectedIndex].sampleRate;
        // console.log(tFixed);
    } else if (GWevents[selectGWEvent.selectedIndex].sampleRate == 8192){
        var tFixed = tFixed8192;
        var sampleRate = GWevents[selectGWEvent.selectedIndex].sampleRate;
        // console.log(tFixed);
    } else if (GWevents[selectGWEvent.selectedIndex].sampleRate == 16384){
        var tFixed = tFixed16384;
        var sampleRate = GWevents[selectGWEvent.selectedIndex].sampleRate;
        // console.log(tFixed);
    }

    // ----------------------------- Plotting ----------------------------- //
    // ----------------------- Strain vs. Time Plot ----------------------- //
    let layout0 = {
        title: {text: 'Normalized Strain vs. Time', font: {family: 'Times New Roman', size: 32, color: 'white'}},
        xaxis: {
            title: {
                text: 'Time (sec)',
                font: {family: 'Times New Roman', size: 26,color: 'white'}
            },
            tickfont: {family: 'Times New Roman', size: 18, color: 'white'},
            color: 'white',
            rangemode: 'nonnegative', // does this work?
            showgrid: false,
            ticks: 'outside'
        },
        yaxis: {
            title: {
                text: 'Normalized Strain',
                font: {family: 'Times New Roman', size: 26,color: 'white'}
            },
            tickfont: {family: 'Times New Roman', size: 18,color: 'white'},
            color: 'white',
            showgrid: false,
            ticks: 'outside',
            range: [-1, 1] //h.length - 1 is the last element in the array

        },
        shapes: [ //Horizontal line for h vs. t plot
            {
                type: 'line',
                xref: 'x',
                x0: 0,
                y0: -10,
                x1: 0,
                y1: 10,
                line:{
                    color: 'black',
                    width: 1,
                    dash:'solid'
                }
            }
        ],
        margin: {l: 100, r: 50, b: 100, t: 75, pad: 10},
        plot_bgcolor: 'white', //"#383838",
        paper_bgcolor: '#181818'
    }
    
    let trace0 = {
        x: tFixed,
        y: normalizedStrainData,
        name: 'Strain vs. Time',
        type: 'scatter',
        line: {
            color: '#ff3d3d',//'#282828',
            width: 3,
            shape: 'spline', // Spline used to smooth curve between points
            smoothing: 1.3 // Smoothing value between 0 and 1
            }
    };

    var config0 = {
        toImageButtonOptions: {
          format: 'png', // one of png, svg, jpeg, webp
          filename: 'GWStrainVsTimePlot',
          height: 500,
          width: 1754,
          scale: 2 // Multiply title/legend/axis/canvas sizes by this factor
        },
        modeBarButtonsToRemove: ['autoScale2d','toggleSpikelines','hoverClosestCartesian','hoverCompareCartesian']
    };

    let data0 = [trace0];

    Plotly.newPlot('strainVsTimePlot', data0, layout0, config0);
    
    // ----------------------------- Audio ----------------------------- //
    document.getElementById("startAudioBtn").onclick = function() {playAudio()};
    
    // Citation: wavJS - https://github.com/taweisse/wavJS
    // const sampleRate = 4096;

    function startAudio({ array }) {
        let wav = new WAV(sampleRate,1); //1 = mono, 2 = stereo
        wav.addSamples([array]);
        wav.play();

        // Disables startAudioBtn for duration of sound
        // Citation: https://stackoverflow.com/questions/30558587/javascript-disable-button-and-reenable-it-after-5-seconds
        let tf = normalizedStrainData.length/sampleRate;
        document.getElementById("startAudioBtn").disabled = true;
            setTimeout(function(){document.getElementById("startAudioBtn").disabled = false;},1000*tf); //change disable time to reflect each event
        }

    function playAudio() {
        startAudio({ array: normalizedStrainData, sampleRate });
    }

    // Download Audio
    document.getElementById("downloadAudio").onclick = function() {prepareDownload()};

    function downloadAudio({ array }) {
        let wav = new WAV(sampleRate,1); //1 = mono, 2 = stereo
        wav.addSamples([array]);
        wav.download(eventName+'.wav');
    }
    
    function prepareDownload() {
        downloadAudio({ array: normalizedStrainData, sampleRate });
    }

} // ----------------------- End of Update Function ---------------------- //

// --------------------------- Side Bar Functionality --------------------------- //
// Citation: https://stackoverflow.com/questions/48066685/text-collapsing-on-side-menu-close
function openNav() {
    document.getElementById("mySideNav").style.left = "0px";
}

/* Set the width of the side navigation to 0 */
function closeNav() {
    document.getElementById("mySideNav").style.left = "-500px";
}

// ------------------ Execute update Function for initial time ------------------ //
updateFunction();