---
summary: Tired of copying and pasting various CSS snippets across multiple cards? By
  using the CSS `@include`, you can share the same CSS file across multiple cards.
comments: true
date: "2017-12-20T00:00:00Z"
keypoints: |
  - We will create a basic CSS file in Ankis media folder
  - We will then integrate this CSS file in a number of cards
  - A few caveats are pointed out
keywords: anki, share css, share css across cards
tags:
- Anki
- CSS
title: Sharing CSS across multiple cards in Anki
aliases:
    - /2017/12/20/Sharing-CSS-across-multiple-cards-in-Anki.html
---

## Introduction

In Anki, we have the ability to edit the CSS of individual cards. When you work with multiple cards, you might want to use the same *base CSS*. This way, you can specify the same font, font size, background and maybe even utility styles for all cards.

## Prerequisites

- I highly recommend the [Refresh Media References](https://ankiweb.net/shared/info/162278717) add-on. This makes synchronizing your CSS and updating the card really easy.
- Locate your media folder. This folder can be found inside your Anki folder (on Windows `%APPDATA%\Anki2`, on Mac `~/Library/Application Support/Anki2`, on Linux `~/.local/share/Anki2`, see the official [documentation](https://apps.ankiweb.net/docs/manual.html#files) if you can't find it). Inside the Anki folder, there will be a folder with the same name as your profile (the name will be "default" in most cases). Open this profile folder, and head right into the `collection.media` folder, which will be located here. On Windows, the full name will be something like `%appdata%\Anki2\default\collection.media\` (and similar on other operating systems)

## Creating the CSS and including it on your cards

Inside your media folder, create your base CSS file. *I recommend starting the name with an underscore (_)*. This way, the file won't get removed when you check for unused media. It will also be included, when you export your deck. Here, I used `_anki_base.css`

{{< fig src="/images/anki_images/css_shared/file.png" >}}This is the place, where your CSS will reside{{< /fig >}}

Obviously you now need to fill the file with the CSS of your choice. The standard layout of my cards is below, in case you need inspiration.

{{< code lang="css" filename="_anki_base.css" >}}body {
    background-color: transparent;
    font-family: Arial;
    font-size: 1em;
    color: black;
}

.card {
    font-size: 1.7em;
    line-height: 1.5em;
    text-align: center;
}{{< /code >}}


Now we obviously need to include our CSS on our cards, utilizing `@include`. This can be done, by editing your card template. Just insert `@import url("_anki_base.css");` in your CSS, and you're ready to go. When displaying your cards, Anki has set your media folder as base, so if you do further include stuff/reference images/etc., you have to do it either in absolute paths, or relative to your media collection folder.

{{< fig src="/images/anki_images/css_shared/css.png" >}}We can reference the created file with an @import{{< /fig >}}

## Troubleshooting

- If you edit your CSS, you most likely will notice, that new cards still have the same old CSS. This is, because your CSS file is cached. With the [Refresh Media References](https://ankiweb.net/shared/info/162278717) add on, you can simply go to Tools &raquo; Refresh Media, in order to update your view. Don't do that excessively though, because it might increase memory consumption.
- I recommend editing your CSS in the card editor, and pasting it into your base file when you're happy with it. The preview in the card editor will update in real time.
- Changes in your CSS file will not always sync. Use the add-on mentioned above, to work around that. Refresh Media will mark your file for uploading on the next sync.
- As always: back up your folders regularly
- Some add-ons can interfere with custom CSS. You can temporarily disable all add-ons by holding the {{<kbd>}}Shift{{</kbd>}}-key when starting Anki (works both in 2.0 and 2.1)
