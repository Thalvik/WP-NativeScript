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
		if (navigationData.post != null) {
			wpclient.get({
			    routeParams: {
			        resource: "/wp-json/wp/v2/posts/" + navigationData.post + "/revisions" 
			    },
			    params: params
			});

			wpclient.success(function(response) {
				var revisions = response.getJSON();
				page.bindingContext = {data:revisions};
			});
		}

	}

}

function viewRevisionAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/postrevisions/postrevision",
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
exports.viewRevisionAction = viewRevisionAction;
