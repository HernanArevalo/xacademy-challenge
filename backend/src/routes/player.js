const express = require('express')
const { playerService } = require('../services')
const router = express.Router();
const { authenticateToken } = require('../middleware')

router.get("/:genre", authenticateToken, async(req, res) => {
  const genre = req.params.genre;
  const { page, limit, ...rest } = req.query;
  
  try {
    const { players, totalCount } = await playerService.getPlayers(genre, page, limit, rest)
    res.status(200).json({ok: true, players, totalCount})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }

});

router.get("/:genre/:player_id", authenticateToken, async(req, res) => {
  const {genre, player_id} = req.params;

  try {
    const player = await playerService.getPlayer(genre, player_id)
    res.status(200).json({ok: true, player})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
});

router.put("/:genre/:player_id", authenticateToken, async(req, res)=>{
  const playerId = req.params.player_id;
  const genre = req.params.genre;
  const playerOptions = req.body;

  try {
    const updatedPlayer = await playerService.updatePlayer(playerId, genre, playerOptions)

    res.status(200).json({ok: true, updatedPlayer})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
})
router.post("/:genre/create", authenticateToken, async(req, res)=>{
  const genre = req.params.genre;
  const playerOptions = req.body;

  try {
    const createdPlayer = await playerService.createPlayer(genre, playerOptions)

    res.status(200).json({ok: true, createdPlayer})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
})

module.exports = router;
