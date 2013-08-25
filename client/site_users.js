Template.site_users.rendered = function()
{
    var select2 = $(this.firstNode).select2({
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
				data.results.push({id: user._id, text: user.username });
			    }
			}
		    }	    
		}
	    }

	    query.callback(data);
	}
    });

    var preload_data = [];

    for(var i = 0; i < this.data.users.length; i++)
    {
	var id = this.data.users[i];
	var user = Meteor.users.findOne({_id: id});
	
	if(user)
	{
	    var text = user.username;
	    preload_data.push({id: id, text: text});
	}
    }

    select2.select2('data', preload_data);

    var update = function(data){

	var d = data;

	return function(e)
	{
	    Greenlight.log("change "+JSON.stringify({val:e.val, added:e.added, removed:e.removed}));
	    
	    if(e.added)
	    {
		var users = d.users;
		users.push(e.added.id);
		Greenlight.Sites.update({_id: d._id}, {$set: { users: users}}, function(err)
					{
					    Greenlight.log("ok");
					}
				       );
	    }
	    else if(e.removed)
	    {
		var users = d.users;
		var idx = users.indexOf(e.removed);
		users.splice(idx, 1);
		Greenlight.Sites.update({_id: d._id}, {$set: { users: users}});
	    }
	};
    }(this.data);
    
    select2.on("change", update);

};