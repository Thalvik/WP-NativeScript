var config = require("../../shared/config");
var view = require("ui/core/view");
var drawer;


function loaded(args) {
	var page = args.object;
	drawer = page.getViewById("drawer");
}

function toggleDrawer() {
  drawer.toggleDrawerState();
};

exports.navigate = config.navigate;
exports.toggleDrawer = toggleDrawer;
exports.loaded = loaded;