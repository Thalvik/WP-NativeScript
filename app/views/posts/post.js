var config = require("../../shared/config");
var frame = require("ui/frame");
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


function viewCommentsAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/comments/comments",
		context: {post:args.object.page.navigationContext.id}
	}
	
	topmost.navigate(navigationEntry);
}


function viewRevisionsAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/postrevisions/postrevisions",
		context: {post:args.object.page.navigationContext.id}
	}
	
	topmost.navigate(navigationEntry);
}


function toggleDrawer() {
  drawer.toggleDrawerState();
};



exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;
exports.viewCommentsAction = viewCommentsAction;
exports.viewRevisionsAction = viewRevisionsAction;