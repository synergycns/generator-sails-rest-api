/**
 * isAuthenticated
 * @description :: Policy that inject user in `req` via JSON Web Token
 */

var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;

/**
 * Configuration object for JWT strategy
 * @type {Object}
 * @private
 */
var JWT_STRATEGY_CONFIG = {
  secretOrKey: "76cdfcfd65705cc4422ae172dd16a24182d070979b943c4aa13aa19765513814",
  tokenBodyField: 'access_token',
  tokenQueryParameterName: 'access_token',
  authScheme: 'Bearer',
  session: false,
  passReqToCallback: true
};

/**
 * Triggers when user authenticates via JWT strategy
 * @param {Object} req Request object
 * @param {Object} payload Decoded payload from JWT
 * @param {Function} next Callback
 * @private
 */
function _onJwtStrategyAuth(req, payload, next) {
  User
    .findOne({id: payload.id})
    .then(function (user) {
      if (!user) return next(null, null, {
        code: 'E_USER_NOT_FOUND',
        message: 'User with that JWT not found'
      });

      return next(null, user, {});
    })
    .catch(next);
}

module.exports = function (req, res, next) {
  passport.use(new JwtStrategy(_.assign({}, JWT_STRATEGY_CONFIG), _onJwtStrategyAuth));
  passport.authenticate('jwt', function (error, user, info) {
    if (error) return res.serverError(error);
    if (!user) return res.unauthorized(null, info && info.code, info && info.message);

    req.user = user;

    next();
  })(req, res);
};
