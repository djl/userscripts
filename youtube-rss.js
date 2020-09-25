// ==UserScript==
// @name        YouTube RSS Feed
// @namespace   https://github.com/djl/userscripts
// @author      djl
// @version     2020.09.20.1
// @description Add an RSS feed link to channel pages
// @match       *://www.youtube.com/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

const base_url = 'http://www.youtube.com/feeds/videos.xml?channel_id=';

(function () {
    'use strict';
    const urls = document.querySelectorAll('meta[property="og:url"]');
    if (urls.length == 0) {
        return;
    }
    const url = urls[0].content;
    const channel = url.split(/channel\//)[1];
    const sub = document.getElementById('subscribe-button');
    const rss = document.createElement('a');
    rss.id = 'rss-button';
    rss.href = base_url + channel;
    rss.innerHTML = 'RSS';
    rss.style.backgroundColor = '#fd9b12';
    rss.style.padding = '10px 16px';
    rss.style.color = '#ffffff';
    rss.style.fontSize = '14px';
    rss.style.textDecoration = 'none';
    rss.style.marginRight = '5px';
    sub.before(rss);
})();
