// ==UserScript==
// @name         Bandcamp: No custom styles
// @description  Gets rid of an artist's custom styles
// @namespace    github.com/djl
// @version      2021-09-24.1
// @author       djl
// @include      /^https?://[^/]+/(?:album|track)/[^/]+$/
// @include      /^https?://(.*)\.bandcamp\.com/
// @run-at       document-body
// ==/UserScript==
(function () {
    'use strict';
    document.querySelector('style#custom-design-rules-style').remove();
    document.querySelector('body').classList.remove('invertIconography');
})();
