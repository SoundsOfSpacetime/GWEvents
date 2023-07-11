# Sounds of Spacetime - [soundsofspacetime.org]()

Our purpose is to explore the physics of gravitational waves via an analogy to audible sounds. Gravitational waves (GW) are ripples in the fabric of spacetime produced by colliding black holes, neutron stars, supernovae, and other astrophysical phenomena. This application is intended to make the exploration of gravitational waves as accessible as possible.

# Sonification of Gravitational Wave Events

![GW Application Screenshot](https://i.imgur.com/XL4KvWJ.png)

## Instructions

1. Go to the [Sounds of Spacetime - Gravitational Wave Events](soundsofspacetime.github.io/GWEvents/) simulation. Google Chrome is highly recommended.
2. Enable sound on your device. Use of headphones is highly recommended. 
3. Use the "Event" dropdown menu to choose an gravitational wave detection. Each event has a label corresponding to the time and date of observation.

    <u>Example</u>: GW150914_095045 corresponds to 09-14-2015 at 09:50:45.

4. Press "Play Waveform" or "Download Audio" to hear the sound corresponding to this waveform. Be sure to look at the values on the x-axis for each event. The duration of some sounds may be shorter than one second. Conceptually, it is important to know these events do not produce sounds. The audio generated in the simulation is another means of interpretting the signal received by the detectors.

5. Press "Click to View More Information About This Event" to view the event on the Gravitational Wave Open Science Center (GWOSC) website.

## Generation of Plots

1. Plots are pre-generated in Python and exported to JavaScript. The parameter values corresponding to highest log_likelihood of SEOBNRv4PHM posterior samples from The Gravitational Wave Open Science Center (GWOSC). Plots were constructed using LALSimulation's XLALSimInspiralChooseTDWaveform() waveform generator. 
2. The starting frequency for each event is set to 20 Hz, so the beginning of sounds may not be audible on some devices.
3. The plots are generated based on the H1 detector (LIGO Hanford).
4. Strain values are extremely small and are normalized to have a minimum of -1, and maximum of 1.

## Dependencies

1. [Plotly.js](https://plotly.com/javascript/) [MIT License]
2. [WAV.js](https://github.com/taweisse/wavJS) created by Todd Weisse [MIT License]

## Acknowledgement

This research has made use of data or software obtained from the Gravitational Wave Open Science Center (gwosc.org), a service of the LIGO Scientific Collaboration, the Virgo Collaboration, and KAGRA. This material is based upon work supported by NSF's LIGO Laboratory which is a major facility fully funded by the National Science Foundation, as well as the Science and Technology Facilities Council (STFC) of the United Kingdom, the Max-Planck-Society (MPS), and the State of Niedersachsen/Germany for support of the construction of Advanced LIGO and construction and operation of the GEO600 detector. Additional support for Advanced LIGO was provided by the Australian Research Council. Virgo is funded, through the European Gravitational Observatory (EGO), by the French Centre National de Recherche Scientifique (CNRS), the Italian Istituto Nazionale di Fisica Nucleare (INFN) and the Dutch Nikhef, with contributions by institutions from Belgium, Germany, Greece, Hungary, Ireland, Japan, Monaco, Poland, Portugal, Spain. KAGRA is supported by Ministry of Education, Culture, Sports, Science and Technology (MEXT), Japan Society for the Promotion of Science (JSPS) in Japan; National Research Foundation (NRF) and Ministry of Science and ICT (MSIT) in Korea; Academia Sinica (AS) and National Science and Technology Council (NSTC) in Taiwan.

## Credit

Programmed by Kevin Johansmeyer, advised by Dr. Marc Favata and Dr. Shaon Ghosh (Montclair State University)