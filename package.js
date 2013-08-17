Package.describe({
  summary: "Greenlight sites site template"
});

Package.on_use(function (api, where) {

    api.use('router', ['client', 'server']);
    api.use(['templating'], 'client');
    api.use('deps', ['client', 'server']);
    api.use('session', ['client', 'server']);
    api.use('greenlight', ['client', 'server']);
    
    api.add_files(['client/sites_page.html', 'client/sites_page.js', 'client/sites_page.css'], 'client');
    api.add_files('client/sites.js', 'client');
    api.add_files('server/sites.js', 'server');
});

Package.on_test(function (api) {
    api.add_files('sites_tests.js', 'client');
});
