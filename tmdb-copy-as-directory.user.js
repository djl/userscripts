// ==UserScript==
// @name         TMDB: Copy release info as directory
// @description  Copy release info as directory
// @version      2022.09.03.01
// @namespace    github.com/djl/userscripts
// @author       djl
// @grant        GM_setClipboard
// @match        *://www.themoviedb.org/movie/*
// @match        *://www.themoviedb.org/tv/*
// ==/UserScript==

function clean(s) {
    s = s.replace(/[|<>:/\\*?"]/g, "_");
    s = s.replace(/&amp;/g, "&");
    return s;
}

(function () {
    let title = document.querySelector("div.title h2 a");
    if (!title) {
        return;
    }

    title = clean(title.innerHTML);

    const year = document.querySelector("div.title h2 span.release_date");
    if (!year) {
        return;
    }

    const where = document.querySelector("div.facts");
    if (!where) {
        return;
    }

    const span = document.createElement("span");
    const a = document.createElement("a");
    a.href = "#";
    a.text = "Copy as Directory";
    span.appendChild(a);
    where.appendChild(span);
    a.addEventListener("click", function (event) {
        GM_setClipboard(`${title} ${year.innerHTML}`);
        const txt = a.text;
        a.text = "Copied!";
        setTimeout(function () {
            a.text = txt;
        }, 3000);
        event.preventDefault();
    });
})();
