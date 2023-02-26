---
blurb: If you're running a blog with more than 5 posts, why not add pagination? Here
  I share my code with you, so if you're running a GitHub page with Jekyll, you can
  easily add pagination to your site as well!
comments: true
date: "2018-09-09T00:00:00Z"
keypoints: |
  - I share some code, to add styled pagination for Jekyll sites based on Foundation Sites 6
  - The code runs on GitHub pages, so you don't need to build your site locally/run jekyll on CI
keywords: jekyll pagination, github pagination, foundation
tags:
- Jekyll
title: Pagination with Jekyll and Foundation Sites 6
---

## Prerequisites
This posts assumes, that you already have a site running. It's also a good idea to run ```bundle update```, to get your dependencies up to date. I will utilize the [jekyll pagination plugin](https://jekyllrb.com/docs/pagination/){:target="_blank"} which is available on GitHub pages, so you don't need to build your site locally.

*Important:* the plugin only works when your posts are listed on your ```index.html``` page, this is a restriction of GitHub pages, which bundles [jekyll-paginate in version 1.1.0](https://pages.github.com/versions/){:target="_blank"} at the time of writing.

<div class="grid-x align-center text-center">
    <div class="cell large-6">
        <div class="card">
            <img src="/images/pagination/control.png">
            <div class="sub card-section">The glorious pagination control we will create</div>
        </div>
    </div>
</div>

## Configuration
In your ```_config.yml```, add the pagination plugin and configure it, for instance with the code below:

<pre><code>plugins:
  # Other plugins go here
 - jekyll-paginate

paginate: 5
paginate_path: "/posts/page:num/"</code></pre>

- The entry under ```plugins``` simply loads the plugin. If you get any errors when building your page, makre sure your ```gemfile``` contains ```gem "github-pages", group: :jekyll_plugins``` and rerun ```bundle install```
- ```paginate``` sets the number of pages to display on one page
- ```paginate_path``` specifies where the page files will be located. The first page will always be ```index.html```, subsequent files will be in this case ```/posts/page1/```, ```/posts/page2/```, ```/posts/page3/```, and so on.

See the [official documentation](https://jekyllrb.com/docs/pagination/){:target="_blank"} for more details about these options.

## The includable paginator element
{% raw %}
Create the file ```_includes/paginator.html```. Files in this directory can be included via ```{% include paginator.html %}```, so you don't need to have the same code twice, if you want to place the controls above and below your posts. The code for this file is as follows:

<pre><code>
{% if paginator.total_pages > 1 %}
&lt;div class="pagination"&gt;
    &lt;nav aria-label="Pagination"&gt;
        &lt;ul class="pagination text-center"&gt;
        {% if paginator.previous_page %}
        &lt;li class="pagination-previous"&gt;&lt;a href="{{ paginator.previous_page_path }}"&gt;Previous&lt;/a&gt;&lt;/li&gt;
        {% else %}
        &lt;li class="pagination-previous disabled"&gt;Previous&lt;/li&gt;
        {% endif %}

        {% for counter in (1..paginator.total_pages) %}
            {% comment %}
                Special case: page1 will be the index page, so the link has to be generated manually
            {% endcomment %}

            {% if counter == 1%}
                {% if counter == paginator.page %}
                &lt;li class="current"&gt;{{ counter }}&lt;/li&gt;
                {% else %}
                &lt;li&gt;&lt;a href="/"&gt;{{ counter }}&lt;/a&gt;&lt;/li&gt;
                {% endif %}
            {% else %}
                {% if counter == paginator.page %}
                &lt;li class="current"&gt;{{ counter }}&lt;/li&gt;
                {% else %}
                &lt;li&gt;&lt;a href="/posts/page{{ counter }}"&gt;{{ counter }}&lt;/a&gt;&lt;/li&gt;
                {% endif %}
            {% endif %}

        {% endfor %}

        {% if paginator.next_page %}
        &lt;li class="pagination-next"&gt;&lt;a href="{{ paginator.next_page_path }}"&gt;Next&lt;/a&gt;&lt;/li&gt;
        {% else %}
        &lt;li class="pagination-next disabled"&gt;Next&lt;/li&gt;
        {% endif %}
        &lt;/ul&gt;
    &lt;/nav&gt;
&lt;/div&gt;
{% endif %}</code></pre>
{% endraw %}

This code will create the control only, if there are actually multiple pages. The appropriate CSS classes are applied for the current page, as well as all the other elements. The edge case for the first page, which is just ```index.html``` instead of ```/posts/page1```.

*Important:* Your ```paginate_path``` needs to match ```href="/posts/page{{ counter }}"``` on line 26.

## Adjusting the index.html file

Your ```index.html``` has most likely something like the following to display your posts:

{% raw %}
<pre><code>{% for post in site.posts %}
    # HTML code to display each post
{ % endfor %}</code></pre>
{% endraw %}

This needs to be adjusted slightly, and the ```paginator.html``` needs to be included:

{% raw %}
<pre><code>{% for post in paginator.posts %}
    # HTML code to display each post
{ % endfor %}

{% include paginator.html %}</code></pre>
{% endraw %}

## Conclusion
The code in this post is in the public domain (see below), so feel free to reuse it. This pagination control is easy to implement on GitHub pages. If you need more advanced features, there is [jekyll-paginate-v2](https://github.com/sverrirs/jekyll-paginate-v2){:target="_blank"} which is also backwards compatible. The plugin there unfortunately is not supported on GitHub pages, so you'll need to set up continuous integration, for instance with Travis in order to use it.

If you reuse the code, I'd appreciate a ping back in the comments, but this is not required.

#### License for code in this post
<pre>This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org></pre>