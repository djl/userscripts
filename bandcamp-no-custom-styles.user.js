// ==UserScript==
// @name         Bandcamp: No custom styles
// @description  Gets rid of an artist's custom styles
// @namespace    github.com/djl/userscripts
// @version      2022.09.03.01
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/bandcamp-no-custom-styles.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/bandcamp-no-custom-styles.user.js
// @include      /^https?://[^/]+/(?:album|track)/[^/]+$/
// @include      /^https?://(.*)\.bandcamp\.com/
// @run-at       document-body
// ==/UserScript==
(function () {
    'use strict';
    document.querySelector('style#custom-design-rules-style').remove();
    document.querySelector('body').classList.remove('invertIconography');
})();
