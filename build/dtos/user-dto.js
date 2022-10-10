"use strict";
module.exports = /** @class */ (function () {
    function UserDto(model) {
        this.email = model.email;
        this.id = model._id;
        this.isActivated = model.isActivated;
    }
    return UserDto;
}());
