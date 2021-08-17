---
layout: post
title: My collection of medical calculators and checklists - medist.org
blurb: With my graduation last year, I've started a page, to create a tidied collection of my current notes. As with my personal page, it is based on Hugo, which I find a bit more flexible to work with in comparison to Jekyll. If you're interested in the technical stuff, this post is for you!
tags: [personal]
keywords: jekyll pagination, github pagination, foundation
comments: true
---

I've now been working for over 1,5 years as a doctor... Well, it's still a bit weird to say it like that. But with practicing, I've become a less regular user of Anki. Depending on schedule, it's difficult to finish your cards every day. Since I've started working, I've always carried a small notebook with me. In there, I scribble down small things throughout the day. In the evenings or on the weekend, I clean them up and put them in a Word document.

The document has grown into a remarkable size. However, there is one catch: accessing it is not always easy. At work, I could open it on my cellphone, but the structure is not that useful on a small device. This is why I decided to move notes, lists and formulas to a small webpage. It even contains a few calculators, which I found useful or interesting in everyday work.

I've never been really creative with names, so I just took the first domain that came to mind (and that wasn't taken), and put the stuff up on https://medist.org which is a conjunction of **med**ical checkl**ist**.

## Technical aspects

The site itsels is built with Hugo. With new projects, I try to incorporate a few things for me to learn. I was already a bit familiar with Hugo, but this time I wanted to start from the ground up. Starting with the naked tailwind based [theme from @dirkolbrich](https://github.com/dirkolbrich/hugo-theme-tailwindcss-starter){:target="_blank"}, I've modified slightly and added bilangual support.

Thanks to the new GitHub Actions, there is now an action to build a Hugo page, without relying on third party services.

The page itself is hosted on GitHub pages, and the code-behind-repository is publicly available via [@ChrisK91/Checklists](https://github.com/chrisk91/checklists){:target="_blank"}.

There are a few calculators, which are based on Vue.js (since I don't really know about the new js stuff). But they work, and that's enough for me. The site itself is fully static, since I wanted to package it as a web app, so it works without internet connectivity. But so far I didn't have too much luck with that... Especially offline caching makes this difficult.

If you're interested in the new page, head over to [medist.org](https://medist.org){:target="_blank"}, and have a look around. I'm looking forward to see you there!
