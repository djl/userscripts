// ==UserScript==
// @name         Musicbrainz: Copy release info as directory
// @description  Copy release info as directory. Useful when combined with EAC/XLD/whipper
// @version      2021.03.20.1
// @namespace    github.com/djl
// @author       djl
// @grant        GM_setClipboard
// @include      /^https?:\/\/(\w+\.)?musicbrainz\.org\/release\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/?
// ==/UserScript==

function clean(s) {
    return s.replace(/[<>:/\\*?"]/g, '_');
}

(function () {
    const js = document.querySelector("script[type='application/ld+json']");
    if (!js) {
        return;
    }
    const json = JSON.parse(js.innerText);
    let cats = '';
    if (json.catalogNumber) {
        if (Array.isArray(json.catalogNumber)) {
            cats = `${json.catalogNumber.join(', ')}`;
        } else if (json.catalogNumber != '[none]') {
            cats = `${json.catalogNumber}`;
        }
        cats = ` {${cats}}`;
    }
    const date = json.hasReleaseRegion[0].releaseDate.split('-')[0];
    const fmt = `${json.releaseOf.creditedTo} - ${json.name} (${date}) [FLAC]${cats}`;
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
