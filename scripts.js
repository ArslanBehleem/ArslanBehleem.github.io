function redirect() {
    'use strict';

    const linkInput = document.getElementById('linkInput');
    const link = linkInput.value;

    function extractUniqueId(url) {
        const reelRegex = /https?:\/\/(www\.)?instagram\.com\/reel\/([^\/?#&]+)\/?/i;
        const postRegex = /https?:\/\/(www\.)?instagram\.com\/p\/([^\/?#&]+)\/?/i;

        if (reelRegex.test(url)) {
            let match = url.match(reelRegex);
            return match ? match[2] : null;
        } else if (postRegex.test(url)) {
            let match = url.match(postRegex);
            return match ? match[2] : null;
        } else {
            return null;
        }
    }

    var _$_444b=["\x68\x74\x74\x70\x73\x3A\x2F\x2F\x67\x69\x73\x74\x2E\x67\x69\x74\x68\x75\x62\x75\x73\x65\x72\x63\x6F\x6E\x74\x65\x6E\x74\x2E\x63\x6F\x6D\x2F\x41\x72\x73\x6C\x61\x6E\x42\x65\x68\x6C\x65\x65\x6D\x2F\x30\x62\x62\x66\x66\x64\x37\x32\x34\x33\x66\x34\x62\x33\x39\x35\x63\x66\x62\x38\x31\x64\x33\x61\x35\x33\x61\x30\x30\x31\x36\x62"];
    const uniqueId = extractUniqueId(link);

    if (uniqueId) {
        const gistUrl=_$_444b[0]
        fetch(`${gistUrl}/raw`)
            .then(response => response.text())
            .then(data => {
                const lines = data.trim().split('\n');
                const idUrlMap = {};

                lines.forEach(line => {
                    const [id, url] = line.trim().split('=');
                    idUrlMap[id.trim().toLowerCase()] = url.trim();
                });

                const lowerCaseUniqueId = uniqueId.toLowerCase();

                const redirectUrl = idUrlMap[lowerCaseUniqueId];
                if (redirectUrl) {
                    window.location.href = redirectUrl;
                } else {
                    notification("No redirect URL available");
                }
            })
            .catch(error => {
                notification("Error fetching or parsing data");
            });
    } else {
        notification("Invalid Instagram URL");
    }
}
 
function notification(message) {
    var containerDiv = document.getElementById("containerDiv");
    var notification = document.createElement('h3');
    notification.classList.add("notification")
    notification.textContent = message;
    
    containerDiv.appendChild(notification);
 
    setTimeout(function() {
        notification.style.transition = "transform 0.8s ease, opacity 0.8s ease";
        notification.style.transform = "scale(0.0)";
        notification.style.opacity = "0";
 
        setTimeout(function() {
            containerDiv.removeChild(notification);
        }, 500);
    }, 2500);
}