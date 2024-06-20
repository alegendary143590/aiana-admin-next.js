// public/aiana.js

(function() {
    // Users can specify userId and botId in the script tag's data attributes
    var scriptTag = document.currentScript || document.querySelector('script[src*="aiana.js"]');
    var userId = scriptTag.getAttribute('data-user-id');
    var botId = scriptTag.getAttribute('data-bot-id');
    var src = "http://localhost:3000/embedding?userId="+encodeURIComponent(userId)+"&botId="+encodeURIComponent(botId);
  
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.width = "410";
    iframe.height = "610";
    iframe.frameBorder = "0";
    iframe.style = "position: fixed; bottom: 10px; right: 10px;"; // Example positioning
  
    document.body.appendChild(iframe);
  })();