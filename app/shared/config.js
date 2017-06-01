var ApiClient = require("nativescript-apiclient");
var frame = require("ui/frame");

function authorize() {
	
	var wpclient = ApiClient.newClient({
	    baseUrl: "https://demo.wp-api.org",
	    route: "{resource}",
	    //authorizer: new ApiClient.BasicAuth("some_username", "some_password"), //Uncomment this for authorization
	});

	wpclient.beforeSend(function(opts) {
		//console.dir(opts);
	});

	wpclient.clientError(function(result) {
		//console.dir(result);
	});

	wpclient.serverError(function(result) {
		//console.dir(result);
	});

	wpclient.success(function(result) {
		//console.dir(result);
	});

	wpclient.error(function(result) {
		//console.dir(result);
	});


	return wpclient;
}


function navigate(args) {
	var pageSlug = args.view.id;
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/" + pageSlug
	}
	
	topmost.navigate(navigationEntry);
}

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}


module.exports = {
    authorize: authorize,
    navigate: navigate,
    handleErrors: handleErrors
};