const xhr = new XMLHttpRequest();
let urlFileName = document.location.pathname;

urlFileName = urlFileName.substring(urlFileName.lastIndexOf("/") + 1);
urlFileName = urlFileName.split(".");

const URL = `${urlFileName[0]}.json`;

xhr.open("GET", URL);

const playlistContainer = document.querySelector(".playlist-container");

xhr.onload = function () {
  let chapters = JSON.parse(xhr.responseText);
  chapters.forEach((chapter) => {
    const playlistCard = document.createElement("div");
    playlistCard.classList.add("playlist-card");
    playlistCard.innerHTML = `<iframe
    class="playlist"
    src="${chapter.embedLink}"
    title="YouTube video player"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin"
    allowfullscreen
  ></iframe>
  <a
    href=${chapter.ytLink}
    ><h3>${chapter.name}</h3></a
  >`;

    playlistContainer.append(playlistCard);
  });
};
xhr.send();
