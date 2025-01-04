(function () {
  let video = document.querySelector("video");

  function saveTime() {
    if (video && video.currentTime > 5) {
      let videoId = new URL(window.location.href).searchParams.get("v");
      if (videoId) {
        chrome.storage.local.set({ [videoId]: video.currentTime });
      }
    }
  }

  function restoreTime() {
    let videoId = new URL(window.location.href).searchParams.get("v");
    if (videoId) {
      chrome.storage.local.get([videoId], function (result) {
        if (result[videoId]) {
          video.currentTime = result[videoId];
          console.log("Time restored", result[videoId]);
        }
      });
    }
  }

  let checkExist = setInterval(() => {
    video = document.querySelector("video");
    if (video) {
      clearInterval(checkExist);
      restoreTime();
      video.addEventListener("timeupdate", saveTime);
      console.log("Video loaded");
    }
  }, 1000);
})();
