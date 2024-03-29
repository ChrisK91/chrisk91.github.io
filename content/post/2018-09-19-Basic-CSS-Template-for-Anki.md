---
summary: I've always wanted to create a "base"-style for Anki. Several elements (for
  instance lists) don't look that great in Anki, and I have created a small CSS to
  rectify that.
comments: true
date: "2018-09-19T00:00:00Z"
keypoints: |
  - I present a small and basic Anki CSS template, which covers the basic styles included with Anki
  - This template supports night mode and Anki web
keywords: anki css, anki css template, anki lists
tags:
- Anki
- CSS
title: Basic CSS-Template for Anki
aliases:
    - /2018/09/19/Basic-CSS-Template-for-Anki.html
menu:
    tools:
        weight: 1000
        name: Anki CSS Template
---

## Motivation

The basic Anki template just centers text. It leaves background, lists, code snippets etc. to the browser. This creates some issues, for instance lists tend to look out of place, and some stuff might just look out of place. I've created a small template, which implements some basic styles beyond just centered text. Here is a small outline of features:

- A light background and no colors create a distraction free environment
- On large screens, the content "stays" in the center
- Code listings and lists are aligned to the left, so that indentation becomes useful again
- Support for blockquote, code, pre and hr tags
- Support for the [night mode add-on](https://ankiweb.net/shared/info/1496166067)
- *Support for vanilla card templates without altering the HTML code*

Do you have *feature requests, feedback or questions*? Leave them in the comments at the end of the page

### Screenshots

{{< figgrid cols="2" >}}
{{< gridfig src="/images/anki_css_style/normal.png" >}}Normal mode{{< /gridfig >}}
{{< gridfig src="/images/anki_css_style/night_mode.png" >}}Night mode with the night mode plugin{{< /gridfig >}}
{{< /figgrid >}}

&nbsp;

{{< fig src="/images/anki_css_style/normal_wide.png" >}}Wide mode on a large screen{{< /fig >}}

## Installation

Head over to the [GitHub Repository](https://github.com/ChrisK91/Universal-Anki-CSS/blob/master/output/_base.css) and download the file `output/_base.css` ([direct link](https://raw.githubusercontent.com/ChrisK91/Universal-Anki-CSS/master/output/_base.css)), and place it in your `collection.media`-folder.

{{< fig src="/images/anki_css_style/cards_button.png" >}}A small change has to be made to load the CSS file{{< /fig >}}

Now, inside Anki, open the card editor, and click the *Cards* button. Replace/Insert ```@import url("_base.css");``` into the *Styling* field, and the template will load right away.

To add lists and "advanced" elements in Anki, you'll need an add-on, for instance [Mini Format Pack](https://ankiweb.net/shared/info/295889520).

## Planned features

- Support for cloze-elements
- Restyle inputs/`type`-fields
- Styles for images/audio

If you have feature requests, that might also be useful for others, please don't hesitate to contact (for instance via the comments below).
