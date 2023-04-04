const data = require('../data/users.json')

function getUsers(){
    return data.Users;
}

function getUserById(id){
    return data.Users.find(user => user.id === id);
}

function addUser(user){
    user.id = data.Users.length + 1;
    data.Users.push(user);
}

function updateUser(user){
    const index = data.Users.findIndex(u => u.id === user.id);
    data.Users[index] = user;
}

function deleteUser(user){
    const index = data.Users.findIndex(u => u.id === user.id);
    data.Users.splice(index, 1);
}

function searchUsers(searchTerm){
    const users = data.Users.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return users;
}

module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    searchUsers
}