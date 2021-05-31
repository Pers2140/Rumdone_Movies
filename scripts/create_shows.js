
// Iterate through movies.json
$.getJSON("./scripts/shows.json", function (data) {

  $.each(data, (key, val) => {
    //create new movie instance with key = movie_path_name & val = movie object
    // console.log(key,val)
    let title = data[key]
    let details = val

    let curr_show = new show(title, details)
    curr_show.get_details()
    curr_show.list_episodes()
  })

})
$("#wait").css("display", "none");


//Creating show class before creating shows ( avoiding declaring class more than once)
class show {
  constructor(name, m) {
    this.id = Math.floor(Math.random() * 9999)
    this.mid = 'id' + this.id
    this.title = m.title
    this.poster = m.poster
    this.plot = m.plot
    this.episodes = m.episodes
    this.score = Math.floor(m.score)
    this.score_star = '⭐'.repeat(Math.floor(m.score))
    this.year = m.release_date

  }

  xclicked() {
    $("." + this.mid + "_movie_box").html("")
    // alert('clicked')
  }

  get_details() {
    // console.log(this.title)

    $('.movie-holder').append(`
    <div class="card" id = "${this.title}">
        <p style="display:none;">${this.title}<p>
        <p style="display:none;">${this.year}<p>
        <div type="button" data-toggle="modal" data-target="#${this.mid}"class="movie-card well-block col-xs-12 col-sm-6 col-md-3">
        <div class="score"><p>${this.score}⭐</div>
        <img class="card-img" src ="${this.poster}"></img></div>
        </div>             
        <div id="${this.mid}" class="modal" role="dialog">
          <div class="modal-dialog">
            <div style="background:#0e2430;color:white;" class="modal-content">
            <button style="color:white;margin:5px"type="button" class="close" data-dismiss="modal"><svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-up-right-circle-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.5 5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V6.707l-4.146 4.147a.5.5 0 0 1-.708-.708L9.293 6H6.5a.5.5 0 0 1 0-1z"/>
          </svg></button>
              <div class="modal-header">
                <hr>
                <p class="title modal-title">${this.title}</p>
                <hr>
                <p id="plot">${this.plot}</p><br>
                <p class="genre badge"style="font-size:22px;background:#003049;color:#edf2f4" id="plot">Year: ${this.year}</p>
              </div>
              <div class="modal-body">
              <a onclick="setmovie('${this.location}')" ><div class="poster-button"></div><img class="popup-img" src ="${this.poster}"></img></a><br><br>
              <div class="${this.mid}_movie_box">
              </div>
              <hr style="height:1px;width:85%;color:green;background-color:darkblue">
              <h3>Rating</h3><h2>${this.score_star}<h2><h3>${this.score}/10<h3>
              <button style="background:#C40233;border-radius:4px"data-toggle="collapse" data-target="#sodes_butt">Episodes</button>
              
              <div id="sodes_butt" class="collapse">
              <br>
              <div class="list-group episodes ${this.mid}_episodes"></div>
              </div> 
              
              </div>
              <div class="modal-footer">
                <button onclick="xclicked(${this.mid})" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>`)
  }

  list_episodes() {
    Object.keys(this.episodes).forEach((key) => {
      let episodes = Object.values(this.episodes)
      let file_name = key
      let file_link = this.episodes[key]

      $(`.${this.mid}_episodes`).append(`<p><a href="#" style="background:#141414;color:white;"class="list-group-item"onclick="setmovie('${file_link.replace('view?usp=drivesdk', 'preview')}','${episodes}','${file_link}')" >${file_name.substring(0, file_name.length - 4)}<p><a>\n`)
      console.log(file_link.replace('view?usp=drivesdk', 'preview'))

    })
  }
}
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
}
//setting iframe source and changing with next and pre buttons
function setmovie(source, episodes, episode) {
  // alert(source)
  $('.frame').attr('src', source)
  $('.frame').css('display', 'block')
  $('.blocker').css('display', 'block')
  $('#movies').css('display', 'none')
  
  let episodes_len = episodes.length
  let episodes_arr = episodes.split(",")
  let curr_episode = episodes_arr.indexOf(episode)

  // next button clicked
  $(".next_btn").click(() => {
    $('.frame').attr('src', episodes_arr[curr_episode + 1].replace('view?usp=drivesdk', 'preview'))
    // console.log(episodes_arr[curr_episode + 1].replace('view?usp=drivesdk', 'preview'))

    if(curr_episode>=episodes_len){alert("end of next");curr_episode=0}else{curr_episode++}
  });

  // back button clicked
  $(".pre_btn").click(() => {
    $('.frame').attr('src', episodes_arr[curr_episode - 1].replace('view?usp=drivesdk', 'preview'))
    // console.log(episodes_arr[curr_episode + 1].replace('view?usp=drivesdk', 'preview'))

    if(curr_episode>=episodes_len){alert("end of pre"); curr_episode=0}else{curr_episode--}
  });

  $(".fullscreen").click(()=>{
    toggleFullScreen()
  })
}






























