const Model = require('./model');


function addUser({ name, password, phone, address, email }) {
    if (!name || !password){
        return Promise.reject('Ingrese su nombre y contraseña');
    }
        const user = {
            name,
            password,
            contact: {
                email,
                address, 
                phone, 

            }
        }

    const myUser = new Model(user);
    return myUser.save();
}


async function getUsers(params){
    const user = await Model.find(params);
    return user;
}

async function getContactUser(params){
    const user = await Model.find(params).select("contact");
    return user;
}

module.exports = {
    addUser,
    getUsers,
    getContactUser
}