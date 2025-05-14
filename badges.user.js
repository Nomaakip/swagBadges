// ==UserScript==
// @name         swagBadges
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  slay
// @author       hacks.guide
// @match        https://pikidiary.lol/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=pikidiary.lol
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    async function appendBadges() {
        document.querySelectorAll('.post-header').forEach(async (post) => {
            const usernameSpan = post.querySelector('span[style="font-weight: bold;"]');

            const usernameText = usernameSpan.textContent.trim();

            try {
                const response = await fetch(`https://pikidiary-api.vercel.app/?username=${usernameText}`);
                const json = await response.json();

                json.badges.forEach((badge) => {
                    const img = document.createElement('img');

                    img.src = badge.iconUrl;
                    img.title = badge.name;
                    img.alt = badge.name;
                    img.style.height = '16px';
                    img.style.marginLeft = '2px';
                    img.style.verticalAlign = 'middle';

                    usernameSpan.appendChild(img);
                });
            } catch (err) {
                console.error('Fetch error:', err);
            }
        });
    }

    appendBadges();

    document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => setTimeout(appendBadges, 2000));
});

})();
