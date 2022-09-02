// ==UserScript==
// @name         Cue Trumps
// @description  Show "Trumpable" Tag for torrents that have a 100% log and no cue sheet.
// @version      2022-09-02-01
// @namespace    github.com/djl
// @author       djl
// @match        *://orpheus.network/*
// @match        *://redacted.ch/*
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';
    if (!/(artists|torrents).php\?id/.test(window.location)) {
        return;
    }
    let torrents = document.querySelectorAll('div.torrent_info');
    if (torrents.length == 0) {
        torrents = document.querySelectorAll('tr.torrent_row td:first-child > a');
    }
    torrents.forEach(torrent => {
        const text = torrent.innerText;
        if (text.includes('Log (100%)') && !text.includes('Cue') && !text.includes('Trumpable')) {
            torrent.querySelector('strong').innerText += ' [TRUMPABLE!]';
        }
    });
})();
