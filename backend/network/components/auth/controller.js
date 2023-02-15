const Model = require('./model');


function addUser({ name, password }) {
    if (!name || !password){
        return Promise.reject('Ingrese su nombre y contraseña');
    }
        const user = {
            name,
            password
        }

    
    const myUser = new Model(user);
    return myUser.save();
}


async function getUsers(params){
    const user = await Model.find(params);
    return user;
}

module.exports = {
    addUser,
    getUsers,
}