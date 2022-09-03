// ==UserScript==
// @name         GitHub: Subscriptions issues link
// @namespace    github.com/djl/userscripts
// @version      2022.09.03.01
// @description  Add a link to the subscribed issues page in the nav bar.
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/github-subscriptions-link.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/github-subscriptions-link.user.js
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const src = document.querySelector("nav#global-nav a[href='/issues']");
    if (!src) {
        return;
    }
    let link = src.cloneNode(true);
    link.text = 'Subscriptions';
    link.href = '/notifications/subscriptions';
    src.after(link);
})();
