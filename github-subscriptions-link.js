// ==UserScript==
// @name         GitHub: Subscriptions issues link
// @namespace    djl
// @version      2022.08.31.1
// @description  Add a link to the subscribed issues page in the nav bar.
// @author       djl
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
