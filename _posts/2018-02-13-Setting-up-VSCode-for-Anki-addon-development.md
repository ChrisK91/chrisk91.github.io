---
layout: post
title: Setting up VSCode for Anki add on development.
keypoints: | 
    - I will highlight configuration steps to set up Visual Studio Code for Anki development
blurb: Anki uses a SQLite database to keep track of your reviews and cards. I always wanted to use R to create some graphs and visualize my learning process. Here is some code, to get you started as well!
tags: [ "anki", "anki vscode", "vscode anki addon" ]
keywords: anki, anki and vscode, anki IDE
---
Recently, I wrote my very first [add on for Anki](https://ankiweb.net/shared/info/181219369){:target="_blank"}, using Visual Studio Code with the official [Python add on for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-python.python){:target="_blank"}. With Visual Studio Code, you can easily write and debug code and add ons, you will write in the future.

## Prerequisites
To get full debugging support, we need to get the Anki source. It is available at the [download section of the website](https://apps.ankiweb.net/){:target="_blank"} under *Linux/BSD* &rarr; *Other Options* &rarr; *Source .tgz*. At the time of writing, the version was *2.0.47*. Download the source and extract it to a location of your liking.

### Python 2.7

<div class="callout small">The section below will describe how I set up my Python 2.7 environment. If you have Python 2.7 already set up, you can skip ahead. Just make sure, you can run anki from source before proceeding, by using the <code>anki.bat</code> file in the source directory</div>
Now, we need to get Python 2.7 running. On my machine, I have Anaconda installed, so I will create a new environment for Python 2.7, using the [conda package and environment manager](https://conda.io/docs/){:target="_blank"} which comes with the scientific [Anaconda distribution](https://www.anaconda.com/download/){:target="_blank"}. If you're interested in a more lightweight setup, you can also try out [Miniconda](https://www.anaconda.com/download/){:target="_blank"}, which excludes the scientific libraries, that come with Anaconda.

I set up the environment with ```conda create --name python2 python=2.7```. This will create a very bare bones Python 2.7 environment without any additional stuff in it. Once successful, this command will also state how to activate the new environment:

<pre><code># To activate this environment, use:
# > activate python2
#
# To deactivate this environment, use:
# > deactivate python2</code></pre>

We can check our setup on the command line via (```>``` denotes input):

<pre><code>>activate python2
(python2)>python --version
Python 2.7.13 :: Continuum Analytics, Inc.</code></pre>

Before installing additional modules, make sure your virtual environment is set to the newly created one. Here, this is shown by the ```(python2)``` in front of the command line input.

We also need PyQt in version 4 ```conda install pyqt=4```, which will include of additional dependencies as well, including Qt. Finally, we need the Python extensions for Windows, ```conda install pywin32```.

Now everything is set up, and you can run Anki by starting ```anki.bat``` from the command line (inside your environment).

## Setting up a project folder
For my add on, i've set up the github folder ready, to run Anki straight from the current directory. This way, one can easily fork the add on, and create a new profile (for debugging purposes) in the same directory. For that, we will have the following structure:

<pre><code>
Anki_dev-Folder/
    |
    +-- addons/
        |
        +-- my_addon.py
</code></pre>

In the file ```my_addon.py```, I've inserted the test code from [the documentation](https://apps.ankiweb.net/docs/addons.html){:target="_blank"}, which you can find below:

<pre><code class="Python"># import the main window object (mw) from aqt
from aqt import mw
# import the "show info" tool from utils.py
from aqt.utils import showInfo
# import all of the Qt GUI library
from aqt.qt import *

# We're going to add a menu item below. First we want to create a function to
# be called when the menu item is activated.

def testFunction():
    # get the number of cards in the current collection, which is stored in
    # the main window
    cardCount = mw.col.cardCount()
    # show a message box
    showInfo("Card count: %d" % cardCount)

# create a new menu item, "test"
action = QAction("test", mw)
# set it to call testFunction when it's clicked
action.triggered.connect(testFunction)
# and add it to the tools menu
mw.form.menuTools.addAction(action)</code></pre>

Now you should end up with something like this in VSCode:

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/initial_setup.png" />
</figure>
</div>

## Configuring the "run" action

Hit <kbd>F1</kbd> and enter "launch", to create and edit the launch.json configuration file

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/launch.png" />
</figure>
</div>

The now opened .json file is documented [here](https://code.visualstudio.com/docs/python/debugging){:target="_blank"} and allows us, to specify the Python directory and command line arguments. We need to specify the options as below:

<pre><code class="JSON">{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "configurations": [
        {
            "name": "Python 2.7 Anki",
            "type": "python",
            "request": "launch",
            "stopOnEntry": false,
            "pythonPath": "C:/Anaconda3/envs/Python27/python", // <- Path to your python binary
            "program": "X:/.../anki-2.0.47/runanki", // <- Path to your runanki location
            "cwd": "${workspaceRoot}",
            "env": {},
            "envFile": "${workspaceRoot}/.env",
            "debugOptions": [
                "RedirectOutput"
            ],
            "args": [
                "-b ."
            ]
        }
    ]
}</code></pre>

As you can see, you need to specify multiple values:

    - ```pythonPath```: is pointed to the python binary. This will reside (with Anaconda/Conda) in your setup directory, in the subfolder "envs"
    - ```program```: points to the entry python file. This is actually the file that is invoked via ```python runanki```, when you start anki via ```runanki.bat```
    - ```args```: We can specify a custom profile location via the ```-b PATH``` command. This way, Anki creates a new profile in the current directory (note the ```.``` as current folder). Also, since our code is already in the addons subfolder, it will run as soon as we start Anki.

Hit <kbd>F5</kbd> and debugging should start. You can also start debugging via the debugging pane on the left (under the "No bug" sign).

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/initial_start.png" />
</figure>
</div>

Create a new profile, and open the tools menu. And there we have it: our "test" entry got created:

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/test_menu.png" />
</figure>
</div>

## Intellisense

First, it would be nice to have auto completion and code lookup working. We can enable this in the workspace settings:

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/wssettings.png" />
</figure>
</div>

Search for "autocomplete", click the pen symbol next to ```"python.autoComplete.extraPaths"```, and again add the path to your Anki source location. Be careful ti either escape backslashes or use forward slashes.

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/ws_edited.png" />
</figure>
</div>

You are now able to use Intellisense to autocomplete names and functions. You can also go to the corresponding source for Anki files with <kbd>Ctrl</kbd> and clicking a function name, and you can see annotations/docstrings if available.

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/intellisense.png" />
</figure>
</div>

## Linting

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/missing_import.png" />
</figure>
</div>

Now, you might note, that after saving, a lot of squiggly lines appear. This is because the [linter](https://en.wikipedia.org/wiki/Lint_(software)){:target="_blank"} invoked by the VSCode extension doesn't know where the Anki source code is located. We can remedy this by creating the file ```.pylintrc```, specifying where your anki source code is located:

<pre><code class="INI">[Master]
init-hook='import sys; sys.path.append("X:/.../anki-2.0.47/")'</code></pre>

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/pylint.png" />
</figure>
</div>

After editing and resaving your file, all the red squiggly lines will disappear.

If there are still errors in the linted file, this might due to VSCode using the wrong linter (i.e. a Python 3 linter instead of 2). We again can remedy this in the workspace file, by editing the workspace settings, and specifying the ```python.pythonPath```. You need to give the fill path to the python executable, like we did in the *launch.json* file.

<div class="text-center">
<figure>
<img src="/images/anki_addon_guide/selectingpython.png" />
</figure>
</div>

Sometimes VSCode is unable to install pylint. In that case, go to the command line, activate your environment (```>activate python2```) and run ```>conda install pylint```. Now everything should lint fine. In my experience, pylint has some issues with pywin32 sometimes, but it should give you a general idea.

## .gitignore
Last but not least, it would be a good idea to exclude some stuff in a ```.gitignore``` file, in case you want to use version control. My file looks like this, to exclude VSCode settings, pylint settings, *.pyc files and the actual Anki profile that is generated:

<pre><code>*.db
User 1/
.vscode/
.pylintrc
*.pyc</code></pre>

## Final remarks

Now you've got everything up and running. You have a full debugger at your hands, you can set breakpoints and inspect variables at run time. If you need starting help with the actual code, I encourage you to check out other plugins source code from listing on Anki Web. And if you are missing ideas for add ons, there are often times simple request on the [Anki subreddit](https://reddit.com/r/Anki){:target="_blank"}.

Most initial steps might seem cumbersome, but once you know what you need to set up, you will redo these steps in no time!