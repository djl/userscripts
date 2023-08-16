// ==UserScript==
// @name         GitHub: Copy path
// @namespace    github.com/djl/userscripts
// @version      2023.07.16.01
// @description  Copy "username/repo" to clipboard
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/github-copy-path.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/github-copy-path.user.js
// @grant        GM_setClipboard
// @match        https://github.com/*
// ==/UserScript==

(function () {
    "use strict";
    const src = document.querySelector(
        "nav[aria-label=Repository] ul li:last-child"
    );
    if (!src) {
        return;
    }
    let text = "Copy path";
    let li = src.cloneNode(true);
    let link = li.querySelector("a");
    link.removeAttribute("id");
    link.text = text;
    link.href = "#";
    link.addEventListener("click", function (event) {
        let path = document
            .querySelector("a#code-tab")
            .href.replace(/^https:\/\/github.com\//, "");
        GM_setClipboard(path);
        link.text = "Copied!";
        setTimeout(function () {
            link.text = text;
        }, 3000);
        event.preventDefault();
    });
    src.after(li);
})();

