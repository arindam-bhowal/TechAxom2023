import { getActiveTabURL } from "./utils.js";

const addNewBookmark = (bookmarks, bookmark) => {
  const bookmarkTitleElement = document.createElement("div");
  const controlsElement = document.createElement("div");
  const newBookmarkElement = document.createElement("div");

  bookmarkTitleElement.textContent = bookmark.desc;
  bookmarkTitleElement.className = "bookmark-title";
  controlsElement.className = "bookmark-controls";

  setBookmarkAttributes("play", onPlay, controlsElement);
  setBookmarkAttributes("delete", onDelete, controlsElement);

  newBookmarkElement.id = "bookmark-" + bookmark.time;
  newBookmarkElement.className = "bookmark";
  newBookmarkElement.setAttribute("timestamp", bookmark.time);

  newBookmarkElement.appendChild(bookmarkTitleElement);
  newBookmarkElement.appendChild(controlsElement);
  bookmarks.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentBookmarks = []) => {
  const bookmarksElement = document.getElementById("bookmarks");
  bookmarksElement.innerHTML = "";

  if (currentBookmarks.length > 0) {
    for (let i = 0; i < currentBookmarks.length; i++) {
      const bookmark = currentBookmarks[i];
      addNewBookmark(bookmarksElement, bookmark);
    }
  } else {
    bookmarksElement.innerHTML = '<i class="row">No bookmarks to show</i>';
  }

  return;
};

const onPlay = async (e) => {
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const activeTab = await getActiveTabURL();

  chrome.tabs.sendMessage(activeTab.id, {
    type: "PLAY",
    value: bookmarkTime,
  });
};

const onDelete = async (e) => {
  const activeTab = await getActiveTabURL();
  const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");
  const bookmarkElementToDelete = document.getElementById(
    "bookmark-" + bookmarkTime
  );

  bookmarkElementToDelete.parentNode.removeChild(bookmarkElementToDelete);

  chrome.tabs.sendMessage(
    activeTab.id,
    {
      type: "DELETE",
      value: bookmarkTime,
    },
    viewBookmarks
  );
};

const setBookmarkAttributes = (src, eventListener, controlParentElement) => {
  const controlElement = document.createElement("img");

  controlElement.src = "assets/" + src + ".png";
  controlElement.title = src;
  controlElement.addEventListener("click", eventListener);
  controlParentElement.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async () => {
  const activeTab = await getActiveTabURL();
  const queryParameters = activeTab.url.split("?")[1];
  const urlParameters = new URLSearchParams(queryParameters);

  const currentVideo = urlParameters.get("v");

  if (activeTab.url.includes("youtube.com/watch") && currentVideo) {
    chrome.storage.sync.get([currentVideo], (data) => {
      const currentVideoBookmarks = data[currentVideo]
        ? JSON.parse(data[currentVideo])
        : [];

      viewBookmarks(currentVideoBookmarks);
    });
  } else {
    const container = document.getElementsByClassName("container")[0];

    container.innerHTML =
      '<div class="title">This is not a youtube video page.</div>';
  }
});

// ----------Print Feature----------

document.getElementById("printButton").addEventListener("click", printDiv);

function printDiv(divName = "printable") {
  var content = document.getElementById("printable").innerHTML;
  var printWindow = window.open("", "", "height=600,width=800");
  printWindow.document.write("<html><head><title>Print</title></head><body>");
  printWindow.document.write(content);
  printWindow.document.write("</body></html>");
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

// ***********************************

// ----------------------Login In features --------------------
function toggleContainers() {
  if (isLoggedIn) {
    document.getElementById("loggedOut").classList.add("hidden");
    document.getElementById("loggedIn").classList.remove("hidden");
  } else {
    document.getElementById("loggedIn").classList.add("hidden");
    document.getElementById("loggedOut").classList.remove("hidden");
  }
}

let isLoggedIn = false;

toggleContainers();

// -----status ----
function checkLoginStatus() {
  chrome.storage.local.get("token", function (data) {
    var token = data.token;

    if (token) {
      fetch("http://localhost:8000/api/user/check_login", {
        headers: {
          authorization: "Bearer " + token,
        },
      }).then(function (response) {
        if (response.status === 200) {
          isLoggedIn = true;
          toggleContainers();
        } else {
          isLoggedIn = false;
          toggleContainers();
        }
      });
    } else {
      isLoggedIn = false;
      toggleContainers();
    }
  });
}

checkLoginStatus();

// -----Status --

let loginBtn = document.getElementById("loginButton");

loginBtn.addEventListener("click", toggle);

function toggle() {
  document.getElementById("loginPrimary").classList.add("hidden");
  document.getElementById("loginSecondary").classList.remove("hidden");
}

let loginBackend = document.getElementById("loginBackend");
loginBackend.addEventListener("click", login);

function login() {
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  const data = { email: email, password: password };

  fetch("http://localhost:8000/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => {
      // chrome.runtime.sendMessage({ action: "loginSuccess", data: data });
      chrome.storage.local.set({ token: data.token }, function () {
        console.log("loggedIn");
      });
      isLoggedIn = true;
      toggleContainers();
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Send a message to the background script to check if the user is logged in when the popup is loaded
document.addEventListener("DOMContentLoaded", function () {
  chrome.runtime.sendMessage({ action: "checkLogin" }, function (response) {
    if (response.loggedIn) {
      isLoggedIn = true;
      toggleContainers();
    } else {
      isLoggedIn = false;
      toggleContainers();
    }
    console.log(response);
  });
});

// **************************************************
