var config = require("../../shared/config");
var frame = require("ui/frame");
var drawer;

function loaded(args) {
	var page = args.object;
	var wpclient = config.authorize();
	var params = [];
	drawer = page.getViewById("drawer");

	wpclient.get({
	    routeParams: {
	        resource: "/wp-json/wp/v2/taxonomies"
	    }
	});

	wpclient.success(function(response) {
		var taxonomiesPlain = response.getJSON();
		var taxonomies = [];

		for (var key in taxonomiesPlain) {
		    if (!taxonomiesPlain.hasOwnProperty(key)) continue;
		    var obj = taxonomiesPlain[key];
		    taxonomies.push(obj);
		}
		page.bindingContext = {data:taxonomies};
	});

}



function viewTaxonomyAction(args) {
	var topmost = frame.topmost();
	var navigationEntry = {
		moduleName: "views/taxonomies/taxonomy",
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
exports.viewTaxonomyAction = viewTaxonomyAction;