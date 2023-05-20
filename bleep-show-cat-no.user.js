// ==UserScript==
// @name         Bleep: Display cat no.
// @namespace    github.com/djl/userscripts
// @version      2022.09.03.01
// @description  Display cat no. next to label
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/bleep-show-cat-no.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/bleep-show-cat-no.user.js
// @match        *://bleep.com/release/*
// @grant        none
// ==/UserScript==

(function () {
    "use strict";
    const label = document.querySelector("div.product-info dd.label");
    const catno = document.querySelector(
        "div.product-info dd.catalogue-number"
    );
    console.log(label);
    console.log(catno);
    if (label == null || catno == null) {
        return;
    }
    label.append(` (${catno.textContent.trim()})`);
})();
