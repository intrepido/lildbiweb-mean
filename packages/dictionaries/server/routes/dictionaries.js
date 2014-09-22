'use strict';

// The Package is past automatically as first parameter
module.exports = function(Dictionaries, app, auth, database) {

  app.get('/dictionaries/example/anyone', function(req, res, next) {
    res.send('Anyone can access this');
  });

  app.get('/dictionaries/example/auth', auth.requiresLogin, function(req, res, next) {
    res.send('Only authenticated users can access this');
  });

  app.get('/dictionaries/example/admin', auth.requiresAdmin, function(req, res, next) {
    res.send('Only users with Admin role can access this');
  });

  app.get('/dictionaries/example/render', function(req, res, next) {
    Dictionaries.render('index', {
      package: 'dictionaries'
    }, function(err, html) {
      //Rendering a view from the Package server/views
      res.send(html);
    });
  });
};
