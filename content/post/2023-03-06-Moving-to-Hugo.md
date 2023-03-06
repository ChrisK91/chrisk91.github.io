---
title:  Moving to Hugo
comments: true
date: "2023-03-06T00:00:00Z"
tags:
  - Static Site Generation
  - Hugo
  - Jekyll
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

A lot of my posts had embedded HTML-code to display figures. For these I created custom [shortcodes](https://gohugo.io/content-management/shortcodes/) to display single images and images within a grid. Going through all posts was a bit tedious, but at the same time it allowed me to also clean some spelling and grammatical errors.