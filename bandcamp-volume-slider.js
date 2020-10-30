// ==UserScript==
// @name         Bandcamp Volume Slider
// @description  Adds a volume slider to Bandcamp pages
// @namespace    github.com/djl
// @version      0.2
// @author       djl
// @include      /^https?://[^/]+/(?:album|track)/[^/]+$/
// @grant        GM_addStyle
// @grant        GM_setValue
// @grant        GM_getValue
// ==/UserScript==

(function () {
    'use strict';
    GM_addStyle(`
input[type=range] {
  -webkit-appearance: none;
  width: 115%;
  background: transparent;
  margin-top:20px;
}

input[type=range]::-moz-range-thumb {
  box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  height: 22px;
  width: 12px;
  border-radius: 3px;
  background: #ffffff;
  cursor: pointer;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]::-moz-range-track {
  width: 100%;
  height: 8px;
  cursor: pointer;
  background: rgba(246,246,246,.1);
  border-radius: 1.3px;
  border: 0.2px solid rgba(190,190,190,.5);
}

.VolumeSliderLabel {
  text-align:center;
  line-height: 60px;
  background-color:white;
  color:black;
  font-weight:bold;
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
