"use strict";
exports.__esModule = true;
var dataBase_1 = require("./dataBase");
var USER_NOT_FOUND = 'User not found';
var User = /** @class */ (function () {
    function User() {
        this._userList = dataBase_1.users;
    }
    // 1. Encontrar um usuário pelo nome;
    User.prototype.findByName = function (name) {
        return this._userList.find(function (user) { return user.name === name; }) || USER_NOT_FOUND;
    };
    // 2. Encontrar um usuário pelo valor de uma propriedade qualquer;
    // Dica: a assinatura do método é findUserByPropValue(users, prop, value)
    User.prototype.findUserByPropValue = function (prop, value) {
        return this._userList.find(function (user) { return user[prop] === value; }) || USER_NOT_FOUND;
    };
    return User;
}());
var service = new User();
console.log(service.findByName('josé da silva')); // Req 01
console.log(service.findUserByPropValue('city', 'Rio de Janeiro'));
