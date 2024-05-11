const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


const xhr = new XMLHttpRequest();
const URL = `${params.subject}.json`;


xhr.open(`GET`, URL);

xhr.onload = function() {
  let chapters = JSON.parse(xhr.responseText);
  chapters.forEach(chapter => {
    if (chapter.name === params.chapter) {
      const playlistId = chapter.ytLink.split('list=')[1].split('&')[0];

      const apiKey = 'AIzaSyCGf-3_F2Ycx6W5_QdOa0gzK35HfySFKr8';
      const apiUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${apiKey}`;
      const playlistContainer = document.querySelector(".playlist-container");
      playlistContainer.innerHTML = `<div class="heading">
        <h1>${params.chapter.substring(params.chapter.indexOf(` `))}</h1>
      </div>`;

      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          data.items.forEach(video => {
            console.log(video.snippet.resourceId.videoId)
            const playlistCard = document.createElement("div");

            playlistCard.classList.add("playlist-card");

            playlistCard.innerHTML = `<iframe
              class="playlist"
              src="https://www.youtube.com/embed/${video.snippet.resourceId.videoId}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
            <a href = "https://www.youtube.com/watch?v=${video.snippet.resourceId.videoId}"><h3>${video.snippet.title}</h3></a>`;

            playlistContainer.append(playlistCard);
          })
        })
        .catch(error => {
          console.error('Error fetching playlist:', error);
        });
    }
  });
};

xhr.send();
