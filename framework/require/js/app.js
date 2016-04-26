requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});

// Start the main app logic.
requirejs(['jquery', 'Underscore', 'app/sub'],
function   ($, _, sub) {

    console.log(_)
    //jQuery, canvas and the app/sub module are all
    //loaded and can be used here now.
    // console.log($('div'))
});