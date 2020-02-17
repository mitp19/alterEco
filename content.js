// Listen for messages
var port = chrome.runtime.connect({name: "content"});

// });
console.log("CONTENT");

function sendMessageToPopUp() {
    let productTitle = document.getElementById("productTitle").innerText;
    if (productTitle != undefined) {
        productTitle.trim()
        console.log(productTitle);
        chrome.runtime.sendMessage({productTitle: productTitle}, function(response) {
            console.log("SENDING MESSAGE");
            console.log(response.farewell);
        });
    }
}

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request, sender);
        console.log("RECIEVING MESSAGE???");
      if( request.message === "get_product" ) {
          sendMessageToPopUp();
          console.log(request)
       }
     }
);