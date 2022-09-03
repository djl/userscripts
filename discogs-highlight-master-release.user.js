// ==UserScript==
// @name         Discogs: Highlight master release
// @namespace    github.com/djl/userscripts
// @version      2022.09.03.01
// @description  Highlight master release in Discogs search results
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/discogs-highlight-master-release.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/discogs-highlight-master-release.user.js
// @match        https://*.discogs.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';
    document.querySelectorAll('li.card[data-object-type="master release"]').forEach(function (elem) {
        const div = document.createElement('div');
        div.style.cssText = 'position: absolute; width 100%; top: 124px; left: 0;';
        const span = document.createElement('span');
        span.innerHTML = 'master release';
        span.style.cssText = `position: absolute; width: 144px; padding: 0.3em; text-align:center; font-size: 0.8em; background-color: #e8e7e9; background-image: url("data:image/svg+xml,%3Csvg width='12' height='24' viewBox='0 0 12 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d0cfd1' fill-opacity='0.4'%3E%3Cpath d='M2 0h2v12H2V0zm1 20c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM9 8c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm-1 4h2v12H8V12z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");`;
        div.appendChild(span);
        elem.appendChild(div);
    });
})();
