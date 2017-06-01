var config = require("../../shared/config");
var frame = require("ui/frame");
var drawer;

function loaded(args) {
	var page = args.object;
	var wpclient = config.authorize();
	var params = [];
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/users" 
	    },
	    params: params
	});

	wpclient.success(function(response) {
		var users = response.getJSON();
		page.bindingContext = {data:users};
	});

}



function viewUserAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/users/user",
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
exports.viewUserAction = viewUserAction;
