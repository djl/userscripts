// ==UserScript==
// @name         Musicbrainz: Copy release info as directory
// @description  Copy release info as directory. Useful when combined with EAC/XLD/whipper
// @version      2021.02.26.1
// @namespace    github.com/djl
// @author       djl
// @grant        GM_setClipboard
// @include      /^https?:\/\/(\w+\.)?musicbrainz\.org\/release\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}(\/disc\/\d+#[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})?/
// ==/UserScript==
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
    const fmt = `${json.releaseOf.creditedTo} - ${json.releaseOf.name} (${date}) [FLAC]${cats}`;
    const list = document.querySelector('div.tabs ul.tabs');
    const li = document.createElement('li');
    const lia = document.createElement('a');
    lia.href = '#';
    lia.text = 'Copy as Directory';
    li.appendChild(lia);
    list.appendChild(li);
    lia.addEventListener('click', function (event) {
        GM_setClipboard(fmt);
        event.preventDefault();
    });
})();
