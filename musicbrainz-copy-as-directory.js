// ==UserScript==
// @name         Musicbrainz: Copy release info as directory
// @description  Copy release info as directory. Useful when combined with EAC/XLD/whipper
// @version      2021.04.18.1
// @namespace    github.com/djl
// @author       djl
// @grant        GM_setClipboard
// @include       *://musicbrainz.org/release/*
// ==/UserScript==

// Unwanted catalog numbers
const unwantedCats = ['[none]'];

function clean(s) {
    return s.replace(/[<>:/\\*?"]/g, '_');
}

function credits(json) {
    if (json.creditedTo) {
        return json.creditedTo;
    } else {
        return json.releaseOf.creditedTo;
    }
}

function cat(json) {
    if (!json.catalogNumber) {
        return '';
    }
    let r = json.catalogNumber;
    if (Array.isArray(json.catalogNumber)) {
        r = json.catalogNumber.filter(function (elem) {
            return elem && !unwantedCats.includes(elem);
        })[0];
    } else if (unwantedCats.includes(r)) {
        return '';
    }
    return ` {${r}}`;
}

(function () {
    const js = document.querySelector("script[type='application/ld+json']");
    if (!js) {
        return;
    }
    const json = JSON.parse(js.innerText);
    const cats = `${cat(json)}`;
    const date = json.hasReleaseRegion[0].releaseDate.split('-')[0];
    const fmt = `${credits(json)} - ${json.name} (${date}) [FLAC]${cats}`;
    const list = document.querySelector('div.tabs ul.tabs');
    const li = document.createElement('li');
    const lia = document.createElement('a');
    lia.href = '#';
    lia.text = 'Copy as Directory';
    li.appendChild(lia);
    list.appendChild(li);
    lia.addEventListener('click', function (event) {
        GM_setClipboard(clean(fmt));
        li.classList.add('sel');
        const txt = lia.text;
        lia.text = 'Copied!';
        setTimeout(function () {
            li.classList.remove('sel');
            lia.text = txt;
        }, 3000);
        event.preventDefault();
    });
})();
