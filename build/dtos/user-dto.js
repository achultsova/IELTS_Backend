"use strict";
module.exports = /** @class */ (function () {
    function UserDto(model) {
        this.name = model.name;
        this.surname = model.surname;
        this.email = model.email;
        this.id = model._id;
        this.isAdmin = model.isAdmin;
        this.isActivated = model.isActivated;
    }
    return UserDto;
}());
