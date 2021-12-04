// ==UserScript==
// @name         Bleep: Display cat no.
// @namespace    github.com/djl/userscripts
// @version      2021-12-01.1
// @description  Display cat no. next to label
// @author       djl
// @include      /^https://bleep\.com/release/(.*)/
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    const label = document.querySelector('div.product-info dd.label');
    const catno = document.querySelector('div.product-info dd.catalogue-number');
    console.log(label);
    console.log(catno);
    if (label == null || catno == null) {
        return;
    }
    label.append(` (${catno.textContent.trim()})`);
})();
