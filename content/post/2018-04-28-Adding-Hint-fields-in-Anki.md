---
summary: Ever wondered how you can add a hint in Anki, for the time when you just can't
  remember an answer? It's rather simple with some basic CSS and JavaScript
comments: true
date: "2018-04-28T00:00:00Z"
keypoints: |
  - We will prepare a note type with a hint field
  - We will use two methods to show a hint
keywords: anki, anki hints, hints in anki
tags:
- Anki
- CSS
title: Adding Hints in Anki
aliases:
    - /2018/04/28/Adding-Hint-fields-in-Anki.html
outline: true
---

Sometimes you might need a little help to remember stuff. In that case, a hint field might come in handy in Anki. There is even a built-in hint solution to easily create hints without knowing how to code. And even if you don't know how to code, adding a more advanced hint button to your cards isn't that hard.

{{< fig src="/images/anki_hints/css_hint.png" >}}Our custom hint with CSS and JavaScript{{< /fig >}}

## Preparing the note type

In Anki, stuff you enter is kept as a "note". Templates - that are specific for your note - tell Anki which cards to create. For our "hint cards", we first want to create a new note type, in order to not affect already existing notes in Anki.

> If you want to add a hint to a different type than "Basic", just select a different note in step 4 (e.g. Clone: **Your note**)

1. Add a new card and select the note type (button in the top left corner, hotkey {{<kbd>}}Ctrl + N{{</kbd>}})
2. Select "Manage" to manage your note types
3. Click "Add"
4. You can either clone an existing note type (with all its custom templates and fields), or create a new one based on the built-in note types that come with Anki.
5. Give it a meaningful name and...
6. ... select it as your current note type.

{{< fig src="/images/anki_hints/new_note.png" >}}1. When adding a note, click on the note type {{< kbd >}}(Ctrl + N){{< /kbd >}}{{< /fig >}}

&nbsp;

{{< figgrid cols="2" >}}
{{< gridfig src="/images/anki_hints/manage_note.png" >}}2. Click on "Manage"{{< /gridfig >}}
{{< gridfig src="/images/anki_hints/add_note.png" >}}3. Click "Add" to create a new note type{{< /gridfig >}}
{{< gridfig src="/images/anki_hints/add_basic.png" >}}4. Select the note type you want to add a hint to{{< /gridfig >}}
{{< gridfig src="/images/anki_hints/new_note_named.png" >}}5. Specify a name{{< /gridfig >}}
{{< gridfig src="/images/anki_hints/basic_chooser.png" >}}6. Select your new note type{{< /gridfig >}}
{{< /figgrid >}}

Next we need to add a field by selecting the "Fields" button in the top left of the "Add card" window, and add a Hint field via the "Add" button.

{{< fig src="/images/anki_hints/add_field.png" >}}Add a hint field.{{< /fig >}}

## Editing the template

For testing purposes, you can now enter some text into all three fields. Then click on the "Cards..." button to edit the template.

We now have two options:

- Use Anki's built-in hint system
- Use our own CSS and JavaScript to show a hint

### Use Anki's built in hint system

Add ```{{#Hint}}{{hint:Hint}}{{/Hint}}``` to the front side. The wrapping ```{{#Hint}}...{{/Hint}}``` are conditional fields. Everything between them will only be shown, if the "Hint" field has text in it. That means, if you use this template without a hint text, it will just look like a basic Anki card. ```{{hint:Hint}}``` is replaced with a link "Show hint", that displays the content of your hint field when clicked. Keep in mind, if you want more space between your question and the hint, you can simply add multiple ```<br />```, which are nothing more than line breaks.

{{< fig src="/images/anki_hints/simple_hint.png" >}}{{< /fig >}}

### Create your own hints

Note: the button won't work in the editor, it will only function on live cards.

Using the code below, we again wrap our hint into a conditional field. We also create a button to toggle the hint, and a div-element to contain the text. Both have an ID to access them from JavaScript (and jQuery 1.5 that comes with Anki), and to style them.

{{< code lang="html" filename="front template" >}}{{Front}}

{{#Hint}}
<br /><button id="hintbutton">Hint</button>
<div id="hint" style="display:none">{{Hint}}</div>

<script>
var hidden = true;
$("#hintbutton").click(function() {
  if(hidden)
  {
     $("#hint").fadeIn( );
  }
  else
  {
     $("#hint").fadeOut( );
  }
  hidden = !hidden;
});
</script>
{{/Hint}}
{{< /code >}}

Without some styling, this looks pretty plain, so I came up with some simple CSS below, that turns the button and the hint green.

{{< code lang="css" filename="styling" >}}#hintbutton {
  margin-top: 2em;
  font-size: 0.7em;
  width: 75px;
  background-color: lightgreen;
  border: 1px outset lime;
}

#hint {
 margin: 0.7em auto 0 auto;
 padding: 0.2em;
 border-radius: 5px;
 border: 1px lime outset;
 background-color: lightgreen;
 width: 75%;
}{{< /code >}}

## Final remarks

The built-in Anki solution provides an easy, yet bare-bones solution to adding hints on your cards. If you want to style them to your liking, it's probably easier to implement them in CSS or JS. If you want to use hints on multiple note/card types, you could [share your code across multiple cards]({{< ref 2017-12-20-Sharing-CSS-across-multiple-cards-in-Anki >}}). In case you come up with other solutions, or a cool style for your hints, feel free to share it in the comments below!
