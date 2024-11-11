const userProvider = require('../providers/userProvider');

const loginUser = async({email, password}) => {
  return await userProvider.loginUser({email, password})
};

const registerUser = async(user) => {
  return await userProvider.registerUser(user)
};

const updateUser = async(id, user) => {
  return await userProvider.updateUser(id, user)
};

const deleteUser = async(id) => {
  return await userProvider.deleteUser(id)
}

module.exports = { loginUser, registerUser, updateUser, deleteUser };
