---
title:  Moving to Hugo
comments: true
date: "2023-03-06T00:00:00Z"
tags:
  - Static Site Generation
  - Hugo
  - Jekyll
outline: true
---
I've always liked [static site generators](https://en.wikipedia.org/wiki/Static_site_generator) for my homepages, as they offer a variety of advantages for me. By nature, blog posts are updated very rarely. Static pages are easy to archive or download -- for instance you can find the earliest snapshot from 2018 working via the [wayback machine here](https://web.archive.org/web/20180203100154/http://chrisk91.me/). All modern static site engines allow for writing in markdown, making it easy for me to add posts.

In the past, I used [Jekyll](https://jekyllrb.com/) as my go-to, recently however I moved to [Hugo](https://gohugo.io/). When I started with this website you could easily host Jekyll-websites on GitHub (Jekyll was supported out of the box). Over time however, I wanted to develop my own themes and layouts to keep up with web-development. To get a broader understanding of other tools I tried out Hugo. I'm not sure whether it is *better* in any way than Jekyll, however I've become more proficient with it, so I'm currently sticking with it. The increase of services like [netlify](https://www.netlify.com/) allow for easy deployment and building your pages in the cloud making it possible to use custom packages and build steps (e.g. use a minified CSS-file with tailwind or resize images).

I've worked with multiple CSS-frameworks over the last years. I started with [bootstrap](https://getbootstrap.com/) and later moved to [foundation](https://get.foundation/). More recently I wanted to get back to the "personal touch" that custom CSS offers. And even though I'm by no means a designer, I've loved to create my own layouts in the past --- something that I felt was taken away by these frameworks. I've eventually arrived at [TailwindCSS](https://tailwindcss.com/). And although this is still a CSS framework I think that the provided utility-classes give me the ability to quickly scaffold websites while still having enough freedom to customize the resulting page.

The first page powered by Hugo and Tailwind was [medist.org](https://medist.org) starting with TailwindCSS version 2, it has however been updated to TailwindCSS version 3 in the meantime. As second homepage [christian-j.com](https://christian-j.com) was created initially using Hugo and a premade-theme. I also didn't need all of the theme's features, so the page was rewritten using Hugo and TailwindCSS. Up until now this very page [chrisk91.me](https://chrisk91.me) was left as Jekyll page with a custom theme written with the foundation CSS framework. The process of moving from Jekyll to Hugo is outlines below.

## Time to move

To start out, I moved everything to a new branch. Since the GitHub-repository of this site is public, you can review everything I did as code on [GitHub](https://github.com/ChrisK91/chrisk91.github.io/tree/tailwind-theme).

Hugo provides a built-in command to import from jekyll using `hugo import jekyll jekyll_root_path target_path`. I've then went ahead and created a blank [theme](https://gohugo.io/commands/hugo_new_theme/) and created the layout using Tailwind CSS version 3. Bryce Wray has a useful [post on how to include TailwindCSS version 3 in hugo](https://www.brycewray.com/posts/2022/03/making-tailwind-jit-work-hugo-version-3-edition/) that was very helpful here. The `tailwind.config.js` was customized to have custom fonts and colors. As I don't like the default \`backticks\` around code, in the default typography settings, I removed them in the config-file as well. The styling for code-blocks is achieved with styles in the container-div.

To keep old links working, I'm using [aliases](https://gohugo.io/content-management/urls/#aliases) that redirect old links to new links. To move Disqus comments, the [URL mapper migration tool](https://help.disqus.com/en/articles/1717129-url-mapper) was used.

A bit of cleanup work was necessary, however the import tool did great work in preserving the tags and site structure. I've rebuilt the menu of this site using Hugo's built-in [menus system](https://gohugo.io/content-management/menus/). The support for tags comes included for free after generating the necessary layout files and tags are kept from Jekyll.

On Jekyll I had a *blurb* in the front-matter of every post which corresponds to Hugo's [summary](https://gohugo.io/content-management/summaries/), so I renamed them in the front matter. For pages that don't have a summary Hugo will create them. The *blurbs* are used on the post-list. In the past the meta-tag was also filled with this, in my experience search engines will usually use their own snippets, so I'm currently not providing any meta-tags for SEO.

### Figures

A lot of my posts had embedded HTML-code to display figures. For these I created custom [shortcodes](https://gohugo.io/content-management/shortcodes/) to display single images and images within a grid. Going through all posts was a bit tedious, but at the same time it allowed me to also clean some spelling and grammatical errors. You can find an article with various images [here]({{< ref "2016-10-05-Hands-on-Color-models-and-ImageJ" >}}).

For a single image, the source is displayed with a caption, with a simple shortcode:

{{< code lang="html" filename="shortcodes/fig.html" >}}<div class="flex flex-col not-prose p-2 md:p-4 xl:p-6 md:shadow-lg bg-bluemedium/10 border border-bluemedium/20 xl:max-w-[80%] mx-auto">
{{ if .IsNamedParams }}
<img src="{{ .Get "src" }}" alt="">
{{ else }}
<img src="{{ .Get 0 }}" alt="">
{{ end }}

<p class="mt-2 text-base text-bluedark">{{ .Inner }}</p>

</div>
<!-- Usage: {{</* fig src="Url-To-Image.png" */>}}A short description{{</* /fig */>}} -->{{< /code >}}

The display of images in a grid is based on the helper-class `grid` and `grid-cols-X` (where `X` is the number of columns desired). The final structure is based on a helper-class that creates the containing grid (`figgrid.html`) which is filled with multiple figures (`gridfig.html`)

{{< code lang="html" filename="shortcodes/figgrid.html">}}<div class="not-prose grid grid-cols-{{ .Get "cols" }} gap-2 md:gap-4 xl:gap-6 ">
{{ .Inner }}
</div>
<!-- 
Usage below. Set cols to the desired number of columns:

{{</* figgrid cols="2"* />}}
  {{</* gridfig src="url-to-image.jpg"*/>}}Description{{</* /gridfig */>}}
  {{</* gridfig src="url-to-image.jpg"*/>}}Description{{</* /gridfig */>}}
  {{</* gridfig src="url-to-image.jpg"*/>}}Description{{</* /gridfig */>}}
  {{</* gridfig src="url-to-image.jpg"*/>}}Description{{</* /gridfig */>}}
  ...
{{</*/ figgrid */>}}
-->{{< /code >}}

{{< code lang="html" filename="shortcodes/gridfig.html">}}<div class="flex flex-col p-2 md:shadow-lg bg-bluemedium/10 border border-bluemedium/20">
    {{ if .IsNamedParams }}
    <img src="{{ .Get "src" }}" alt="">
    {{ else }}
    <img src="{{ .Get 0 }}" alt="">
    {{ end }}
    <p class="mt-2 text-base text-bluedark">{{ .Inner }}</p>
</div>{{< /code >}}

### Code highlighting

Previously, [highlight.js](https://highlightjs.org/) was used to highlight code segments on the old page. Code highlighting has the advantage of making snippets much easier to understand, so that was a feature I wanted to include in my new layout. The output of code highlight however won't change in the static context here. The snippets will always be the same, so it is desirable to generate "highlighted text" at built-time rather than shifting the work to the client/browser. Hugo has a [highlight function](https://gohugo.io/functions/highlight/) that comes in handy here. As with the figures, I created another shortcode to use with highlighted text that blends in nicely with the overall theme. As theme [Nord](https://www.nordtheme.com/) was used.

{{< code lang="html" filename="shortcodes/code.html" >}}<div class="not-prose font-mono max-w-full text-sm bg-bluemedium border-2 border-bluemedium shadow-lg my-4 hover:border-orange hover:bg-orange transition">
    <div class="overflow-x-scroll py-1 bg-codebg">
        {{ $input := (.Inner) }}
        {{ transform.Highlight $input (.Get "lang") "lineNos=table, style=nord" }}
    </div>
    {{ with .Get "filename" }}
    <div class="not-prose w-full text-white py-1 px-2">
        {{ . }}
    </div>
    {{ end }}
</div>
<!-- 
Usage:
You need to specify the language via the "lang" attribute. For a list see 
https://gohugo.io/content-management/syntax-highlighting/#list-of-chroma-highlighting-languages
filename renders a text below the code, optional.

{{</* code lang="language" filename="optional text" */>}}Your code sample here{{</* /code */>}}
-->{{< /code >}}

## Other improvements

With the new layout, articles now feature an outline on large browser windows to improve the reading experience. Hugo automatically generates them in the [.TableOfContents variable](https://gohugo.io/content-management/toc/). They can be enabled in the front matter, as the outline only makes sense in longer articles.
