SelfServer
==========

The SelfServer works with the SelfEngine https://github.com/aboynejames/selfengine   augmented self intelligence


Hosting a SelfServer
============

In the Cloud
--------------------

See   https://github.com/aboynejames/selfeserver


On a SportsPi  (raspberry pi)
-------------------------------------------

1. Upload / transfer files to a raspberry pi

2. Ensure you have node.js installed (setup up guide    ) and Couchdb.

3.  npm install package.json (or install node modules individually)

4. create a  settings.js file from the settings-sample.js  file 

	- add couchdb username, password
	- email provider (not active at present)
	- hosting URL of  1. selfengine URL  (other apps location comin soon)
	- third party authentication e.g. facebook, twitter  ID's and secrets (from a developer account with those services)

5. Note server URL is  http:192.168.1.44:8881  (local version of selfengine has to have some local URL for socket.io)

6. Install node package forever or equivilant

7. write/edit  a /etc/init.d/  file.  Example .sh file include, edit paths to where index.js file is hosted / node source directory

8.  For start of server on pi boot  sudo update-rc.d start-selfserver.sh defaults

9. run in root mode   sudo bash  or reboot to run from .sh file.

10. node index.js


SportPi Hardware Required
-----------------------------------------
Raspberry Pi
SD card
Wifi Dongle
Bluetooth dongle
XRF serialport Radio module


Hardware Setup Guide
----------------------------------

WIFI setup  See https://github.com/aboynejames/raspberrypiopensportproject

Bluetooth  See https://github.com/aboynejames/raspberrypiopensportproject




Android OS
------------------

a work in progress
