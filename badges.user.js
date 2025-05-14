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

    async function appendBadgesTo(post) {
        const usernameSpan = post.querySelector('span[style="font-weight: bold;"]');
        if (!usernameSpan) return;

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
    }

    function addBadgesToAll() {
        document.querySelectorAll('.post-header').forEach(appendBadgesTo);
    }

    addBadgesToAll();

    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) {
                    if (node.classList.contains('post-header')) {
                        appendBadgesTo(node);
                    } else {
                        const posts = node.querySelectorAll?.('.post-header');
                        posts?.forEach(appendBadgesTo);
                    }
                }
            });
        });
    });

    const target = document.querySelector(".tab-contents");
    if (target) {
        observer.observe(target, {
            childList: true,
            subtree: true
        });
    }
})();
