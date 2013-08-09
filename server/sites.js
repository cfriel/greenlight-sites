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

sites.prototype.metadata = function()
{
    
    return {
	description : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a purus quis ligula varius aliquam id sit amet lacus. Ut quam tellus, aliquet vitae tortor blandit, rhoncus semper arcu. Suspendisse pretium dolor arcu, et semper ante aliquam non. In nec quam cursus, congue felis vitae, consectetur ipsum. Nullam nisl turpis, tempor vitae felis eleifend, fringilla pretium turpis. Aliquam egestas nibh tortor, eu iaculis nibh tincidunt sit amet. Aliquam auctor erat non tellus adipiscing fringilla. In porttitor mattis eros, et dictum nulla blandit non. Cras viverra velit vel turpis imperdiet commodo. Maecenas non leo at leo feugiat aliquam. Fusce semper molestie ligula, et cursus sapien volutpat non. Vivamus leo felis, cursus ut nunc et, porttitor facilisis orci. Donec vehicula vehicula ligula, vel rhoncus velit lobortis non."
    };
}();


Greenlight.Sites = sites.prototype;

Meteor.startup(function(){
    
    console.log("loading sites package");

    Greenlight.register_template(name, version, Greenlight.Sites);
        
});