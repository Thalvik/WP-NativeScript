var config = require("../../shared/config");
var drawer;

function loaded(args) {
	var page = args.object;
	var postId = page.navigationContext.id;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/posts/" + postId
	    }
	});

	wpclient.success(function(response) {
		var post = response.getJSON();
		page.bindingContext = {post:post};
	});
	
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};

exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;
