// ==UserScript==
// @name         Orpheus: Collage Mover
// @description  Move collages below torrents
// @author       djl
// @version      2023.06.25.1
// @updateURL    https://raw.githubusercontent.com/djl/userscripts/master/ops-collage-mover.user.js
// @downloadURL  https://raw.githubusercontent.com/djl/userscripts/master/ops-collage-mover.user.js
// @grant        none
// @match        https://orpheus.network/torrents.php?id=*
// @match        https://orpheus.network/artist.php?id=*
// ==/UserScript==
(function () {
    "use strict";
    const torrents = document.querySelector("#torrent_details, #discog_table");
    if (torrents) {
        Array.from(document.querySelectorAll(".collage_table"))
            .reverse()
            .forEach(function (collages) {
                collages.remove();
                torrents.parentNode.insertBefore(
                    collages,
                    torrents.nextSibling
                );
            });
    }
})();
