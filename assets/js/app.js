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
        $('header').empty();
        topicList.forEach(function(t,i){
            var btn = $("<button>").addClass("gif-btn");
            btn.attr("data-index", i).text(t);
            $("header").append(btn);
        });
        $(".gif-btn").on('click', clickButtons);
    }

    function clickButtons() {
        var btnIndex = $(this).attr("data-index");

        $.ajax({
            url: queryURL.url + queryURL.getSearch(topicList[btnIndex]) + queryURL.limit + queryURL.rating,
            method: "GET"
        }).then(createGifs);
    }

    function createGifs(gifData) {
        $('section').empty();
        console.log(gifData);
        for(var i = 0; i < gifData.data.length; i++) {
            var gifDataItem = gifData.data[i];
            var imgContainer = $('<div>').addClass('img-container');
            var img = $('<img>').attr({
                'src': gifDataItem.images.fixed_height_still.url,
                'data-still': gifDataItem.images.fixed_height_still.url,
                'data-ani': gifDataItem.images.fixed_height.url,
                'data-state': 'still'
            });
            imgContainer.append(img);
            $("section").append(imgContainer);
        }
        $('.img-container>img').on('click', switchImgState);
    }

    function switchImgState() {
        var state = $(this).attr('data-state');
        if (state === 'still') {
            var aniURL = $(this).attr('data-ani');
            $(this).attr({
                'src': aniURL,
                'data-state': "ani"
            }); 
        } else {
            var stillURL = $(this).attr('data-still');
            $(this).attr({
                'src': stillURL,
                'data-state': 'still'
            }); 

        }
    }

    createButtons();
});