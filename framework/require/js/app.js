require.config({
    baseUrl: 'js/lib',
    paths: {
        app: '../app'
    }
});




// Start the main app logic.
require(['app/sub'],

function (person) {
	
	var instance = new person();
	console.log(instance.xMan);

});