var frame = require("ui/frame");
var config = require("../../shared/config");
var drawer;


function loaded(args) {
	var page = args.object;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/categories"
	    }
	});

	wpclient.success(function(response) {
		var categories = response.getJSON();
		page.bindingContext = {data:categories};
	});

}

function viewCategoryAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/posts/posts",
		context: {category:args.view.bindingContext.id}
	}
	
	topmost.navigate(navigationEntry);
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};



exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;
exports.viewCategoryAction = viewCategoryAction;