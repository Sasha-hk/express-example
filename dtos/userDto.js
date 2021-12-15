class UserDto {
    id 
    email 

    constructor(model) {
        this.id = model.id 
        this.email = model.email
    }
}


module.exports = UserDto 
