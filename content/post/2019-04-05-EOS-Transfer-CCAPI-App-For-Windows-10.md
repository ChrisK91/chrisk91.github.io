---
summary: I recently got a new Canon camera, and was missing a simple app to transfer
  files to my Windows 10 devices. So I created one!
comments: true
date: "2019-04-05T00:00:00Z"
keywords: dslr remote windows, dslr remote windows 10, ccapi, eos transfer
tags:
- Tools
title: Camera Transfer - Remote capturing and file transfer for Canon camera and Window 10
aliases:
  - /2019/04/05/EOS-Transfer-CCAPI-App-For-Windows-10.html
---

{{< fig src="/images/eostransfer/remote capture.png" >}}Demonstration of live view and remote capture.{{< /fig >}}

I recently treated myself with a new Canon camera. What was quite interesting to me: almost all recent cameras support Wi-Fi and/or Bluetooth, so you can control them remotely. I'm running a lot of Windows 10 devices, and was a bit saddened to see, that there's no recent remote application for Canon cameras on the Windows Store. [So I created one myself.](https://www.microsoft.com/store/apps/9NSS46MNH6ZG?cid=homepage).

### How does it work

Camera Transfer is a UWP app and works on Windows 10 devices and Windows Mobile 10 devices. It utilizes the recently released [CCAPI](https://www.canon-europe.com/press-centre/press-releases/2019/01/sdk-and-api-package/) (which is a RESTful API) to connect and query the camera. After activating the CCAPI on the camera - either by connecting to an existing access point, or by creating one - the user enters port and IP of the camera. Then, a query is performed to check the connection and identify the camera.

### Features

As of now, the app can *list, display, download and share files on the camera*. It can also *release the shutter remotely* and display a *live view* of what the camera sees. To be honest, the app currently is quite basic - but it does what I need it to do.

### Planned features

- I want to extend the file browser to support multiple file downloads and deletion of files
- The API provides several options to release the shutter. If possible I'd like to create a built-in interval and bulb timer. I'm also working on extending the remote shutter and live view to allow the setting of shooting options

If you have feature requests, feel free to let me know via the comments below
