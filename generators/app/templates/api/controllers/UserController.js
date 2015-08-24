
var _ = require('lodash');
var _super = require('sails-auth/api/controllers/UserController');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  create: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return next(err);

      res.ok({
        token: CipherService.jwt.encodeSync({id: user.id}),
        user: user
      });
    });
  },
});
