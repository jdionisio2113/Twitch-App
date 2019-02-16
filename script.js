var twitchApp = {
  init: function() {
    var input = document.querySelector(".input2");
    var clientId = "t8yaydrbaft3dpp950285vmtcal743";

    document.querySelector(".pop-up").style.display = "none";

    document.querySelector(".searchBtn").addEventListener("click", popUp);

    document.querySelector(".exit").addEventListener("click", exitPopUp);

    document.getElementById("browse").addEventListener("click", dropDown);

    document.querySelector(".loading-text").style.display = "none";

    document.querySelector(".searchBtn2").addEventListener("click", () => {
      this.fetchContent(
        `http://api.twitch.tv/kraken/search/channels?client_id=${clientId}&query=${
          input.value
        }`,
        "search"
      );
    });

    document.getElementById("online").addEventListener("click", () => {
      this.fetchContent(
        `https://api.twitch.tv/kraken/streams?client_id=${clientId}&limit=27`,
        "liveChannels"
      );
    });

    document.getElementById("categories").addEventListener("click", () => {
      this.fetchContent(
        `https://api.twitch.tv/kraken/games/top?client_id=${clientId}&limit=45`,
        "category"
      );
    });
  },

  fetchContent: function(endpoint, type) {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        if (type === "category") {
          TwitchUI.renderCategory(data);
        } else if (type === "liveChannels") {
          TwitchUI.renderLiveChannels(data);
        } else if (type === "search") {
          TwitchUI.renderSearch(data);
        }
      });
  }
};

var TwitchUI = {
  renderCategory: function(data) {
    var games = data.top;
    var markup2 = games
      .map(function(item, index) {
        var gamePreview = item.game.box.large;
        var gameName = item.game.name;
        var gameViewers = item.viewers;

        var viewers = gameViewers.toLocaleString();

        console.log(gamePreview);
        return `
        <a class="category_link "href="#" target=_blank>
                <div class="game_container">
                    <img class="game_preview" src="${gamePreview}">
                      <div class="game_description">
                        <p class="game_name">${gameName}</p>
                        <p class="game_viewers">${viewers} viewers</p>
                      </div>
                </div>
                <div id="border">
                </div>
                </a>
                
              `;
      })
      .join("");

    document.getElementsByClassName("content")[0].innerHTML = markup2;
  },

  renderLiveChannels: function(data) {
    var result = data.streams;
    var markup = result
      .map(function(item, index) {
        var streamPreview = item.preview.medium;
        var streamLink = item.channel.url;
        var streamerLogo = item.channel.logo;
        var stream_name = item.channel.display_name;
        var stream_game = item.game;
        var viewers = item.viewers;

        var channelViewers = viewers.toLocaleString();

        var caption = item.channel.status;
        var length = 35;
        var trimmedCaption =
          caption.length > length
            ? caption.substring(0, length - 3) + "..."
            : caption;
        // console.log(trimmedCaption);

        return `
    <div class="streamerContent">
    <div class="streamer_box">
      <div class="viewer_count">
      <img class="live_streamer" src="img/red_dot.svg"/>
      <p id="viewers">${channelViewers} viewers</p>
      </div>
          <a href="${streamLink}" target="_blank"><img src="${streamPreview}"/></a>           
    </div>
  
    <div class="streamCaption">
      <img class="streamerLogo" src="${streamerLogo}" />
      <div class="streamerInfo">
        <a id="stream_link" href="${streamLink}" target="_blank"
          ><p id="caption">${trimmedCaption}</p></a
        >
        <p id="displayName">${stream_name}</p>
        <p id="video_game">${stream_game}</p>
      </div>
    </div>
  </div>
    `;

        //   document.getElementById("content").innerHTML = streamPreview;
      })
      .join("");

    document.getElementsByClassName("content")[0].innerHTML = markup;
  },

  renderSearch: function(data) {
    console.log(data);
  }
};

twitchApp.init();

function popUp(e) {
  e.preventDefault();
  document.querySelector(".pop-up").style.display = "block";
}

function exitPopUp() {
  document.querySelector(".pop-up").style.display = "none";
}

function Pop_Up(e) {
  e.preventDefault();
  // document.querySelector(".input-container").classList.toggle("show");
  // document.querySelector(".show").style.display = "block";
}

function dropDown(e) {
  e.preventDefault();
  document.querySelector(".buttons").classList.toggle("show");
  // document.querySelector(".show").style.display = "block";
}

window.onclick = function(event) {
  if (!event.target.matches("#browse")) {
    var dropdowns = document.getElementsByClassName("buttons");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

// ======================================================================

// var input = document.querySelector(".input2");
// var clientId = "t8yaydrbaft3dpp950285vmtcal743";

// document.querySelector(".pop-up").style.display = "none";

// document.querySelector(".searchBtn").addEventListener("click", popUp);

// document.querySelector(".exit").addEventListener("click", exitPopUp);

// document.querySelector(".searchBtn2").addEventListener("click", searchValue);

// document.getElementById("browse").addEventListener("click", dropDown);

// // document.getElementById("categories").addEventListener("click", displayGames);

// function searchValue() {
//   var searchEndpoint = fetch(
//     `http://api.twitch.tv/kraken/search/channels?client_id=${clientId}&query=${
//       input.value
//     }`
//   )
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       // document.querySelector(".pop-up").style.display = "none";
//     });
// }

// document.querySelector(".loading-text").style.display = "none";

// document.getElementById("online").addEventListener("click", function() {
//   fetchContent(
//     `https://api.twitch.tv/kraken/streams?client_id=${clientId}`,
//     "liveChannels"
//   );
// });

// document.getElementById("categories").addEventListener("click", function() {
//   fetchContent(
//     `https://api.twitch.tv/kraken/games/top?client_id=${clientId}`,
//     "category"
//   );
// });

// function fetchContent(endpoint, type) {
//   fetch(endpoint)
//     .then(res => res.json())
//     .then(data => {
//       if (type === "category") {
//         renderCategory(data);
//       } else if (type === "liveChannels") {
//         renderLiveChannels(data);
//       } else if (type === "favorites") {
//         renderSearch(data);
//       }
//     });
// }

// function renderCategory(data) {
//   var games = data.top;
//   var markup2 = games
//     .map(function(item, index) {
//       var gamePreview = item.game.box.large;
//       var gameName = item.game.name;
//       var gameViewers = item.viewers;

//       console.log(gamePreview);
//       return `

//               <div class="game_container">
//                   <img class="game_preview" src="${gamePreview}">
//                     <div class="game_description">
//                       <p class="game_name">${gameName}</p>
//                       <p class="game_viewers">${gameViewers} viewers</p>
//                     </div>
//               </div>
//               <div id="border">
//               </div>

//             `;
//     })
//     .join("");

//   document.getElementsByClassName("content")[0].innerHTML = markup2;
// }

// function renderLiveChannels(data) {
//   var result = data.streams;
//   var markup = result
//     .map(function(item, index) {
//       var streamPreview = item.preview.medium;
//       var streamLink = item.channel.url;
//       var streamerLogo = item.channel.logo;
//       var stream_name = item.channel.display_name;
//       var stream_game = item.game;
//       var viewers = item.viewers;

//       var caption = item.channel.status;
//       var length = 35;
//       var trimmedCaption =
//         caption.length > length
//           ? caption.substring(0, length - 3) + "..."
//           : caption;
//       // console.log(trimmedCaption);

//       return `
//   <div class="streamerContent">
//   <div class="streamer_box">
//     <div class="viewer_count">
//     <img class="live_streamer" src="img/red_dot.svg"/>
//     <p id="viewers">${viewers} viewers</p>
//     </div>
//         <a href="${streamLink}" target="_blank"><img src="${streamPreview}"/></a>
//   </div>

//   <div class="streamCaption">
//     <img class="streamerLogo" src="${streamerLogo}" />
//     <div class="streamerInfo">
//       <a id="stream_link" href="${streamLink}" target="_blank"
//         ><p id="caption">${trimmedCaption}</p></a
//       >
//       <p id="displayName">${stream_name}</p>
//       <p id="video_game">${stream_game}</p>
//     </div>
//   </div>
// </div>
//   `;

//       //   document.getElementById("content").innerHTML = streamPreview;
//     })
//     .join("");

//   document.getElementsByClassName("content")[0].innerHTML = markup;
// }

// function renderCategory(data) {

// }

// ------------ LIVE CHANNELS ---------------
// window.onload = function() {
// function displayUsers() {
//   // document.querySelector(".loading-text").style.display = "block";

//   var endpoint = fetch(
//     `https://api.twitch.tv/kraken/streams?client_id=${clientId}`
//   )
//     .then(res => res.json())
//     .then(data => {
//       // document.querySelector(".loading-text").style.display = "none";
//       document.querySelector(".content2").style.display = "block";
//       console.log(data);
//       // document.querySelector(".show").style.display = "none";
//       // document.getElementById("pop-up").style.display = "block";
//       var result = data.streams;
//       console.log(result);

//       //   for (let i = 0; i < result.length; i++) {
//       //     console.log(result[i]);
//       //     var streams = `<img src="${result.preview.medium}">`;
//       //     document.getElementById("content").innerHTML = streams;
//       //   }

//       var markup = result
//         .map(function(item, index) {
//           var streamPreview = item.preview.medium;
//           var streamLink = item.channel.url;
//           var streamerLogo = item.channel.logo;
//           var stream_name = item.channel.display_name;
//           var stream_game = item.game;
//           var viewers = item.viewers;

//           var caption = item.channel.status;
//           var length = 35;
//           var trimmedCaption =
//             caption.length > length
//               ? caption.substring(0, length - 3) + "..."
//               : caption;
//           // console.log(trimmedCaption);

//           return `
//           <div class="streamerContent">
//           <div class="streamer_box">
//             <div class="viewer_count">
//             <img class="live_streamer" src="img/red_dot.svg"/>
//             <p id="viewers">${viewers} viewers</p>
//             </div>
//                 <a href="${streamLink}" target="_blank"><img src="${streamPreview}"/></a>
//           </div>

//           <div class="streamCaption">
//             <img class="streamerLogo" src="${streamerLogo}" />
//             <div class="streamerInfo">
//               <a id="stream_link" href="${streamLink}" target="_blank"
//                 ><p id="caption">${trimmedCaption}</p></a
//               >
//               <p id="displayName">${stream_name}</p>
//               <p id="video_game">${stream_game}</p>
//             </div>
//           </div>
//         </div>
//           `;

//           //   document.getElementById("content").innerHTML = streamPreview;
//         })
//         .join("");

//       console.log(markup);

//       document.getElementsByClassName("content")[0].style.display = "block";
//       document.getElementsByClassName("content2")[0].style.display = "none";

//       document.querySelector(".container").innerHTML = markup;
//     });
// }

// ------------ CATEGORIES ---------------
// function displayGames() {
//   // document.querySelector(".loading-text").style.display = "block";

//   var topGames = fetch(
//     `https://api.twitch.tv/kraken/games/top?client_id=${clientId}`
//   )
//     .then(res => res.json())
//     .then(data => {
//       console.log(data);
//       var games = data.top;
//       console.log(games);

//       // document.querySelector(".content").style.display = "none";
//       // document.querySelector(".loading-text").style.display = "none";

//       var markup2 = games
//         .map(function(item, index) {
//           var gamePreview = item.game.box.large;
//           var gameName = item.game.name;
//           var gameViewers = item.viewers;

//           console.log(gamePreview);
//           return `

//                     <div class="game_container">
//                         <img class="game_preview" src="${gamePreview}">
//                           <div class="game_description">
//                             <p class="game_name">${gameName}</p>
//                             <p class="game_viewers">${gameViewers} viewers</p>
//                           </div>
//                     </div>
//                     <div id="border">
//                     </div>

//                   `;
//         })
//         .join("");

//       document.getElementsByClassName("content")[0].style.display = "none";
//       document.getElementsByClassName("content2")[0].style.display = "block";
//       document.querySelector(".content2").innerHTML = markup2;
//     });
// }

// window.onclick = function(event) {
//   if (!event.target.matches(".pop-up")) {
//     var dropdowns = document.getElementsByClassName("input-container");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains("show")) {
//         openDropdown.classList.remove("show");
//       }
//     }
//   }
// };
// };
