$document.ready(function() {
    var queryURL = {
        url: 'https://api.giphy.com/v1/gifs/search?',
        APIkey: 'api_key=lW5ME5ZTVc4hD1XPWWNITuRBE0z1xaPp',
        getSearch: function(term) {
            search: '&q' + term;
            return search;
        }
    }

    var topicList = ["halloween", "fall", "beagle", ""]
});