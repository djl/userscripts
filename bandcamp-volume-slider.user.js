// ==UserScript==
// @name         Bandcamp: Volume Slider
// @description  Adds a volume slider to Bandcamp pages
// @namespace    github.com/djl/userscripts
// @version      2023.06.17.01
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/bandcamp-volume-slider.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/bandcamp-volume-slider.user.js
// @match        *://*/album/*
// @match        *://*/track/*
// @run-at       document-idle
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';
    GM_addStyle(`
input[type=range]#VolumeSlider {
  margin-top: 20px;
  margin-left: 12px;
  width: 115%;
}

.VolumeSliderLabel {
  background-color: white;
  color: black;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
  width: 55px;
}
`);
    let audioTag = document.getElementsByTagName('audio')[0];
    let properties = {
        type: 'range',
        min: 0,
        max: 1,
        step: 0.01,
        value: parseFloat(GM_getValue('volume', '0.5')),
        id: 'VolumeSlider',
    };

    let volumeControl = document.createElement('input');

    for (let prop in properties) {
        volumeControl[prop] = properties[prop];
    }

    let elem = document.getElementById('VolumeSlider');
    if (elem) {
        elem.parentNode.replaceChild(volumeControl, document.getElementById('VolumeSlider'));
        elem.volume = volumeControl.value;
    } else {
        let genRow = document.createElement('tr');
        let volHold = document.createElement('td');
        let label = document.createElement('td');

        label.innerText = 'Volume: ';
        label.className = 'VolumeSliderLabel';

        volHold.appendChild(volumeControl);
        genRow.appendChild(label);
        genRow.appendChild(volHold);
        document.getElementById('trackInfoInner').children[0].children[0].children[0].appendChild(genRow);
        audioTag.volume = properties.value;
    }
    volumeControl.addEventListener('input', function () {
        audioTag.volume = volumeControl.value;
        GM_setValue('volume', volumeControl.value);
    });
    volumeControl.addEventListener('change', function () {
        audioTag.volume = volumeControl.value;
        GM_setValue('volume', volumeControl.value);
    });
})();
