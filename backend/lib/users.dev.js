"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ObjectId = require('mongodb').ObjectID;

var UserRepo = require('../repository/users');

module.exports =
/*#__PURE__*/
function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, [{
    key: "initialize",
    value: function initialize() {
      return regeneratorRuntime.async(function initialize$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              this.userRepo = new UserRepo();

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "addUser",
    value: function addUser(data) {
      var result;
      return regeneratorRuntime.async(function addUser$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return regeneratorRuntime.awrap(this.userRepo.create(data));

            case 2:
              result = _context2.sent;
              return _context2.abrupt("return", result);

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "updateUser",
    value: function updateUser(query, data) {
      var response;
      return regeneratorRuntime.async(function updateUser$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return regeneratorRuntime.awrap(this.userRepo.updateOne(query, data));

            case 2:
              response = _context3.sent;
              return _context3.abrupt("return", response);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUser",
    value: function findUser(input, projection) {
      var result;
      return regeneratorRuntime.async(function findUser$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return regeneratorRuntime.awrap(this.userRepo.findOne(input, projection));

            case 2:
              result = _context4.sent;
              return _context4.abrupt("return", result);

            case 4:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "findUsers",
    value: function findUsers(query, projection, limit) {
      var result;
      return regeneratorRuntime.async(function findUsers$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return regeneratorRuntime.awrap(this.userRepo.find(query, projection, limit));

            case 2:
              result = _context5.sent;
              return _context5.abrupt("return", result);

            case 4:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this);
    }
  }, {
    key: "deleteUser",
    value: function deleteUser(query) {
      var result;
      return regeneratorRuntime.async(function deleteUser$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return regeneratorRuntime.awrap(this.userRepo.deleteOne(query));

            case 2:
              result = _context6.sent;
              return _context6.abrupt("return", result);

            case 4:
            case "end":
              return _context6.stop();
          }
        }
      }, null, this);
    }
  }]);

  return _class;
}();