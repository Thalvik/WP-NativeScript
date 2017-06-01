var config = require("../../shared/config");
var drawer;

function loaded(args) {
	var page = args.object;
	var postStatusSlug = page.navigationContext.slug;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/statuses/" + postStatusSlug
	    }
	});

	wpclient.success(function(response) {
		var status = response.getJSON();
		page.bindingContext = {status:status};
	});
	
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};

exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;