$(document).ready(function() {
    var queryURL = {
        url: 'https://api.giphy.com/v1/gifs/search?api_key=lW5ME5ZTVc4hD1XPWWNITuRBE0z1xaPp',
        limit: '&limit=10',
        rating: '&rating=pg',
        getSearch: function(term) {
            var search = '&q=' + term;
            return search;
        }
    }

    var topicList = ["halloween", "fall", "beagle", "computers", "programming"];

    function createButtons() {
        topicList.forEach(function(t,i){
            var btn = $("<button>").addClass("gif-btn");
            btn.attr("data-index", i).text(t);
            $("header").append(btn);
        });
    }

    function clickButtons() {
        var btnIndex = $(this).attr("data-index");

        $.ajax({
            url: queryURL.url + queryURL.getSearch(topicList[btnIndex]) + queryURL.limit + queryURL.rating,
            method: "GET"
        }).then(createGifs);
    }

    function createGifs(gifData) {
        console.log(gifData);
        for(var i = 0; i < gifData.data.length; i++) {
            var gifDataItem = gifData.data[i];
            var imgContainer = $('<div>').addClass('img-container');
            var img = $('<img>').attr('src', gifDataItem.images.fixed_height_still.url);
            imgContainer.append(img);
            $("section").append(imgContainer);
        }
    }


    
    createButtons();
    $(".gif-btn").on('click', clickButtons);
});