var config = require("../../shared/config");
var drawer;

function loaded(args) {
	var page = args.object;
	var pageId = page.navigationContext.id;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/pages/" + pageId
	    }
	});

	wpclient.success(function(response) {
		var pageObj = response.getJSON();
		page.bindingContext = {page:pageObj};
	});
	
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};

exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;