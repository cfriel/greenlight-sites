var name = "sites";
var version = "1.0";

sites = function(){};

sites.prototype = new Greenlight.Package();

sites.prototype.routes =   {
    
    '/sites': function()
    {
	Greenlight.log("calling /sites route");

	return 'sites_page';
    }

};

Greenlight.Packages.Sites = sites.prototype;

Meteor.startup(function(){

    Greenlight.log("loading sites package");
    
    Greenlight.register_package(name, version, Greenlight.Packages.Sites);

});

