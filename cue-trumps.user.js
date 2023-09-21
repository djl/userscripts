// ==UserScript==
// @name         Cue Trumps
// @description  Make links red for torrents that have a 100% log and no cue sheet.
// @version      2023.09.28.01
// @namespace    github.com/djl/userscripts
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/cue-trumps.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/cue-trumps.user.js
// @match        *://orpheus.network/*
// @match        *://redacted.ch/*
// @run-at       document-idle
// ==/UserScript==

(function () {
    "use strict";
    if (!/(artists|torrents).php\?id/.test(window.location)) {
        return;
    }
    let torrents = document.querySelectorAll("div.torrent_info");
    if (torrents.length == 0) {
        torrents = document.querySelectorAll(
            "tr.torrent_row td:first-child > a"
        );
    }
    torrents.forEach(torrent => {
        const text = torrent.innerText;
        if (
            text.includes("Log (100%)") &&
            !text.includes("Cue") &&
            !text.includes("Trumpable")
        ) {
            torrent.style = "color: red;";
        }
    });
})();
