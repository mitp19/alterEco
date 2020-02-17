// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]stackoverflow.com[...]
// var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?stackoverflow\.com/;

// A function to use as callback
function doStuffWithDom(domContent) {
    console.log('I received the following DOM content:\n' + domContent);
}

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    console.log("TAB", tab);
    // ...check the URL of the active tab against our pattern and...
    if (tab.url.includes("amazon.ca")) {
        // ...if it matches, send a message specifying a callback too
        chrome.tabs.sendMessage(tab.id, {text: 'report_back'}, doStuffWithDom);
    }
});

// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//         console.log("MESSAGE RECIEVED: ", request)

//       if( request.message === "all_urls_fetched" ) {
//         console.log("MESSAGE RECIEVED: ", request)
//       }
//      }
// );


chrome.runtime.onConnect.addListener(port => {
    port.onMessage.addListener(msg => {
        console.log("MSG recieved: ", msg)
      // Handle message however you want
    }
  );
})  


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request, sender);
        console.log("RECIEVING MESSAGE in POPUP");
      if( request.message === "get_product" ) {
          console.log(request)
   // Handle the message
       }
     }
);