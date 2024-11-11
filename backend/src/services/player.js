const playerProvider = require('../providers/playerProvider');

const getPlayer = async(genre, player_id) => {
  return await playerProvider.getPlayer(genre, player_id)
};

const getPlayers = async(genre, page, limit, filters) => {
  return await playerProvider.getPlayers(genre, page, limit, filters)
};
const getClubs = async(genre) => {
  return await playerProvider.getClubs(genre)
};
const getNations = async(genre) => {
  return await playerProvider.getNations(genre)
};
const createPlayer = async(genre, playerOptions) => {
  return await playerProvider.createPlayer(genre, playerOptions)
};

const updatePlayer = async(playerId, genre, playerOptions) => {
  return await playerProvider.updatePlayer(playerId, genre, playerOptions)
};


module.exports = { getPlayer, getPlayers, getClubs, getNations, createPlayer, updatePlayer };
