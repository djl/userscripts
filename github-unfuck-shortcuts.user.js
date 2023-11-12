// ==UserScript==
// @name         Github: Unfuck shortcuts
// @namespace    github.com/djl/userscripts
// @description  Disable some shortcuts on github.com
// @version      2023.11.05.01
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/github-unfuck-shortcuts.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/github-unfuck-shortcuts.user.js
// @match        https://github.com/*
// @grant        none
// @run-at       document-body
// ==/UserScript==

(function () {
    "use strict";
    const mine = ["g"];

    document.addEventListener("keydown", function (event) {
        if (event.ctrlKey && mine.includes(event.key)) {
            event.cancelBubble = true;
            event.stopImmediatePropagation();
        }
    });
})();
