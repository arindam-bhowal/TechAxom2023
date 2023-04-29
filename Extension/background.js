chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "post_data") {
    const postData = request.data;

    fetch("http://127.0.0.1:8000/api/notes/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  } 
  else if (request.type === "post_certificate") {
    fetch("http://127.0.0.1:8000/api/notes/cert/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request.data),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }
  else if (request.action === "getTabUrl") {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      var url = tabs[0].url;
      sendResponse({ url: url });
    });
    return true;
  } else {
    console.log();
  }
});

chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);
    // const videoURL = new URLSearchParams(tab.url)

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
      URL: tab.url,
    });
  }
});


chrome.webNavigation.onHistoryStateUpdated.addListener(function(data) {
	chrome.tabs.get(data.tabId, function(tab) {
		chrome.tabs.executeScript(data.tabId, {code: 'if (typeof AddScreenshotButton !== "undefined") { AddScreenshotButton(); }', runAt: 'document_start'});
	});
}, {url: [{hostSuffix: '.youtube.com'}]});




// var id = 100;




// chrome.browserAction.onClicked.addListener(function() {

//     chrome.tabs.captureVisibleTab(function(screenshotUrl) {
//         var viewTabUrl = chrome.extension.getURL('screenshot.html?id=' + id++)
//         var targetId = null;

//         console.log(screenshotUrl);

//         chrome.tabs.onUpdated.addListener(function listener(tabId, changedProps) {
        
//             if (tabId != targetId || changedProps.status != "complete")
//                 return;
//             chrome.tabs.onUpdated.removeListener(listener);
//             var views = chrome.extension.getViews();
//             for (var i = 0; i < views.length; i++) {
//                 var view = views[i];
//                 if (view.location.href == viewTabUrl) {
//                     view.setScreenshotUrl(screenshotUrl);
//                     break;
//                 }
//             }
//         });

//         chrome.tabs.create({
//             url: viewTabUrl
//         }, function(tab) {
//             targetId = tab.id;
//         });
//     });

// });



