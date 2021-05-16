var apiKey = 'AIzaSyAZ0Co-nk2eOGd5x535zJV6E39gwu3s73Y';
var keyword;
var message;
function init() {
    gapi.client.setApiKey(apiKey);
    gapi.client.load('youtube', 'v3', function () {
        console.log('Youtube API already');
    });
}

$('document').ready(function () {
    // Submit search form
    $('#form-search').on('submit', function (e) {
        e.preventDefault();
        keyword = $('#input-search').val();
        if (keyword == '') return;
        search(keyword);
    });

    // Search by keyword
    function search(keyword) {
        $.ajax({
            type: 'GET',
            url: 'https://www.googleapis.com/youtube/v3/search',
            data: {
                part: 'snippet,id',
                q: keyword,
                maxResults: 100,
                type: 'video',
                key: apiKey,
            },
            success: function (data) {
                //console.log(JSON.stringify(data));
                $('#result-list').html('');
                var content = '';
                for (var i = 0; i < data.items.length; i++) {
                    if (data.items.length > 0) {
                        content = content + getResults(data.items[i]);
                    }
                }
                $('#result-list').append(content);
            },
        });
    }

    // return item search
    function getResults(item) {
        // get properties of item
        var videoID = item.id.videoId;
        var title = item.snippet.title;
        var thumb = item.snippet.thumbnails.high.url;
        var channelTitle = item.snippet.channelTitle;
        var output =
            '<div class="row py-2 result-item" data-item-idvideo="' +
            videoID +
            '" data-item-thumbnail="' +
            thumb +
            '" data-item-title="' +
            title +
            '" data-item-channeltitle="' +
            channelTitle +
            '" onclick="addQueue(this)">' +
            '<img class="col-12 col-sm-4 col-md-4 col-lg-4 col-xl-4 result-item-thumbnail" src="' +
            thumb +
            '" alt="">' +
            '<div class="col-12 col-sm-8 col-md-8 col-lg-8 col-xl-8 result-item-info pl-3">' +
            '<div class="py-1 result-item-info-title">' +
            '<span class="result-item-info-title-text">' +
            title +
            '</span>' +
            '</div>' +
            '<div class="py-1 result-item-info-channel">' +
            channelTitle +
            '</div>' +
            '</div>' +
            '</div>';
        return output;
    }
});

function switchScreen() {
    var searchScreen = $('.main-left');
    var queueScreen = $('.main-right');
    var switchButton = $('#switch-btn');

    if (searchScreen.hasClass('d-none')) {
        switchButton.html('<i class="fa fa-music" aria-hidden="true"></i>');
        searchScreen.removeClass('d-none');
        queueScreen.addClass('d-none');
    } else {
        switchButton.html('<i class="fa fa-search" aria-hidden="true"></i>');
        queueScreen.removeClass('d-none');
        searchScreen.addClass('d-none');
    }
}
