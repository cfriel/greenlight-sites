Template.sites_page.my_sites = function () 
{
    return Greenlight.Sites.find({ owner: Meteor.userId() }, {sort: {name: 1}});
};

Template.sites_page.shared_sites = function () 
{
    return Greenlight.Sites.find({ users: {$in : [ Meteor.userId()] }}, {sort: {name: 1}});
};

Template.sites_page.site_templates = function()
{
    var self = this;

    return self.templates;
}

Template.sites_page.owner = function()
{
    var self = this;
    var ownerId = self.owner;

    var owner = Meteor.users.findOne({_id: ownerId});
    
    return owner.username;
}

Template.sites_page.template = function()
{
    var self = this;
    var templateId = self.template;

    var template = SiteTemplates.findOne({_id: templateId});
    
    return template.name;
}

Template.sites_page.user = function()
{
    var self = this;

    // var user = Meteor.users.find({_id: Meteor.Collection.ObjectID(self.valueOf())});

    // return "";
}


Template.sites_page.users = function()
{
    var self = this;

    return self.users;
}

var valuesSearch = function(hash, search)
{
    var keys = Object.keys(hash);

    for(var i = 0; i < keys.length; i++)
    {
	var key = keys[i];
	var value = hash[key];

	if(value && typeof(value) == "string")
	{
	    if(value.toUpperCase().indexOf(search.toUpperCase()) >= 0)
	    {
		return value;
	    }
	}
	else if(value && typeof(value) == "object")
	{
	    var findInChild = valuesSearch(value, search)
	    
	    if(findInChild)
	    {
		return findInChild;
	    }
	}
    }

    return null;
}

Template.sites_page.rendered = function() 
{
    var select2 = $("#s").select2({
        minimumInputLength: 1,
	multiple: true,
	
        query: function (query) {	    
	    var data = {results: []}, i, j, s;
	    
	    var sites = Greenlight.Sites.find({ owner: Meteor.userId() }).fetch();
	    
 	    for(var i = 0; i < sites.length; i++)
	    {
		var url = sites[i].url;
		var site = sites[i];
		
		var templateId = sites[i].template;
		var userIds = sites[i].users;
		
		var template = SiteTemplates.findOne({ _id : templateId});
		var users = Meteor.users.find({ _id : { $in : userIds}}).fetch();
		
		var resSite = valuesSearch(site, query.term);
		
		if(resSite)
		{
		    data.results.push({id: site._id, text: resSite });
		}
		
		var resTemplate = valuesSearch(template, query.term);
		
		if(resTemplate)
		{
		    data.results.push({id: site._id, text: resTemplate });
		}

		var resUsers = valuesSearch(users, query.term);
		
		if(resUsers)
		{
		    data.results.push({id: site._id, text: resUsers });
		}
		
	    }
	    
	    query.callback(data);
	    
	}
    });

    $('#s').on("change", function(e) { 
	console.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
    });

}

Template.sites_page.created = function()
{
    rendered = false;

    var title = "Sites page loaded";
    var description = "The created event of the sites page was called";
    var source = "Template.sites_page";
    var audience = "";
    var activity = new Greenlight.Activity(title, description, source, audience);

    activity.save();

}



