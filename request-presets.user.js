// ==UserScript==
// @name         Request presets
// @description  Request presets
// @namespace    github.com/djl/userscripts
// @version      2022.09.03.01
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/request-presets.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/request-presets.user.js
// @author       djl
// @match        *://orpheus.network/*
// @match        *://redacted.ch/*
// @run-at       document-idle
// ==/UserScript==

const logElement = "minlogscore";
const boxes = {
    cd: {
        "orpheus.network": [
            "format_1",
            "bitrate_0",
            "media_0",
            "needlog",
            "needcksum",
            "needcue",
        ],
        "redacted.ch": [
            "format_1",
            "bitrate_8",
            "media_0",
            "needlog",
            "needcue",
            "needchecksum",
        ],
    },
    web: {
        "orpheus.network": ["format_1", "bitrate_0", "media_1"],
        "redacted.ch": ["format_1", "bitrate_8", "media_7"],
    },
    web24: {
        "orpheus.network": ["format_1", "bitrate_0", "bitrate_1", "media_1"],
        "redacted.ch": ["format_1", "bitrate_8", "bitrate_9", "media_7"],
    },
    cdweb: {
        "orpheus.network": [
            "format_1",
            "bitrate_0",
            "media_0",
            "media_1",
            "needlog",
            "needcksum",
            "needcue",
        ],
        "redacted.ch": [
            "format_1",
            "bitrate_8",
            "media_0",
            "media_7",
            "needlog",
            "needcue",
            "needchecksum",
        ],
    },
    cdweb24bit: {
        "orpheus.network": [
            "format_1",
            "bitrate_0",
            "bitrate_1",
            "media_0",
            "media_1",
            "needlog",
            "needcksum",
            "needcue",
        ],
        "redacted.ch": [
            "format_1",
            "bitrate_8",
            "bitrate_9",
            "media_0",
            "media_7",
            "needlog",
            "needcue",
            "needchecksum",
        ],
    },
};

function clear() {
    const elements = ["formats_tr", "bitrates_tr", "media_tr", "logcue_tr"];
    elements.forEach(function (elem) {
        document
            .querySelectorAll(`tr#${elem} input[type=checkbox]`)
            .forEach(function (box) {
                box.checked = false;
            });
    });
    document.querySelector(`input#${logElement}`).value = "";
}

function createButton(text, key) {
    const button = document.createElement("input");
    button.type = "button";
    button.value = text;
    button.style = "margin-right: 10px";
    button.onclick = function () {
        clear();
        if (!key) {
            return;
        }
        boxes[key][window.location.hostname].forEach(function (box) {
            document
                .querySelectorAll(`input#${box}[type=checkbox]`)
                .forEach(function (box) {
                    box.click();
                });
        });
        document.querySelector(`input#${logElement}`).value = 100;
    };
    return button;
}

(function () {
    "use strict";

    const tr = document.querySelector("tr#releasetypes_tr");
    if (!tr) {
        return;
    }
    const mftr = document.createElement("tr");
    const mftdl = document.createElement("td");
    mftdl.className = "label";
    mftdl.innerText = "Presets";
    mftr.appendChild(mftdl);

    const mftdr = document.createElement("td");

    mftdr.appendChild(createButton("CD", "cd"));
    mftdr.appendChild(createButton("WEB", "web"));
    mftdr.appendChild(createButton("WEB24", "web24"));
    mftdr.appendChild(createButton("CD+WEB", "cdweb"));
    mftdr.appendChild(createButton("CD+WEB24", "cdweb24bit"));
    mftdr.appendChild(createButton("clear", null));

    mftr.appendChild(mftdr);
    tr.after(mftr);
})();
