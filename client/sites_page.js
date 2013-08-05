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

Template.sites_page.rendered = function() 
{
}




