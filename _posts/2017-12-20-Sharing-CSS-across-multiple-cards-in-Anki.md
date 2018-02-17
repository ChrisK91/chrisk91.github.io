---
layout: post
title: Sharing CSS across multiple cards in Anki
keypoints: | 
    - We will create a basic CSS file in Ankis media folder
    - We will then integrate this CSS file in a number of cards
    - A few caveats are pointed out
blurb: Tired of copying and pasting various CSS snippets across multiple cards? By using the CSS `@include`, you can share the same CSS file across multiple cards.
tags: [Anki, CSS]
keywords: anki, share css, share css across cards
comments: true
---

## Introduction

In Anki, we have the ability to edit the CSS of individual cards. When you work with multiple cards, you might want to use the same *base css*. This way, you can specify the same font, font size, background and maybe even utility styles for all cards.

## Prerequisites

- I highly recommend the [Refresh Media References](https://ankiweb.net/shared/info/162278717){:target="_blank"} add on. This makes synchronizing your CSS and updating the card really easy.
- Locate your media folder. This folder can be found inside your Anki folder (on Windows `%APPDATA%\Anki2`, on Mac `~/Library/Application Support/Anki2`, on Linux `~/.local/share/Anki2`, see the official [documentation](https://apps.ankiweb.net/docs/manual.html#files){:target="_blank"} if you cant find it). Inside the Anki folder, there will be a folder with the same name as your profile (the name will be "default" in most cases). Open this profile folder, and head right into the `collection.media` folder, which will be located here. On windows, the full name will be something like `%appdata%\Anki2\default\collection.media\` (and similar on other operating systems)

## Creating the CSS and including it on your cards

Inside your media folder, create your base CSS file. *I recommend to start the name with an underscore (_)*. This way, the file won't get removed when you check for unused media. It will also be included, when you export your deck. Here, I used `_anki_base.css`

<div class="grid-x align-center text-center">
    <div class="cell large-10">
        <div class="card"><img src="/images/anki_images/css_shared/file.png" itemprop="image" />
        <div class="card-section sub">This is the place, where your CSS will reside</div>
        </div>
    </div>
</div>

Obviously you now need to fill the file with the CSS of your choice. The standard layout of my cards is below, in case you need inspiration.

<pre><code class="css">body {
    background-color: transparent;
    font-family: Arial;
    font-size: 1em;
    color: black;
}

.card {
    font-size: 1.7em;
    line-height: 1.5em;
    text-align: center;
}</code></pre>


Now we obviously need to include our CSS on our cards, utilizing `@include`. This can be done, by editing your card template. Just insert `@import url("_anki_base.css");` in your CSS, and you're ready to go. When displaying your cards, Anki has set your media folder as base, so if you do further includes stuff/reference images/etc., you have to do it either in absolute paths, or relative to your media collection folder.

<div class="grid-x align-center text-center">
    <div class="cell large-10">
        <div class="card"><img src="/images/anki_images/css_shared/css.png" itemprop="image" />
        <div class="card-section sub">We can reference the created file with an @import</div>
        </div>
    </div>
</div>

## Troubleshooting

- If you edit your CSS, you most likely will notice, that new cards still have the same old CSS. This is, because your CSS file is cached. With the [Refresh Media References](https://ankiweb.net/shared/info/162278717){:target="_blank"} add on, you can simply go to Tools &raquo; Refresh Media, in order to update your view. Don't do that excessively though, because it might increase memory consumption.
- I recommend editing your CSS in the card editor, and pasting it into your base file when you're happy with it. The preview in the card editor will update in real time.
- Changes in your CSS file will not always sync. Use the add on mentioned above, to work around that. Refresh Media will mark your file for uploading on the next sync.
- As always: back up your folders regularly

And that's it. Look out for a future post about how CSS can be used to add visual cues on your cards!