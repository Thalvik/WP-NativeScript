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
	        resource: "/wp-json/wp/v2/types" 
	    },
	    params: params
	});

	wpclient.success(function(response) {
		var postTypesPlain = response.getJSON();
		var postTypes = [];

		for (var key in postTypesPlain) {
		    if (!postTypesPlain.hasOwnProperty(key)) continue;
		    var obj = postTypesPlain[key];
		    postTypes.push(obj);
		}
		page.bindingContext = {data:postTypes};
	});

}


function viewPostTypeAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/posttypes/posttype",
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
exports.viewPostTypeAction = viewPostTypeAction;
