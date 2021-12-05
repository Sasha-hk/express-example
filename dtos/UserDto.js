class UsefDto {
    id 
    email 
    isActivated

    constructor(model) {
        this.id = model._id
        this.email = model.email
        this.isActivated = model.isActivated
    }
}

export default UsefDto