
Template.sites_page.my_sites = function () 
{
    return Greenlight.Sites.find({ owner: Meteor.userId() }, {sort: {url: 1}});
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

    var template = Greenlight.Packages.findOne({_id: templateId});
    
    return template.name;
}

Template.sites_page.user = function()
{
    var self = this;
}


Template.sites_page.users = function()
{
    var self = this;

    var ret = [];
    var users = self.users;

    if(users)
    {
	for(var i = 0; i < users.length; i++)
	{
	    var user = users[i];

	    ret.push({user: user });
	}
    }

    return ret;
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
}


Template.sites_page.created = function()
{
    rendered = false;

    var title = "Sites page loaded";
    var description = "The created event of the sites page was called";
    var source = "Template.sites_page";
    var audience = "";
    var activity = new Greenlight.Activity({title:title, description:description, source:source, audience:audience});

    activity.save();

}



