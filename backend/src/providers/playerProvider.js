const { FemalePlayer, MalePlayer } = require('../models');
const { Sequelize, where, Op } = require('sequelize');

const createPlayer = async (userOptions) => {
  try {
    const newUser = await Player.create(userOptions);
    return newUser;
  } catch (error) {
    throw new Error(error);
  }
};

const getPlayer = async (genre, player_id) => {
  try {
    let user;
    const model = genre === 'female' ? FemalePlayer : MalePlayer;

    user = await model.findOne({
      where: {
        id: player_id,
      },
    });

    if (user) {
      return user;
    } else {
      throw new Error(`User not found`);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const getPlayers = async (genre, page = 1, limit = 20, filters) => {
  const offset = (page - 1) * limit;

  try {
    const whereClause = {};

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
        [Op.like]: `%${filters.player_positions}%`,
      };
    }

    const playerModel = genre === 'female' ? FemalePlayer : MalePlayer;

    const players = await playerModel.findAll({
      where: whereClause,
      order: [
        ['fifa_version', 'DESC'],
        ['overall', 'DESC'],
      ],
      limit: Number(limit),
      offset: Number(offset),
    });

    if (!players.length) {
      throw new Error('Players not found');
    }

    return players;
  } catch (error) {
    console.error('Error in getPlayers:', error.message);
    throw new Error('Error retrieving players');
  }
};

const getClubs = async (genre) => {
  try {
    let clubs = [];

    if (genre === 'female') {
      clubs = await FemalePlayer.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('club_name')), 'club_name'],
        ],
        raw: true,
      });
    } else {
      clubs = await MalePlayer.findAll({
        attributes: [
          [Sequelize.fn('DISTINCT', Sequelize.col('club_name')), 'club_name'],
        ],
        raw: true,
      });
    }

    return clubs
      .map((club) => club.club_name)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error('Error fetching unique club names:', error);
    throw new Error(error);
  }
};
const getNations = async (genre) => {
  try {
    let nations = [];

    if (genre === 'female') {
      nations = await FemalePlayer.findAll({
        attributes: [
          [
            Sequelize.fn('DISTINCT', Sequelize.col('nationality_name')),
            'nationality_name',
          ],
        ],
        raw: true,
      });
    } else {
      nations = await MalePlayer.findAll({
        attributes: [
          [
            Sequelize.fn('DISTINCT', Sequelize.col('nationality_name')),
            'nationality_name',
          ],
        ],
        raw: true,
      });
    }

    return nations
      .map((nation) => nation.nationality_name)
      .sort((a, b) => a.localeCompare(b));
  } catch (error) {
    console.error('Error fetching unique club names:', error);
    throw new Error(error);
  }
};

const updateUser = async (id, userOptions) => {
  try {
    await getUser(id);
    const res = await User.update(userOptions, {
      where: { id },
      returning: true,
    });
    return User.findByPk(id);
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (id) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  createPlayer,
  getPlayer,
  getPlayers,
  getClubs,
  getNations,
  updateUser,
  deleteUser,
};
