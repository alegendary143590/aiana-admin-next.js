// public/aiana.js
(function() {
    // Users can specify userId and botId in the script tag's data attributes
    var scriptTag = document.currentScript || document.querySelector('script[src*="aiana.js"]');
    var userId = scriptTag.getAttribute('data-user-id');
    var botId = scriptTag.getAttribute('data-bot-id');
  
    var src = "http://localhost:3000/chatbot?userId=" + encodeURIComponent(userId) + "&botId=" + encodeURIComponent(botId);
  
    var iframe = document.createElement('iframe');
    iframe.src = src;
    iframe.width = "400";
    iframe.height = "600";
    iframe.frameBorder = "0";
    iframe.style = "position: fixed; bottom: 20px; right: 20px;"; // Example positioning
  
    document.body.appendChild(iframe);
  })();

//   <script src="https://your-nextjs-app.com/embedChatbot.js"
//         data-user-id="user123"
//         data-bot-id="bot456"></script>
  