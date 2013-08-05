Template.sites_page.databases = function () 
{
    return Databases.find({}, {sort: {name: 1}});
};

Template.sites_page.rendered = function() 
{
}




