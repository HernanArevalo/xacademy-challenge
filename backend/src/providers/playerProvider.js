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

const getPlayers = async (genre, page = 1, limit = 20, filters) => {
  console.log({genre, page, limit, filters});
  const offset = (page - 1) * limit;
  try {
    let whereClause = {};

    if (filters.club_name) {
      whereClause.club_name = filters.club_name;
    }
    if (filters.nationality_name) {
      whereClause.nationality_name = filters.nationality_name;
    }
    if (filters.fifa_version) {
      whereClause.fifa_version = filters.fifa_version;
    }
    if (filters.player_positions) {
      whereClause.player_positions = {
        [Op.like]: `%${filters.player_positions}%`
      };
    }

    let players;
    const playerModel = genre === 'female' ? FemalePlayer : MalePlayer;

    players = await playerModel.findAll({
      where: whereClause,
      order: [
        ['fifa_version', 'DESC'],
        ['overall', 'DESC']
      ],
      limit: Number(limit),
      offset: Number(offset)
    });

    if (players) {
      return players;
    } else {
      throw new Error('Players not found');
    }
  } catch (error) {
    throw new Error(error);
  }
};
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

