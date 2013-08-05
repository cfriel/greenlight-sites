var name = "sites";
var version = "1.0";

sites = function(){};

sites.prototype = new analytics();

sites.prototype.routes =   {
    
    '/sites': function()
    {
	console.log("calling /sites route");

	return 'sites_page';
    }

};

Greenlight.Sites = sites.prototype;

console.log("loading sites package");

Greenlight.register_template(name, version, Greenlight.Sites);


