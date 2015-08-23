var ciphers = require('sails-service-cipher');

module.exports = {
  jwt: ciphers.create('jwt', {secretKey: "8a173f38359c26e9b31571ee9708bebd01692c0cfa8bb1c232fd4a264eb7965d"})
};
