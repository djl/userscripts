// ==UserScript==
// @name         Musicbrainz a-tisket
// @description  Add a-tisket links to iTunes, Apple Music and Spotify URLs
// @version      2021.07.09.1
// @namespace    github.com/djl
// @author       djl
// @include      http*://*musicbrainz.org/*
// ==/UserScript==

const atiskets = ['https://atisket.pulsewidth.org.uk'];

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

            let sibling = link.nextElementSibling;
            while (sibling) {
                if (sibling.matches('br')) {
                    for (const i in atiskets) {
                        const url = atiskets[i];
                        const newlink = document.createElement('a');
                        newlink.href = `${url}/?${fragment}_id=${id}`;
                        newlink.text = 'a-tisket';
                        sibling.before(' [', newlink, ']');
                    }
                    break;
                }
                sibling = sibling.nextElementSibling;
            }
        }
    });
})();
