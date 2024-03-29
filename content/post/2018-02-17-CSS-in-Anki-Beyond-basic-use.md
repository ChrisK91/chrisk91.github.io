---
summary: You can style your cards in Anki with CSS, that's nothing new. But we can also
  use some not so obvious CSS to add visual cues to help us remember stuff on our
  cards.
comments: true
date: "2018-02-17T00:00:00Z"
keypoints: |
  - A few ressources are given, to get your started with CSS
  - I will highlight some cases/code where CSS can add helpful tips/hints to your cards
keywords: anki, anki css
tags:
- Anki
- CSS
title: CSS in Anki — Beyond the basics
aliases:
    - /2018/02/17/CSS-in-Anki-Beyond-basic-use.html
outline: true
---
## Prerequisites and getting started

Under the hood, every Anki card is actually displayed as a website. These templates can be edited using the internal editor, located under the `Cards` button (when you edit cards). For this highlight of CSS uses in Anki, I assume that you are familiar with editing cards and note types. If these things are new to you, you can read up on them in the [official Anki manual](https://apps.ankiweb.net/docs/manual.html) (Sections "Adding a note type" and "Cards and templates"). The introduction also covers HTML and CSS, so I'm assuming you're familiar with that as well. A short introduction into HTML can be found [here]({{< ref "2018-09-28-Anki-Templates-Introduction-HTML" >}}). I have some links at the end, if you want to get deeper into CSS.

If you have a lot of shared CSS code, you can also put this code in a central file, and edit it from there. This is a more or less undocumented feature, and I wrote about it [here]({{< ref "2017-12-20-Sharing-CSS-across-multiple-cards-in-Anki" >}}).

I highly recommend the add-on *View HTML source with JavaScript and CSS styles*, which sadly isn't available from AnkiWeb anymore. I re-uploaded it [here](https://gist.github.com/ChrisK91/9b8eea9d8678fb1a2a240ddcfafbb133). Download the file, and place it in your add-on folder, which you can find in Anki under Tools &rarr; Addons &rarr; Open Addons folder. It makes debugging your cards a little easier.

{{< fig src="/images/anki_css/webview.png" >}}While we can use a lot of HTML tag's, this doesn't mean we should...{{< /fig >}}

## Creating visual clues based on deck

Let's suppose I have a lot of decks, and I want to create an indicator to show, where the card is from. In my main deck, this also gives me a sense of where I am in my reviews, since you do your reviews deck-vise (e.g. all reviews from subdeck A will come before you review subdeck B).

{{< fig src="/images/anki_css/subdecks.png" >}}A grand total of two subdecks...{{< /fig >}}

We will use a stylized div. A div element is a block element - it will be displayed as a rectangle. We will modify this element, to stretch all the way across the top. On the front, we will first add ```<div class="topbar">&nbsp;</div>```, and then style it with:

{{< code lang="CSS" >}}div.topbar {
 background-color: red;
 position: absolute;
 top: 0px;
 left: 0px;
 right: 0px;
 height: 5px;
}{{< /code >}}

{{< fig src="/images/anki_css/tb_1.png" >}}A red bar is now visible at the top of our cards{{< /fig >}}

First, by changing ```position``` to ```absolute```, we allow us to specify the exact position of the element. We then tell Anki to put our element all the way to the top, to the left _and_ to the right. The latter causes the element to stretch all the way to the right. The height is set to 5px. If you look at the code, we've also added a special ```&nbsp;``` there. This is to force the display of a space character. Otherwise, our element might not be created, since it is empty.

So, now we want to make this bar take a certain color depending on the deck the card is in. We will utilize the ```{{Subdeck}}``` field for that. We need to change our HTML slightly, to ```<div class="topbar {{Subdeck}}">&nbsp;</div>```. This will cause our underlying HTML to change as well &mdash; the name of the subdeck will be inserted, and the resulting HTML will look something like this ```<div class="topbar My first subdeck">&nbsp;</div>```.

Now, you might see where this is going... *We are using the name of the subdeck as CSS class*. In order for our trick to work, we now need to look for words, that are unique for our subdecks.

My subdecks are named "My first subdeck" and "My second subdeck". Both words "My" and "subdeck" occur in both names. Unique words are "second" and "first". Let's use these as class to color the topbar. I will also make it gray by default:

{{< code lang="CSS" >}}div.topbar {
 background-color: lightgray;
 position: absolute;
 top: 0px;
 left: 0px;
 right: 0px;
 height: 5px;
}

div.topbar.first {
 background-color: blue;
}

div.topbar.second {
 background-color: green;
}{{< /code >}}

{{< fig src="/images/anki_css/subdeck_dependent.png" >}}The bar is now green, as defined by our subdeck{{< /fig >}}

Please note, that the template editor doesn't always account for the right subdeck your currently in, so it might show a "wrong" color during editing. Since ```.first``` and ```.second``` are also some pretty generic classes, I apply the style here only to elements, that have both classes, ```.topbar``` and either ```.first``` or ```.second```.

Also note, that the ```{{Subdeck}}``` (in the HTML on the front) comes _after_ the ```topbar```-class, so it has higher priority and can override the more generic styles.

## Contextual images based on tags
Sometimes, you might want to display an image, depending on a category on your card. You can achieve this either by pasting the image directly, or we can for instance show a small image depending on a tag. In this example, I have a lot of cards containing either *food* or *drinks*. I want a small image to appear on the back, depending on the category.

For that, I have tagged my cards with the *food* tag, when they are about food, and for *drinks* vice versa. I've placed two image files (named "\_food" and "\_drink") in my collection.media folder (on Windows `%APPDATA%\Anki2`, on Mac `~/Library/Application Support/Anki2`, on Linux `~/.local/share/Anki2`, see the official [documentation](https://apps.ankiweb.net/docs/manual.html#files) if you can't find it). If you name the files with a leading underscore, Anki won't remove them, when you check for unused media.

I've added both images on the back of the card:

{{< code lang="html" filename="back template" >}}{{FrontSide}}

<hr id=answer>

{{Back}}

<img class="context_image">{{< /code >}}

And styled them with:

{{< code lang="CSS" filename="styling" >}}img.context_image
{
 width: 50px;
 height: 50px;
 position: absolute;
 bottom: 10px;
 right: 10px;
}{{< /code >}}

Again, we will use a field to selectively display an image, this time ```{{Tags}}```. We can change the image, using the ```content``` property.

{{< code lang="html" filename="back template" >}}{{FrontSide}}

<hr id=answer>

{{Back}}

<img class="context_image {{Tags}}">{{< /code >}}

And style them with:

{{< code lang="CSS" filename="styling" >}}img.context_image
{
 width: 50px;
 height: 50px;
 position: absolute;
 bottom: 10px;
 right: 10px;
}

.drink { content: url("_drink.svg"); }
.food { content: url("_food.svg"); }{{< /code >}}

{{< figgrid cols="2" >}}
{{< gridfig src="/images/anki_css/food_1.png" >}}The <i>food</i>-tag displays a bread...{{< /gridfig >}}
{{< gridfig src="/images/anki_css/drink_1.png" >}}... and the <i>drink</i>-tag displays a cocktail.{{< /gridfig >}}
{{< /figgrid >}}

## Changing the background

The last example comes from Reddit, where someone wanted to change the card background based on the gender of a card. For that, I added a "gender" field to my card. This field is either "m" for male or "f" for female. Based on these, I want the background on the back to be either blue or red.

{{< fig src="/images/anki_css/fields.png" >}}You can add fields via the "fields" button in the editor.{{< /fig >}}

The code here is pretty straight forward. We will again use a ```div```-Element, but this time stretch it all the way over our card. We can position the element on the back, using the ```z-Index```. Imagine the content of your cards to be like layers. With the ```z-Index```, we can display an element either on top of other stuff, or below it.

{{< code lang="html" filename="back template" >}}{{FrontSide}}

<hr id=answer>

{{Back}}
<div class="genderhint {{Gender}}">&nbsp;</div>{{< /code >}}

{{< code lang="css" filename="styling" >}}.genderhint {
 position: fixed;
 top: 0px; bottom: 0px; left: 0px; right: 0px;
 background-color: transparent;
 z-Index: -1;
}

div.genderhint.m { background-color: lightblue }
div.genderhint.f { background-color: salmon }{{< /code >}}

{{< fig src="/images/anki_css/genderhint.png" >}}The background is now controlled by the field.{{< /fig >}}

This template works similar to our first setup. The content of the ```Gender```-field is inserted as class of our div. A fixed set of classes then specifies the background color. This time, we also extend the div across the full width. The ```fixed```-position makes the position independent of scroll, so it always stays put (otherwise it would move out of view when scrolling).

## Summary

CSS offers some interesting options to help you memorize your cards. You can automate a lot of clues, without using JavaScript, and changes in CSS sync across devices via AnkiWeb. With the new upcoming version of Anki, the rendering engine (what actually displays the HTML code) will change, so we can even use more recent features of CSS3. If you have any questions, more ideas/requests or a custom CSS setup, let me know in the comments!

## Further reading

- The MDN has a very good CSS introduction [here](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS). It is more geared towards web developers, but it also gives you a good insight into how things work.
- On MDN, there is also a great intro to HTML, available [here](https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Getting_started).
- A different [post]({{< ref "2017-12-20-Sharing-CSS-across-multiple-cards-in-Anki" >}}) about sharing CSS across cards, when you want to reuse your CSS.
