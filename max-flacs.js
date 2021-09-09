// ==UserScript==
// @name         Max FLACs
// @description  Maxed out (CD) FLAC requests
// @namespace    github.com/djl
// @version      2021-09-09-01
// @author       djl
// @include      /^https?://[^/]+/requests.php/
// @run-at       document-idle
// ==/UserScript==

(function () {
    'use strict';

    const boxes = ['format_1', 'bitrate_8', 'media_0', 'needlog', 'needcue', 'needchecksum'];
    const log = 'minlogscore';

    const tr = document.querySelector('tr#releasetypes_tr');
    if (!tr) {
        return;
    }
    const mftr = document.createElement('tr');
    mftr.id = 'maxflacs';

    const mftdl = document.createElement('td');
    mftdl.className = 'label';
    mftdl.innerText = 'Max FLACs';
    mftr.appendChild(mftdl);

    const mftdr = document.createElement('td');
    const button = document.createElement('input');
    button.type = 'button';
    button.id = 'button';
    button.value = 'Max FLACs';
    button.onclick = function () {
        for (let box in boxes) {
            document.querySelector(`input#${boxes[box]}`).click();
        }
        document.querySelector(`input#${log}`).value = 100;
    };
    mftdr.appendChild(button);
    mftr.appendChild(mftdr);

    tr.after(mftr);
})();
