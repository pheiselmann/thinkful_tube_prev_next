var YOUTUBE_BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

var state = {
  // currentQuery: "",
  // nextPageId: "",
  // prevPageId: ""
}

function getDataFromApi(searchTerm, pageId, callback) {
  var settings = {
    url: YOUTUBE_BASE_URL,
    data: {
      q: searchTerm,
      part: 'snippet',
      key: 'AIzaSyBdbVWr5I6Ms7sLJzk8MWXYVPdieunOSHQ',
      pageToken: pageId
    },
    dataType: 'json',
    type: 'GET',
    success: callback
  };
  $.ajax(settings);
}


function displayYouTubeSearchData(data) {
  var resultElement = '';
  if (data.items) {
    data.items.forEach(function(item) {
      if (item.id.videoId) {
        resultElement += '<p><a href="https://www.youtube.com/watch?v=' + item.id.videoId + '"><img src="' + 
        item.snippet.thumbnails.medium.url + '"></a></p>';
      }
    });
  }
  else {
    resultElement += '<p>No results</p>';
  }

  if (data.nextPageToken) {
    $('.js-next-page').removeClass('hidden');
    state.nextPageId = data.nextPageToken;
   

  }
  //alert(state.nextPageId);

  if (data.prevPageToken) {
    $('.js-prev-page').removeClass('hidden');
    state.prevPageId = data.prevPageToken;
  }
  
  $('.js-search-results').html(resultElement);
}

function watchSubmit(state) {
  $('.js-search-form').submit(function(e) {
    e.preventDefault();
    var query = $(this).find('.js-query').val();
    state.currentQuery = query;
    //alert(state.currentQuery);
    var pageId = '';
    getDataFromApi(query, pageId, displayYouTubeSearchData);
  });
}

function nextPage(state) {
 $('.js-next-page').click(function(e) {
    e.preventDefault();
    var pageId = state.nextPageId;
    var query = state.currentQuery;
    getDataFromApi(query, pageId, displayYouTubeSearchData);
  });
}

function prevPage(state) {
$('.js-prev-page').submit(function(e) {
    e.preventDefault();
    var pageId = state.prevPageId;
    var query = state.currentQuery;
    getDataFromApi(query, pageId, displayYouTubeSearchData);
  });
}

$(function(){
  //displayYouTubeSearchData(data, state);
  watchSubmit(state);
  nextPage(state);
  prevPage(state);
});
