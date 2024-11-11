const { FemalePlayer, MalePlayer } = require('../models');
const { Sequelize, Op } = require('sequelize');

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

const updatePlayer = async (id, genre, playerOptions) => {
  try {
    const playerModel = genre === 'female' ? FemalePlayer : MalePlayer;

    const res = await playerModel.update(playerOptions, {
      where: { id },
      returning: true,
    });
    return playerModel.findByPk(id);
  } catch (error) {
    throw new Error(error);
  }
};
const createPlayer = async (genre, playerOptions) => {
  try {
    const playerModel = genre === 'female' ? FemalePlayer : MalePlayer;

    const newPlayer = await playerModel.create({...playerOptions});
    return newPlayer;
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
    if (filters.player_position) {
      whereClause.player_positions = {
        [Op.like]: `%${filters.player_position}%`,
      };
    }

    const playerModel = genre === 'female' ? FemalePlayer : MalePlayer;

    const { count, rows } = await playerModel.findAndCountAll({
      where: whereClause,
      order: [['fifa_version', 'DESC'], ['overall', 'DESC']],
      limit: Number(limit),
      offset: Number(offset)
    });

    return { players: rows, totalCount: count };
  } catch (error) {
    throw new Error(error);
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

module.exports = {
  createPlayer,
  updatePlayer,
  getPlayer,
  getPlayers,
  getClubs,
  getNations
};
