var config = require("../../shared/config");
var frame = require("ui/frame");
var drawer;

function loaded(args) {
	var page = args.object;
	var navigationData = page.navigationContext;
	var wpclient = config.authorize();
	var params = [];
	drawer = page.getViewById("drawer");

	if (navigationData != undefined) {
		if (navigationData.category != null) {
			params['categories'] = navigationData.category;
		}

		if (navigationData.tag != null) {
			params['tags'] = navigationData.tag;
		}
	}

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/posts" 
	    },
	    params: params
	});

	wpclient.success(function(response) {
		var posts = response.getJSON();
		page.bindingContext = {data:posts};
	});

}



function viewPostAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/posts/post",
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
exports.viewPostAction = viewPostAction;
