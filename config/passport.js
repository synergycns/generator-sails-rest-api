
var _ = require('lodash');
var _super = require('sails-auth/config/passport');

_.merge(exports, _super);
_.merge(exports, {

  // Extend with custom logic here by adding additional fields, methods, etc.

  /**
   * For example:
   *
   * foo: function (bar) {
   *   bar.x = 1;
   *   bar.y = 2;
   *   return _super.foo(bar);
   * }
   */
  jwt: {
    strategy: require('passport-jwt').Strategy,
    secretOrKey: "8a173f38359c26e9b31571ee9708bebd01692c0cfa8bb1c232fd4a264eb7965d",
    tokenBodyField: 'access_token',
    tokenQueryParameterName: 'access_token',
    authScheme: 'Bearer',
    session: false,
    passReqToCallback: true
  }
});
