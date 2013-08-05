var name = "sites";
var version = "1.0";

sites = function(){};

sites.prototype = new sites();

// sites.prototype.routes =   {
    
//     // cfriel - to enable server-side rendering
//     // '/sites': function()
//     // {
//     // 	console.log("calling /sites route");

//     // 	return 'sites_page';
//     // }
    
// };

Greenlight.Sites = sites.prototype;

Meteor.startup(function(){
    
    console.log("loading sites package");

    Greenlight.register_template(name, version, Greenlight.Sites);
        
});