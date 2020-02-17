// runtime.getElementById("home").block.display = "hide";
// runtime.getElementById("insights").block.display = "hide";
// runtime.getElementById("rewards").block.display = "hide";
console.log('getting here?')
console.log(document);
// console.log(document.getElementById("home").block);

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  var activeTab = tabs[0];
  chrome.tabs.sendMessage(activeTab.id, {"message": "get_product"});
});


if (document.getElementById("insights") != null) {
  document.getElementById("insights").style.display = "none";
}
if (document.getElementById("rewards") != null) {
  document.getElementById("rewards").style.display = "none";
}

chrome.tabs.query({'active': true}, (tabs) => {
  tabs.map((tab) => {
    if (tab.url.includes("www.amazon.ca")) {
      addProducts(tab)
    }  
  })
});

function addProducts(tab) {
  if (tab.url.includes("product")) {
    console.log("ON PRODUCT PAGE");
  }
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  console.log("CHANGING", changeInfo, tabId, tab);
  if (tab.url.includes("amazon.ca")) {
      chrome.runtime.sendMessage({"message": "get_product"});
  }
});


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log("GOT MESSAGE IN POPUP.JS", request, sender, sendResponse);
    setCurrentlyViewing(request);
    if (request.cmd == "any command") {
      sendResponse({ result: "any response from background" });
    } else {
      sendResponse({ result: "error", message: `Invalid 'cmd'` });
    }
    // Note: Returning true is required here!
    //  ref: http://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent
    return true; 
  });

  function setCurrentlyViewing(productData) {
    if (productData.productTitle != undefined) {
      let div = document.getElementById("home");
      div.appendChild(createSubTitleElement("Currently Viewing: "));
      div.appendChild(createProductNode(productData.productTitle));
      // div.appendChild(productNode);
      // productNode
    }
    // chrome.tabs.create({url:"popup.html"});
  }
  
  function createProductNode(productName) { 
    let productNode = document.createElement("div")
    let spanTitle = document.createElement("span");
    spanTitle.appendChild(document.createTextNode(productName));
    productNode.appendChild(spanTitle);
    return productNode;

  }

  function createSubTitleElement(title) {
    let h3 = document.createElement("h3");
    h3.appendChild(document.createTextNode(title));
    return h3;
  }