// ==UserScript==
// @name         Cue Trumps
// @description  Show "Trumpable" Tag for torrents that have a 100% log and no cue sheet.
// @version      2021-09-09-01
// @namespace    github.com/djl/userscripts
// @author       djl
// @include      https://orpheus.network/artist.php?id=*
// @include      https://orpheus.network/torrents.php?id=*
// @include      https://redacted.ch/artist.php?id=*
// @include      https://redacted.ch/torrents.php?id=*
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';
    let torrents = document.querySelectorAll('div.torrent_info');
    if (torrents.length == 0) {
        torrents = document.querySelectorAll('tr.torrent_row td:first-child > a');
    }
    torrents.forEach(torrent => {
        const text = torrent.innerText;
        if (text.includes('Log (100%)') && !text.includes('Cue')) {
            torrent.querySelector('strong').innerText += ' (Trumpable)';
        }
    });
})();
