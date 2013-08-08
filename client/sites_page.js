Template.sites_page.my_sites = function () 
{
    return Sites.find({ owner: Meteor.userId() }, {sort: {name: 1}});
};

Template.sites_page.shared_sites = function () 
{
    return Sites.find({ users: {$in : [ Meteor.userId()] }}, {sort: {name: 1}});
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

Template.sites_page.rendered = function() 
{
    	var select2 = $(".u").select2({
            minimumInputLength: 1,
	    multiple: true,
	    
            query: function (query) {	    
		var data = {results: []}, i, j, s;

		var users = Meteor.users.find().fetch();

		for(var i = 0; i < users.length; i++)
		{
		    var emails = users[i].emails;
		    var user = users[i];

		    for(var j = 0; j < emails.length; j++)
		    {   
			var email = emails[j];
			var keys = Object.keys(email);
			
			for(var k = 0; k < keys.length; k++)
			{
			    var key = keys[k];
			    var item = email[key];

			    if(item && typeof(item) == "string")
			    {
				if(query.term.length == 0 || item.toUpperCase().indexOf(query.term.toUpperCase()) >= 0 ){
				    data.results.push({id: user._id, text: email.address });
				}
			    }
			}	    
		    }
		}

		query.callback(data);
	    }
	});

}


