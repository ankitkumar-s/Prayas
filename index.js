const xhr = new XMLHttpRequest();

let urlFileName = document.location.pathname;



urlFileName = urlFileName.substring(urlFileName.lastIndexOf("/") + 1);

urlFileName = urlFileName.split(".");



const URL = `${urlFileName[0]}.json`;

function convertPlaylistToEmbed(url) {

    var playlistID = url.split('list=')[1].split('&')[0];

    var embedSrc = 'https://www.youtube.com/embed/videoseries?list=' + playlistID;

    return embedSrc;

}











xhr.open("GET", URL);



const playlistContainer = document.querySelector(".playlist-container");



xhr.onload = function () {

  let chapters = JSON.parse(xhr.responseText);

  chapters.forEach((chapter) => {

    console.log(convertPlaylistToEmbed(chapter.ytLink))

    const playlistCard = document.createElement("div");

    playlistCard.classList.add("playlist-card");

    playlistCard.innerHTML = `<iframe

    class="playlist"

    src="${convertPlaylistToEmbed(chapter.ytLink)}"

    title="YouTube video player"

    frameborder="0"

    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"

    referrerpolicy="strict-origin-when-cross-origin"

    allowfullscreen

  ></iframe>

  <a

    href="https://www.youtube.com/embed/videoseries?list="

    ><h3>${chapter.name}</h3></a

  >`;



    playlistContainer.append(playlistCard);

  });

};

xhr.send();

