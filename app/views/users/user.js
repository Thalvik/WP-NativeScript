var config = require("../../shared/config");
var drawer;

function loaded(args) {
	var page = args.object;
	var userId = page.navigationContext.id;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/users/" + userId
	    }
	});

	wpclient.success(function(response) {
		var user = response.getJSON();
		page.bindingContext = {user:user};
	});
	
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};



exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;