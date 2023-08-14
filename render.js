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

// Create Dropdown Menu:
var select = document.getElementById("selectGWEvent");

// Populate TopGWEvents:
for(var i = 1; i < TopGWEvents.length; i++) {
  var option = document.createElement("OPTION"),
      txt = document.createTextNode(TopGWEvents[i]);
  option.appendChild(txt);
  option.setAttribute("value",TopGWEvents[i]);
  select.insertBefore(option,select.lastChild);
}

// Populate GWEvents:
for(var i = 0; i < GWEvents.length; i++) {
  var option = document.createElement("OPTION"),
      txt = document.createTextNode(GWEvents[i].name);
  option.appendChild(txt);
  option.setAttribute("value",GWEvents[i].name);
  select.insertBefore(option,select.lastChild);
}

// Adding "All Events" Optgroup:
var optgroup = document.createElement("OPTGROUP");
optgroup.setAttribute("label", "All Events");
select.insertBefore(optgroup, select.options[TopGWEvents.length]);

//=============================================================================//
// ------------------------------- Time Arrays ------------------------------- //
//=============================================================================//

// Plots have sampling rates of either 4096 or 8192.
// Two time arrays, corresponding to each sample rate are created:

// Sampling Rate = 4096:
let NFixed4096 = 200000 //rounded up number of indices for longest event
let tFixed4096 = new Float32Array(NFixed4096).fill(0); //probably can define with time steps instead of defining with zeros
tFixed4096[0] = 0; //fills t array with [0, deltat, 2*deltat, 3*deltat...]
for (let i = 1; i < NFixed4096; i++) {
    tFixed4096[i] = tFixed4096[i - 1] + 1/4096;
}

// Sampling Rate = 8192:
let NFixed8192 = 200000 //rounded up number of indices for longest event
let tFixed8192 = new Float32Array(NFixed8192).fill(0); //probably can define with time steps instead of defining with zeros
tFixed8192[0] = 0; //fills t array with [0, deltat, 2*deltat, 3*deltat...]
for (let i = 1; i < NFixed8192; i++) {
    tFixed8192[i] = tFixed8192[i - 1] + 1/8192;
}

//=============================================================================//
// ----------------------------- Update function ----------------------------- //
//=============================================================================//
// This entire function updates every time the dropdown is changed
function updateFunction(normalizedStrainData) {
    //----------------- Importing Data From GWevents.js ------------------- //

    // Gets currently selected dropdown event name text:
    var textFromDropDown = document.getElementById("selectGWEvent");
    var currentText = textFromDropDown.options[textFromDropDown.selectedIndex].text;
    var currentSelection = GWEvents.find(item => item.name === currentText);

    // Import Data From Current Selection:
    var data = currentSelection.data;
    var normalizedStrainData = new Float32Array(data);
    
    // ------------------------ Information Box ------------------------ //
    var numSigFigs = 3; //rounds all values to this number of significant figures

    // Event Name:
    var eventName = currentSelection.name;
    document.getElementById('eventName').innerHTML = eventName;
    console.log("Expand below to see all information and values for currently selected event:")
    console.log({currentSelection});

    // Mass #1 (Detector Frame):
    var mass1 = currentSelection.mass1;
    document.getElementById('mass1').innerHTML = Number(mass1.toPrecision(numSigFigs));

    // Mass #2 (Detector Frame):
    var mass2 = currentSelection.mass2;
    document.getElementById('mass2').innerHTML = Number(mass2.toPrecision(numSigFigs));

    // Total Mass (Detector Frame):
    var totalMass = currentSelection.totalMass;
    document.getElementById('totalMass').innerHTML = Number(totalMass.toPrecision(numSigFigs));

    // Luminosity Distance:
    var luminosityDistance = currentSelection.luminosityDistance;
    document.getElementById('luminosityDistance').innerHTML = Number(luminosityDistance.toPrecision(numSigFigs));

    // Redshift:
    var redshift = currentSelection.redshift;
    document.getElementById('redshift').innerHTML = Number(redshift.toPrecision(numSigFigs));

    // Initial Frequency:
    var initialFreq = currentSelection.initialFreq;
    document.getElementById('initialFreq').innerHTML = Number(initialFreq.toFixed(1));

    // Mass #1 (Source Frame):
    var mass1source = currentSelection.mass1source;
    document.getElementById('mass1source').innerHTML = Number(mass1source.toPrecision(numSigFigs));

    // Mass #2 (Source Frame):
    var mass2source = currentSelection.mass2source;
    document.getElementById('mass2source').innerHTML = Number(mass2source.toPrecision(numSigFigs));

    // Total Mass (Source Frame):
    var totalMassSource = currentSelection.totalMassSource;
    document.getElementById('totalMassSource').innerHTML = Number(totalMassSource.toPrecision(numSigFigs));

    // Mass Ratio (Source Frame):
    var massRatio = mass2source / mass1source;
    document.getElementById('massRatio').innerHTML = Number(massRatio.toPrecision(numSigFigs));

    // Spin #1x:
    var spin1x = currentSelection.spin1x;
    var spin1y = currentSelection.spin1y;
    var spin1z = currentSelection.spin1z;
    var spin1 = Math.sqrt(Math.pow(spin1x,2)+Math.pow(spin1y,2)+Math.pow(spin1z,2))
    document.getElementById('spin1').innerHTML = Number(spin1.toPrecision(numSigFigs));

    // Spin #2:
    var spin2x = currentSelection.spin2x;
    var spin2y = currentSelection.spin2y;
    var spin2z = currentSelection.spin2z;
    var spin2 = Math.sqrt(Math.pow(spin2x,2)+Math.pow(spin2y,2)+Math.pow(spin2z,2))
    document.getElementById('spin2').innerHTML = Number(spin2.toPrecision(numSigFigs));

    // Event Description:
    var eventDescription = currentSelection.description;
    document.getElementById('eventDescription').innerHTML = eventDescription;

    // Event URL:
    var eventURL = currentSelection.url;
    document.getElementById('infoURL').href = eventURL;

    // ------------ Choosing Correct Time Array and Sampling Rate --------- //
    if (currentSelection.sampleRate == 4096) {
        var tFixed = tFixed4096;
        var sampleRate = currentSelection.sampleRate;
        // console.log(tFixed);
    } else if (currentSelection.sampleRate == 8192){
        var tFixed = tFixed8192;
        var sampleRate = currentSelection.sampleRate;
        // console.log(tFixed);
    } 

    // ----------------------------- Plotting ----------------------------- //
    // ----------------------- Strain vs. Time Plot ----------------------- //
    let layout0 = {
        title: {text: 'Normalized Strain vs. Time', font: {family: 'Helvetica', size: 32, color: 'white'}},
        xaxis: {
            title: {
                text: 'Time (sec)',
                font: {family: 'Helvetica', size: 26,color: 'white'}
            },
            tickfont: {family: 'Helvetica', size: 18, color: 'white'},
            color: 'white',
            rangemode: 'nonnegative', // does this work?
            showgrid: false,
            ticks: 'outside'
        },
        yaxis: {
            title: {
                text: 'Normalized Strain',
                font: {family: 'Helvetica', size: 26,color: 'white'}
            },
            tickfont: {family: 'Helvetica', size: 18,color: 'white'},
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

// ------------------ Resize plot when window size is changed ------------------ //
addEventListener("resize", (event) => {updateFunction()});