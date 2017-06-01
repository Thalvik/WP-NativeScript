var config = require("../../shared/config");
var drawer;

function loaded(args) {
	var page = args.object;
	var postTypeSlug = page.navigationContext.slug;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/types/" + postTypeSlug
	    }
	});

	wpclient.success(function(response) {
		var postType = response.getJSON();
		page.bindingContext = {postType:postType};
	});
	
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};

exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;