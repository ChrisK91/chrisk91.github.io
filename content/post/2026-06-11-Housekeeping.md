---
summary: I've been running my websites for a few years now, time for some updates. I share some thoughts and updates in this short post.
comments: false
date: 2026-06-02
tags:
- personal
title: Housekeeping my projects
---

It has been quite a while since this page has been updated to use Hugo as static site generator. In the meantime, I have worked on a few side projects. Most changes have been largely invisible, e.g. new pages with privacy policies (as required for some apps). Adding them has been quite easy, thanks to the [GitHub-Action](https://github.com/ChrisK91/chrisk91.github.io/commits/master/.github/workflows/pages.yml) that rebuilds this page when I add new pages. You can see, only a few commits have happened in the last few years, mainly due to changes in the used/linked actions.

### Updating Hugo

The page used to run Hugo 0.111.2 up until now. Updating was not that much of an issue. The only minor problem was Tailwind CSS/node requiring some additional configurations for the [security configuration](https://gohugo.io/configuration/security/), i.e. the addition of a security exclusion that node can access the file system. The site still works with Tailwind 3, which I have left in place for now. While the design might not be the most modern, I still like it. The main font however has been changed to a more legible one.

### Reach, impact and plans

While this page has not seen many new posts, I have a few other pages that have seen some attention. Another focus of mine has been the development of some apps in the play store. I do track the pages with the webmaster tools of google and bing, and this page has around 300 clicks per month. My other page [medist.org](https://medist.org) also has around 300 to 500 visitors each month.

This page is mainly my "hobby" page, so updates will continue to be sporadic. I'm currently working a lot with esphome and home assistant, so there might be some updates about that in the future.

I do plan on updating this site to Tailwind 4 sometime in the future. I'm also thinking about the comments. They currently use Disqus, which I might change to another service in the future (or remove them entirely and "embed" the existing comments statically so they wont get lost).

**Update:** The site has now also been updated to Tailwind 4, which wasn't really too much of an issue. Hugo has a [`tailwindcss` function](https://gohugo.io/functions/css/tailwindcss/) with a good explanation to get you almost all the way there.