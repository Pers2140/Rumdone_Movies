
// Iterate through movies.jsondfd
$.getJSON("./scripts/movies.json", function (data) {
  $.each(data, (key, val) => {
    //create new movie instance with key = movie_path_name & val = movie object
    var curr_movie = new movie(key, val)
    curr_movie.get_details()

  })
  $("#wait").css("display", "none");

})

//Creating movie class before creating movies ( avoiding declaring class more than once)
class movie {
  constructor(name, m) {
    this.name = name.slice(0, -1)
    this.id = Math.floor(Math.random() * 9999)
    // check if release date exist
    if (m.release_date) { this.year = m.release_date.substring(0, 4) }
    this.poster = "https://image.tmdb.org/t/p/original" + m.poster
    this.title = m.title
    this.genre = m.genre
    this.mid = 'id' + this.id
    this.plot = m.plot
    this.score = Math.floor(m.score)
    this.score_star = '⭐'.repeat(Math.floor(m.score))
    this.runtime = m.runtime
    this.driveid = m.driveid
    this.location = `https://drive.google.com/file/d/${this.driveid}/preview`
  }
  // set_movie(source){
  //   $('.frame').attr('src',source)
  //   $('.frame').show()
  // }
  get_details() {
    // console.log(this.year)
    if (this.driveid == undefined) {
      console.log('not ready')
    }
    else {
      $('.movie-holder').append(`
    <div class="card" id = "${this.title}">
        <p style="display:none;">${this.title}<p>
        <p style="display:none;">${this.year}<p>
        <div type="button" data-toggle="modal" data-target="#${this.mid}"class="movie-card well-block col-xs-12 col-sm-9 col-md-6 col-lg-3">
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
              <p><b>Click on Poster to play<b><p>
              <a onclick="setmovie('${this.location}')" ><div class="poster-button"><img src="./images/play-button.png"></img></div><img class="popup-img" src ="${this.poster}"></img></a><br><br>
              <div class="${this.mid}_movie_box">
              </div>
              <hr style="height:1px;width:85%;color:green;background-color:darkblue">
              <h3>Rating</h3><h2>${this.score_star}<h2><h3>${this.score}/10<h3>
              </div>
              <div class="modal-footer">
                <button onclick="xclicked(${this.mid})" type="button" class="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>`)
    }
  }
}

function setmovie(source) {
  // alert(source)
  $('.frame').attr('src', source)
  $('.frame').css('display', 'block')
  $('.blocker').css('display', 'block')
  $('#movies').css('display', 'none')
  $(".fullscreen").click(() => {
    toggleFullScreen()
  })
}

//toggle fullscreen ...
function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
    !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
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





























