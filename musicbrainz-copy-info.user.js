// ==UserScript==
// @name         Musicbrainz: Copy release info.
// @description  Copy release info from MusicBrainz
// @version      2023.02.25.01
// @namespace    github.com/djl/userscripts
// @author       djl
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/musicbrainz-copy-info.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/musicbrainz-copy-info.user.js
// @grant        GM_setClipboard
// @match        *://musicbrainz.org/release/*
// @match        *://musicbrainz.org/release-group/*
// ==/UserScript==

// Unwanted catalog numbers
// MB really needs a "this release has no cat no." option
const unwantedCats = ["[none]"];

function clean(s) {
    return s.replace(/[|<>:/\\*?"]/g, "_");
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
        return "";
    }
    let r = json.catalogNumber;
    if (Array.isArray(json.catalogNumber)) {
        r = json.catalogNumber.filter(function (elem) {
            return elem && !unwantedCats.includes(elem);
        })[0];
    } else if (unwantedCats.includes(r)) {
        return "";
    }
    return ` {${r}}`;
}

function addButton(text, func) {
    const list = document.getElementById("copying");
    const li = document.createElement("li");
    const lia = document.createElement("a");
    lia.href = "#";
    lia.text = text;
    li.appendChild(lia);
    list.appendChild(li);
    lia.addEventListener("click", function (event) {
        func(event);
        lia.text = "Copied!";
        setTimeout(function () {
            li.classList.remove("sel");
            lia.text = text;
        }, 3000);
        event.preventDefault();
    });
}

(function () {
    if (window.location.href.includes("/discids")) {
        return;
    }
    const header = document.createElement("h2");
    header.innerText = "Copy Information";

    const ul = document.createElement("ul");
    ul.classList.add("links");
    ul.id = "copying";

    const target = document.querySelector("h2.editing");
    target.parentNode.insertBefore(header, target);
    target.parentNode.insertBefore(ul, target);

    if (window.location.href.includes("/release/")) {
        addButton("Copy as Directory", function () {
            const json = JSON.parse(
                document.querySelector("script[type='application/ld+json']")
                    .textContent
            );
            const cats = `${cat(json)}`;
            const date = json.hasReleaseRegion[0].releaseDate.split("-")[0];
            const fmt = `${credits(json)} - ${
                json.name
            } (${date}) [FLAC]${cats}`;
            GM_setClipboard(clean(fmt));
        });

        addButton("Copy Release ID", function () {
            GM_setClipboard(window.location.href.split("/").pop());
        });

        addButton("Copy Group ID", function () {
            let a = document.querySelector("p.subheader span.small a");
            GM_setClipboard(a.href.split("/").pop());
        });
    }

    if (window.location.href.includes("/release-group/")) {
        addButton("Copy Group ID", function () {
            GM_setClipboard(window.location.href.split("/").pop());
        });
    }
})();
