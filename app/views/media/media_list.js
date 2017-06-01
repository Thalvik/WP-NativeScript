var config = require("../../shared/config");
var frame = require("ui/frame");
var drawer;

function loaded(args) {
	var page = args.object;
	var navigationData = page.navigationContext;
	var wpclient = config.authorize();
	var params = [];
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/media" 
	    },
	    params: params
	});

	wpclient.success(function(response) {
		var media = response.getJSON();
		page.bindingContext = {data:media};
	});

}

function viewMediaAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/media/media",
		context: {id:args.view.bindingContext.id}
	}
	
	topmost.navigate(navigationEntry);
}


function toggleDrawer() {
  drawer.toggleDrawerState();
};


exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;
exports.viewMediaAction = viewMediaAction;
