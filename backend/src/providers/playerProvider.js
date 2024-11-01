const { FemalePlayer, MalePlayer } = require("../models");

const createPlayer = async (userOptions)=>{
  try{
    const newUser = await Player.create(userOptions);
    return newUser;
  }catch (error){
    throw new Error(error);
  }
};

const getPlayer = async(id, genre) => {
  try{
    let user;
    if (genre == 'female') {
      user = await FemalePlayer.findByPk(id);
    }else{
      user = await MalePlayer.findByPk(id);
    }
    if (user) {
      return user;
    }else{
      throw new Error(`User not found`);
    }
  }catch (error){
    throw new Error(error);
  }
};

const getPlayers = async(genre, page=1, limit=20) => {
  console.log({genre, page, limit});
  try{
    const offset= (page-1) * limit
    let users = [];
    if (genre == 'female') {
      users = await FemalePlayer.findAll({
        limit:20,
        offset: offset
      });
    }else{
      users = await MalePlayer.findAll({
        limit:20,
        offset: offset
      });
    }

    if (users) {
      return users;
    }else{
      throw new Error(`Users not found`);
    }
  }catch (error){
    throw new Error(error);
  }
};

const updateUser = async (id, userOptions)=>{
  try{
    await getUser(id)
    const res = await User.update(userOptions,
      { where: { id },
        returning: true
      },
);
    return User.findByPk(id);
  }catch (error){
    throw new Error(error);
  }
};

const deleteUser = async (id)=>{
  try{
    return await User.destroy( { where: { id } },

);
  }catch (error){
    throw new Error(error);
  }
};

module.exports = {
  createPlayer,
  getPlayer,
  getPlayers,
  updateUser,
  deleteUser
}

