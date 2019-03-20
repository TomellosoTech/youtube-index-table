'use strict';

var player;

function loadYoutubeVideo(){
  var tag = document.createElement('script');

  tag.src = '//www.youtube.com/iframe_api';
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

function onYouTubeIframeAPIReady() {
  player = {};

  player = new YT.Player("video-container", {
    height: '330',
    width: '100%',
    videoId: videoId,
    events: {
      'onReady': onPlayerReady
      //'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  //event.target.playVideo();
}

function parseToSeconds(str){
  var p = str.split(':'), // split it at the colons
      s = 0, m = 1;
  while (p.length > 0) {
      s += m * parseInt(p.pop(), 10);
      m *= 60;
  }
  return s;
}

function loadYoutubeVideoIndex(){
    var data = {
        "id": videoId,
        "part": "snippet",
        "key": "AIzaSyCI6QmEIo03v7kBDB2t3_Gu5kO9dzYN5_A"
    };

    $.ajax({
      dataType: "json",
      url: "https://www.googleapis.com/youtube/v3/videos",
      data: data,
      success: function(response){
          var descripcion = response.items[0].snippet.description.split("\n");
          descripcion.forEach(function(elem, i){

              var result = elem.match(/(.*\d{2}:\d{2}\s)(.*)/);

              if(result){
                  $("tbody").append(`
                      <tr>
                        <td>${result[1]}</td>
                        <td>${result[2]}</td>
                      </tr>`);

              }
          });

          $('.video-index tbody tr').click(function(){
              //$videoId = $(this).parent().data("video-id");
              var str = $(this).find("> td")[0].innerHTML;
              player.seekTo(parseToSeconds(str));
          });


      }
    });
}
