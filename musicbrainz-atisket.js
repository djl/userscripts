// ==UserScript==
// @name         Musicbrainz a-tisket
// @description  Add a-tisket links to iTunes, Apple Music and Spotify URLs
// @version      2020.07.08.1
// @namespace    github.com/djl
// @author       djl
// @include      http*://*musicbrainz.org/*
// ==/UserScript==

(function () {
    const re = new RegExp('musicbrainz.org/release/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})', 'i');
    if (!window.location.href.match(re)) {
        return;
    }

    document.querySelectorAll('div#bottom-credits a').forEach(function (link) {
        if (link.href.match(/deezer.com|(music|itunes).apple.com|spotify.com/)) {
            let id;
            let fragment;

            if (link.href.match(/deezer.com/)) {
                id = new URL(link.href).pathname.split('/').slice(-1)[0];
                fragment = 'deez';
            } else if (link.href.match(/apple.com/)) {
                id = new URL(link.href).pathname.split('/', 5).slice(-1)[0].replace('id', '');
                fragment = 'itu';
            } else if (link.href.match(/spotify.com/)) {
                id = new URL(link.href).pathname.split('/', 5).slice(-1)[0];
                fragment = 'spf';
            }

            const next = link.nextElementSibling.nextElementSibling;
            const newlink = document.createElement('a');
            newlink.href = `https://etc.marlonob.info/atisket/?${fragment}_id=${id}`;
            newlink.text = 'a-tisket';

            next.before(document.createTextNode(' ['));
            next.before(newlink);
            next.before(document.createTextNode(']'));
        }
    });
})();
