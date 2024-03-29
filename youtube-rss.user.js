// ==UserScript==
// @name        YouTube: RSS Feed
// @namespace   github.com/djl/userscripts
// @description Add an RSS feed link to channel pages
// @author      djl
// @version     2022.09.03.01
// @updateURL   https://raw.githubusercontent.com/djl/userscripts/master/youtube-rss.user.js
// @downloadURL https://raw.githubusercontent.com/djl/userscripts/master/youtube-rss.user.js
// @match       *://www.youtube.com/*
// @grant       none
// @run-at      document-end
// ==/UserScript==

(function () {
    "use strict";
    const base_url = "http://www.youtube.com/feeds/videos.xml?channel_id=";
    let channel;
    let url = document.querySelector('meta[itemprop="channelId"]');
    if (url) {
        channel = url.content;
    } else {
        let urls = document.querySelectorAll('meta[property="og:url"]');
        if (urls.length == 0) {
            return;
        }
        channel = urls[0].content.split(/channel\//);
    }
    window.setTimeout(function () {
        const sub = document.getElementById("subscribe-button");
        const rss = document.createElement("a");
        rss.id = "rss-button";
        rss.href = base_url + channel;
        rss.innerHTML = "RSS";
        rss.style.backgroundColor = "#fd9b12";
        rss.style.padding = "10px 16px";
        rss.style.color = "#ffffff";
        rss.style.fontSize = "14px";
        rss.style.fontWeight = "bold";
        rss.style.textDecoration = "none";
        rss.style.marginRight = "5px";
        sub.parentNode.insertBefore(rss, sub);
    }, 1000);
})();
