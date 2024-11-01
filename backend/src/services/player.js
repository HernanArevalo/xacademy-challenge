const playerProvider = require('../providers/playerProvider');

const getPlayer = async(genre, id) => {
  return await playerProvider.getPlayer(id, genre)
};

const getPlayers = async(genre, page, limit) => {
  return await playerProvider.getPlayers(genre, page, limit)
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

module.exports = { getPlayer, getPlayers, createPlayer, updatePlayer, deletePlayer };
