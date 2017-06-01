var config = require("../../shared/config");
var frame = require("ui/frame");
var drawer;

function loaded(args) {
	var page = args.object;
	var commentId = page.navigationContext.id;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/comments/" + commentId
	    }
	});

	wpclient.success(function(response) {
		var comment = response.getJSON();
		page.bindingContext = {comment:comment};
	});
	
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};


exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;