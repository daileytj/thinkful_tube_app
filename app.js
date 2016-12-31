// Application state *

// Global variables
var user_search_string = "";
var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';
var API_KEY = 'AIzaSyAj1RKJlNaMlg3rfFolFXPzl7bC9d4ehhE';
// Get data from API
function getDataFromApi(searchTerm, callback) {
  var settings = {
    url: YOUTUBE_BASE_URL,
    data: {
      part: 'snippet',
      key: API_KEY,
      maxResults: 18,
      q: searchTerm,
      r: 'json'
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
  console.log($.ajax(settings));
}

function displayYouTubeSearchData(data) {
  var renderedHTML = '';
  if (data.items) {
    data.items.forEach(function(item) {
     renderedHTML += '<div class="result">';
     renderedHTML += '<p class="video_title">' + item.snippet.title + '</p>';
     renderedHTML += '<a href = "https://www.youtube.com/watch?v=' + item.id.videoId + '"target="_blank"><img src="' + item.snippet.thumbnails.medium.url + '" class="video_tumbnail" alt="video thumbnail" /></a>';
     renderedHTML += '</div>';
    });
  }
  else {
    renderedHTML += '<div class="result">';
    renderedHTML += '<p class="video_title">No Video Found</p>';
    renderedHTML += '</div>';
  }

  $(".results_section").html(renderedHTML);
}


// Application functionality *
$(document).ready(function(){
// on user ".search_button" click or "enter" keypress store ".search" input value
$(".search").keypress(function(event){
  if(event.keyCode == 13){
    user_search_string = $(".search").val();
    console.log("user_search_string: " + user_search_string);
    getDataFromApi(user_search_string, displayYouTubeSearchData);
    $(".divider").removeClass("hidden");
    $(".results_section").removeClass("hidden");
  }
});

});
