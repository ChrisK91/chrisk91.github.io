---
summary: I've created a small webapp to visualize, how the angle of the main electrical
  axis influences the three main leads I, II and III.
comments: true
date: "2018-10-05T00:00:00Z"
keywords: anki templates, anki html intro, anki how to html
tags:
- Tools
title: ECG Visualizer
aliases:
    - /tools/ekg-app.html
---

{{< fig src="/images/ecg_visualizer/screenshot.png" >}}The app located at <a href="https://chrisk91.me/ekgApp/">chrisk91.me/ekgApp/</a>{{< /fig >}}

When it comes to interpreting EKGs, I've always been a visual person. I tend to reconstruct the three leads and the main electrical vector in my head. Using Angular (actually my first Angular app), I've created a small tool to draw the main electrical axis. From this axis, the corresponding "heights" of the leads are calculated. It was actually quite fun to dive back into geometry and figure out all the formulas, producing the crossing points of all the lines.

Feel free to check out the app at [ekg.chrisk91.me](http://ekg.chrisk91.me).

The app supports English and German localization. Source code is located at [https://github.com/ChrisK91/ekgapp](https://github.com/ChrisK91/ekgapp).