var config = require("../../shared/config");
var frame = require("ui/frame");
var drawer;

function loaded(args) {
	var page = args.object;
	var navigationData = page.navigationContext;
	var wpclient = config.authorize();
	var params = [];
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/statuses" 
	    },
	    params: params
	});

	wpclient.success(function(response) {
		var postStatusesPlain = response.getJSON();
		var postStatuses = [];

		for (var key in postStatusesPlain) {
		    if (!postStatusesPlain.hasOwnProperty(key)) continue;
		    var obj = postStatusesPlain[key];
		    postStatuses.push(obj);
		}
		page.bindingContext = {data:postStatuses};
	});

}


function viewPostStatusAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/poststatuses/poststatus",
		context: {slug:args.view.bindingContext.slug}
	}
	
	topmost.navigate(navigationEntry);
}


function toggleDrawer() {
  drawer.toggleDrawerState();
};

exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;
exports.viewPostStatusAction = viewPostStatusAction;