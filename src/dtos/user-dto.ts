module.exports = class UserDto {
    name;
    surname;
    email;
    id;
    isAdmin;
    isActivated;
    

    constructor(model: {name: string, surname: string, email: string, _id: string, isAdmin: boolean, isActivated: boolean}) {
        this.name = model.name;
        this.surname = model.surname;
        this.email = model.email;
        this.id = model._id;
        this.isAdmin = model.isAdmin;
        this.isActivated = model.isActivated;
    }
}