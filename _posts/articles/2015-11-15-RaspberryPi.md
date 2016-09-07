---
layout: article
category : articles
title :  RaspberryPi
tagline: ""
tags : [CA]
image:
  feature:
  teaser: RaspberryPi.jpg
---


## Cannot boot with error
I installed the os "NOOBs" which is recommended by official.
When I boot the raspberry Pi 3. There is an error after NOOBs automatically install Debian.
It said "Failed to load login service." Then GUI stay there.
### Why
It is about the network. It maybe communicate with the server when it boot it. So it needs to be plug in the network cable to the switch.


## Camera doesn't detected
I don't know which the root problem.
I just reconnect the interface of the camera. And then update all the firm.
sudo apt-get update
sudo apt-get upgrade
sudo reboot

Then it's OK.

## cannot input backslash
Need to change keyboard layout.
<a href="https://thepihut.com/blogs/raspberry-pi-tutorials/25556740-changing-the-raspberry-pi-keyboard-layout">reference</a>

