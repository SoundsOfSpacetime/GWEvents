# Code written by Kevin Johansmeyer

import h5py
import numpy as np
import pylab as pl

pl.clf()

# Event Information (place HDF5 file in same directory):
event = "GW150914_095045"
version = "2"
filename = "../"+event+"/IGWN-GWTC2p1-v"+version+"-"+event+"_PEDataRelease_mixed_nocosmo.h5"

# Initial Frequency:
initialFreq = 20

# Sample Rate Information (choose one):
sampleRate = 4096
# sampleRate = 8192
# sampleRate = 16384

# Waveform Generator Approximation (choose one):
    
# SEOBNRv4PHM:
waveformGenerator = "SEOBNRv4PHM"
posteriorSamplesPath = "SEOBNRv4PHM"

# # IMRPhenomXPHM:
# waveformGenerator = "IMRPhenomXPHM"
# posteriorSamplesPath = "IMRPhenomXPHM"

# #IMRPhenomPv2_NRTidal:
# waveformGenerator = IMRPhenomPv2_NRTidal
# posteriorSamplesPath = "IMRPhenomPv2_NRTidal:LowSpin"


# ----------------------------------------------------------------------------
with h5py.File(filename, "r") as hdf:    
    # Open posterior samples within HDF5 file:
    data = hdf.get('C01:'+posteriorSamplesPath+'/posterior_samples')
    
    # Convert data to a numpy array:
    data_arr = np.array(data)
    
    gpstime = hdf.get('C01:'+posteriorSamplesPath+'/skymap/meta_data/gps_time')
    
    gpstime_arr = np.array(gpstime)
   
gpstime_hdf5 = np.asscalar(gpstime_arr)


# Max Log(likelihood) information:
max_val_index = np.argmax(data_arr["log_likelihood"])
max_likelihood_val = data_arr["log_likelihood"][max_val_index]

print("Max Log(likelihood) information:")
print("Index for maximum likelihood:",max_val_index)
print("Maximum likelihood:",max_likelihood_val)
print("")

# Print variable output for Javascript file:
print('event: "{}",'.format(event))

print('description: "",')

print('url: "",')

print("sampleRate: ",sampleRate,",",sep='')

print("initialFreq: ",initialFreq,",",sep='')

mass1 = data_arr["mass_1"][max_val_index]
print("mass1: ",mass1,",",sep='')

mass2 = data_arr["mass_2"][max_val_index]
print("mass2: ",mass2,",",sep='')

s1x = data_arr["spin_1x"][max_val_index]
print("spin1x: ",s1x,",",sep='')

s1y = data_arr["spin_1y"][max_val_index]
print("spin1y: ",s1y,",",sep='')

s1z = data_arr["spin_1z"][max_val_index]
print("spin1z: ",s1z,",",sep='')

s2x = data_arr["spin_2x"][max_val_index]
print("spin2x: ",s2x,",",sep='')

s2y = data_arr["spin_2y"][max_val_index]
print("spin2y: ",s2y,",",sep='')

s2z = data_arr["spin_2z"][max_val_index]
print("spin2z: ",s2z,",",sep='')

ra = data_arr["ra"][max_val_index]
print("rightAscension: ",ra,",",sep='')

dec = data_arr["dec"][max_val_index]
print("declination: ",dec,",",sep='')

iota = data_arr["iota"][max_val_index]
print("inclination: ",iota,",",sep='')

psi = data_arr["psi"][max_val_index]
print("psi: ",psi,",",sep='')

luminosity_distance = data_arr["luminosity_distance"][max_val_index]
print("luminosityDistance: ",luminosity_distance,",",sep='')

chi_eff = data_arr["chi_eff"][max_val_index]
print("chi_eff: ",chi_eff,",",sep='')

print("geocentricGPSTime: ",gpstime_hdf5,",",sep='')

print("data: []")

print("")

# Call waveform generator:
from make_waveforms import make_tidal_waveform
from make_waveforms import make_waveform_plot
from make_waveforms import get_hoft_strain

hp, hc = make_tidal_waveform(approx=waveformGenerator,rate=sampleRate, mass1=mass1,mass2=mass2,distance=luminosity_distance,
                             inclination=iota, eccentricity=0, meanPerAno=0, phiRef=0, f_min=initialFreq,
                             f_ref=0, longAscNodes=0, s1x=s1x, s1y=s1y, s1z=s1z, s2x=s2x,
                             s2y=s2y, s2z=s2z, eos=None, save=False)

get_hoft_strain(hp,hc,"H1",ra,dec,psi,gpstime_hdf5,0)