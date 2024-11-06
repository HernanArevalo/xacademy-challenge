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
const createPlayer = async(player) => {
  return await playerProvider.createPlayer(player)
};

const updatePlayer = async(id, Player) => {
  return await playerProvider.updatePlayer(id, player)
};

const deletePlayer = async(id) => {
  return await playerProvider.deletePlayer(id)
}

module.exports = { getPlayer, getPlayers, getClubs, getNations, createPlayer, updatePlayer, deletePlayer };
