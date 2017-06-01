var config = require("../../shared/config");
var frame = require("ui/frame");
var drawer;


function loaded(args) {
	var page = args.object;
	var navigationData = page.navigationContext;
	var wpclient = config.authorize();
	drawer = page.getViewById("drawer");
	var params = [];

	if (navigationData != undefined) {
		if (navigationData.post != null) {
			params['post'] = navigationData.post;
		}
	}

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/comments" 
	    },
	    params: params
	});

	wpclient.success(function(response) {
		var comments = response.getJSON();
		page.bindingContext = {data:comments};
	});

}

function viewCommentAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/comments/comment",
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
exports.viewCommentAction = viewCommentAction;
