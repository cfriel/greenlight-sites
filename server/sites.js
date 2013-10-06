var name = "sites";
var version = "1.0";

sites = function(){};

sites.prototype = new sites();

sites.prototype.metadata = function()
{
    
    return {
	description : "The sites package shows the sites for a given user, allowing the owner to add and remove users and groups from the access control list."
    };
}();


Greenlight.Packages.Sites = sites.prototype;

Meteor.startup(function(){
    
    Greenlight.log("loading sites package");

    Greenlight.register_package(name, version, Greenlight.Packages.Sites);
        
});