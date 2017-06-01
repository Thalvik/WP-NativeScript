var config = require("../../shared/config");
var drawer;

function loaded(args) {
	var page = args.object;
	var taxonomySlug = page.navigationContext.slug;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/taxonomies/" + taxonomySlug
	    }
	});

	wpclient.success(function(response) {
		var taxonomy = response.getJSON();
		page.bindingContext = {taxonomy:taxonomy};
	});
	
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};



exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;