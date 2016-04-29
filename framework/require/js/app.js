require.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
require(['a', 'app/sub'],

function (underscore, sub) {

    console.log(underscore)
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    // console.log($('div'))


});