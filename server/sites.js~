var name = "sites";
var version = "1.0";

sites = function(){};

sites.prototype = new analytics();

sites.prototype.routes =   {
    
    // cfriel - to enable server-side rendering
    // '/sites': function()
    // {
    // 	console.log("calling /sites route");

    // 	return 'sites_page';
    // }
    
};

Sites = sites.prototype;

Meteor.startup(function(){
    
    console.log("loading sites package");

    Greenlight.register_template(name, version, Sites);
        
});