---
summary: VSCode has become a powerful editor for Python. Here I share my setup, to develop
  Anki addons using VSCode.
comments: true
date: "2018-02-13T00:00:00Z"
keypoints: |
  - I will highlight configuration steps to set up Visual Studio Code for Anki development
keywords: anki, anki and vscode, anki IDE
tags:
- Anki
- Addon Development
title: Setting up VSCode for Anki add on development.
aliases:
    - /2018/02/13/Setting-up-VSCode-for-Anki-addon-development.html
outline: true
---
Recently, I wrote my very first [add on for Anki](https://ankiweb.net/shared/info/181219369), using Visual Studio Code with the official [Python add-on for VSCode](https://marketplace.visualstudio.com/items?itemName=ms-python.python). With Visual Studio Code, you can easily write and debug code and add-ons, you will write in the future.

## Prerequisites

To get full debugging support, we need to get the Anki source. It is available at the [download section of the website](https://apps.ankiweb.net/) under *Linux/BSD* &rarr; *Other Options* &rarr; *Source.tgz*. At the time of writing, the version was *2.0.47*. Download the source and extract it to a location of your liking.

### Python 2.7

>The section below will describe how I set up my Python 2.7 environment. If you have Python 2.7 already set up, you can skip ahead. Just make sure, you can run anki from source before proceeding, by using the `anki.bat` file in the source directory

Now, we need to get Python 2.7 running. On my machine, I have Anaconda installed, so I will create a new environment for Python 2.7, using the [conda package and environment manager](https://conda.io/docs/) which comes with the scientific [Anaconda distribution](https://www.anaconda.com/download/). If you're interested in a more lightweight setup, you can also try out [Miniconda](https://www.anaconda.com/download/), which excludes the scientific libraries, that come with Anaconda.

I set up the environment with ```conda create --name python2 python=2.7```. This will create a bare-bones Python 2.7 environment without any additional stuff in it. Once successful, this command will also state how to activate the new environment:

{{< code lang="bash" >}}# To activate this environment, use:
# > activate python2
#
# To deactivate this environment, use:
# > deactivate python2{{< /code >}}

We can check our setup on the command line via (```>``` denotes input):

{{< code lang="bash" filename="> denotes input" >}}>activate python2
(python2)>python --version
Python 2.7.13 :: Continuum Analytics, Inc.{{< /code >}}

Before installing additional modules, make sure your virtual environment is set to the newly created one. Here, this is shown by the ```(python2)``` in front of the command line input.

We also need PyQt in version 4 ```conda install pyqt=4```, which will include of additional dependencies as well, including Qt. Finally, we need the Python extensions for Windows, ```conda install pywin32```.

Now everything is set up, and you can run Anki by starting ```anki.bat``` from the command line (inside your environment).

## Setting up a project folder

For my add-on, I've set up the GitHub folder ready, to run Anki straight from the current directory. This way, one can easily fork the add-on, and create a new profile (for debugging purposes) in the same directory. For that, we will have the following structure:

{{< code lang="Text">}}Anki_dev-Folder/
    |
    +-- addons/
        |
        +-- my_addon.py{{< /code >}}

In the file ```my_addon.py```, I've inserted the test code from [the documentation](https://apps.ankiweb.net/docs/addons.html)}, which you can find below:

{{< code lang="python" filename="my_addon.py" >}}# import the main window object (mw) from aqt
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
mw.form.menuTools.addAction(action){{< /code >}}

Now you should end up with something like this in VSCode:

{{< fig src="/images/anki_addon_guide/initial_setup.png" >}}{{< /fig >}}

## Configuring the "run" action

Hit {{< kbd >}}F1{{</ kbd >}} and enter "launch", to create and edit the `launch.json` configuration file

{{< fig src="/images/anki_addon_guide/launch.png" >}}{{< /fig >}}

The now opened `.json` file is documented [here](https://code.visualstudio.com/docs/python/debugging) and allows us, to specify the Python directory and command line arguments. We need to specify the options as below:

{{< code lang="JSON" filename="launch.json" >}}{
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
}{{< /code >}}

As you can see, you need to specify multiple values:

- ```pythonPath```: is pointed to the python binary. This will reside (with Anaconda/Conda) in your setup directory, in the subfolder "envs"
- ```program```: points to the entry python file. This is actually the file that is invoked via ```python runanki```, when you start anki via ```runanki.bat```
- ```args```: We can specify a custom profile location via the ```-b PATH``` command. This way, Anki creates a new profile in the current directory (note the ```.``` as current folder). Also, since our code is already in the addons subfolder, it will run as soon as we start Anki.

Hit {{< kbd >}}F5{{</ kbd >}} and debugging should start. You can also start debugging via the debugging pane on the left (under the "No bug" sign).

{{< fig src="/images/anki_addon_guide/initial_start.png" >}}{{< /fig >}}

Create a new profile, and open the "tools" menu. And there we have it: our "test" entry got created:

{{< fig src="/images/anki_addon_guide/test_menu.png" >}}{{< /fig >}}

## Autocomplete

First, it would be nice to have auto-completion and code lookup working. We can enable this in the workspace settings:

{{< fig src="/images/anki_addon_guide/wssettings.png" >}}{{< /fig >}}

Search for "autocomplete", click the pen symbol next to ```"python.autoComplete.extraPaths"```, and again add the path to your Anki source location. Be careful to either escape backslashes or use forward slashes.

{{< fig src="/images/anki_addon_guide/ws_edited.png" >}}{{< /fig >}}

You are now able to use Intellisense to autocomplete names and functions. You can also go to the corresponding source for Anki files with {{< kbd >}}Ctrl{{</ kbd >}} and clicking a function name, and you can see annotations/docstrings if available.

{{< fig src="/images/anki_addon_guide/intellisense.png" >}}{{< /fig >}}

## Linting

{{< fig src="/images/anki_addon_guide/missing_import.png" >}}{{< /fig >}}

Now, you might note, that after saving, a lot of squiggly lines appear. This is because the [linter](https://en.wikipedia.org/wiki/Lint_(software)) invoked by the VSCode extension doesn't know where the Anki source code is located. We can remedy this by creating the file ```.pylintrc```, specifying where your Anki source code is located:

{{< code lang="ini" filename=".pylintrc" >}}[Master]
init-hook='import sys; sys.path.append("X:/.../anki-2.0.47/")'{{< /code >}}

{{< fig src="/images/anki_addon_guide/pylint.png" >}}{{< /fig >}}

After editing and resaving your file, all the red squiggly lines will disappear.

If there are still errors in the linted file, this might due to VSCode using the wrong linter (i.e. a Python 3 linter instead of 2). We again can remedy this in the workspace file, by editing the workspace settings, and specifying the ```python.pythonPath```. You need to give the fill path to the python executable, like we did in the *launch.json* file.

{{< fig src="/images/anki_addon_guide/selectingpython.png" >}}{{< /fig >}}

Sometimes VSCode is unable to install pylint. In that case, go to the command line, activate your environment (```>activate python2```) and run ```>conda install pylint```. Now everything should lint fine. In my experience, pylint has some issues with pywin32 sometimes, but it should give you a general idea.

## .gitignore
Last but not least, it would be a good idea to exclude some stuff in a ```.gitignore``` file, in case you want to use version control. My file looks like this, to exclude VSCode settings, pylint settings, *.pyc files and the actual Anki profile that is generated:

{{< code lang="txt" filename=".gitignore" >}}*.db
User 1/
.vscode/
.pylintrc
*.pyc{{< /code >}}

## Final remarks

Now you've got everything up and running. You have a full debugger at your hands, you can set breakpoints and inspect variables at run time. If you need starting help with the actual code, I encourage you to check out other plugins source code from listing on Anki Web. And if you are missing ideas for add-ons, there are often times simple request on the [Anki Subreddit](https://reddit.com/r/Anki).

Most initial steps might seem cumbersome, but once you know what you need to set up, you will redo these steps in no time!
