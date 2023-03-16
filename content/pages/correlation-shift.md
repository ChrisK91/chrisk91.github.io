---
layout: single_column
title: correlation shift
url: /tools/correlation-shift.html
menu:
    tools:
        weight: 1001
        name: Correlation Shift
---
You can use this tool to maximize the correlation of two images. This can be useful if you experience a certain shift when switching channels. The program calculates the Pearson Product-Moment coefficient and determines to offset where it reaches its maximum. Especially if features are present with the same intensity in both channels, they tend to be aligned very well.

> [**Download**](https://github.com/ChrisK91/Correlation-Shift/releases)
>
> *Select x64 (64bit) or x86 (32bit) depending on your architecture*

This tool is released under the MIT license. Feel free to copy and redistribute it.

{{< fig src="/images/tools/correlation-shift.png" >}}Correlation Shift can be used to align images based on their correlation coefficient.{{< /fig >}}

### Notes

- You need grayscale tif files with either 8 or 16 bit depth
- Images will be matched in alphabetical order. If the *Run* button is disabled, one box contains a different number of images than the other.
- Make sure that the files have the same resolution, otherwise the program will crash
- *On 64 bit machines*: The software will use multithreading to process images in parallel. If you have large images you might need to limit the number of parallel threads. See the settings below on instructions how to do that
- Only full pixel steps will be calculated. If you want to use half pixel steps you can work around this by doubling the resolution of your images (e.g. in ImageJ). Be aware of interpolation artifacts.
- Using this tool will most likely change correlation and colocalization data. It is proper scientific practice to *fully report* image transformation and discuss these steps in any results based on aligned images. Using a tool for shifting makes the process of alignment automated and reproducible. You should still check the results manually.

### Usage

- Drop the files of channel 1 in the left box (these will be shifted)
- Drop the files of channel 2 in the right box
- Click run and specify an empty output directory

### Settings

You can access the configuration file via *About &rarr; Open application folder*. Right click the *configuration.xml* file and open with notepad. The following options are available:

`MinX` and `MinY`: The minimum offset along the X/Y axis in pixel, default `-20`

`MaxX` and `MaxY`: The maximum offset along the X/Y axis in pixel, default `20`

`ImageJPath`: The absolute path to ImageJ (e.g. `C:\ImageJ\ImageJ-win64.exe`). Default `null`. If specified: ImageJ will be used to perform an actual shift of the images. It is recommended to not touch anything while ImageJ is working ;)

`MaxThreads` (x64 only): Determines the maximum amount of worker threads. Default `-1`, uses twice the amount of logical cores. Set this to a lower number if the program crashes with a memory warning.