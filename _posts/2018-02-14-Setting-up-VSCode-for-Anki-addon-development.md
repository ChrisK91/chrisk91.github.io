---
layout: post
title: Setting up VSCode for Anki add on development.
keypoints: | 
    - I will highlight configuration steps to set up Visual Studio Code for Anki development
blurb: Anki uses a SQLite database to keep track of your reviews and cards. I always wanted to use R to create some graphs and visualize my learning process. Here is some code, to get you started as well!
tags: [ "anki", "anki vscode", "vscode anki addon" ]
keywords: anki, anki and vscode, anki IDE
published: false
---
Recently, I wrote my very first [add on for Anki](https://ankiweb.net/shared/info/181219369){:target="_blank"}, using Visual Studio Code with the offical [Python add on for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-python.python){:target="_blank"}. With Visual Studio Code, you can easily write and debug code and add ons, you will write in the future.

## Prerequisites
To get full debuggin support, we need to get the Anki source. It is available at the [download section of the website](https://apps.ankiweb.net/){:target="_blank"} under *Linux/BSD* &rarr; *Other Options" &rarr; *Source .tgz*. At the time of writing, the version was *2.0.47*. Download the source and extract it to a location of your liking.

Now, we need to get Python 2.7 running. On my machine, I have Anaconda installed, so I will create a new environment for Python 2.7, using the [https://conda.io/docs/](conda package and environment manager){:target="_blank"}.

I set up the environment with ```conda create --name python2 python=2.7```. This will create a very bare bones Python 2.7 environment witouth any additional stuff in it. Once successfull, this command will also state how to activate the new environment:

<pre><code># To activate this environment, use:
# > activate python2
#
# To deactivate this environment, use:
# > deactivate python2</code></pre>

We can check our setup on the command line via (```>``` denotes input):

<pre><code>>activate python2
(python2)>python --version
Python 2.7.13 :: Continuum Analytics, Inc.</code></pre>

Before installling additional modules, make sure your virtual environment is set to the newly created one. Here, this is shown by the ```(python2)``` in front of the command line input.

We also need PyQt in version 4 ```conda install pyqt=4```, which will include of additional dependencies as well, including Qt. Finally, we need the Python extensions for Windows, ```conda install pywin32```.

Now everything is set up, and you can run Anki by starting ```anki.bat``` from the command line (inside your environment).

## Setting up a project folder