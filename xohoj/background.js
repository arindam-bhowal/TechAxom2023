chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("youtube.com/watch")) {
    const queryParameters = tab.url.split("?")[1];
    const urlParameters = new URLSearchParams(queryParameters);

    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      videoId: urlParameters.get("v"),
    });
  }
});

// Checking and Logging in

// Listen for requests from the popup script
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === "checkLogin") {
//     var token = localStorage.getItem("jwt_token");

//     fetch("http://localhost:8000/api/user/check_login", {
//       headers: {
//         "authorization": "Bearer " + token
//       }
//     })
//     .then(function(response) {
//       if (response.status === 200) {
//         sendResponse({loggedIn: true});
//       } else {
//         sendResponse({loggedIn: false});
//       }
//     });

//     return true;
//   }
// });
