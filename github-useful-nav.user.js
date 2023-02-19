// ==UserScript==
// @name         GitHub: More useful nav
// @namespace    github.com/djl/userscripts
// @version      2023.02.19.01
// @description  Make GitHub's nav bar more useful.
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/github-useful-nav.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/github-useful-nav.user.js
// @match        https://github.com/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    const src = document.querySelector("nav#global-nav a[href='/issues']");
    if (!src) {
        return;
    }
    let link = src.cloneNode(true);
    link.text = "Subscriptions";
    link.href = "/notifications/subscriptions";
    src.after(link);

    const removeme = [
        "nav#global-nav a[href='/codespaces']",
        "nav#global-nav a[href='/marketplace']",
        "nav#global-nav a[href='/explore']",
    ];
    for (const i in removeme) {
        let elem = document.querySelector(removeme[i]);
        if (elem != null) {
            elem.remove();
        }
    }
})();
