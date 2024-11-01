const express = require('express')
const { playerService } = require('../services')
const router = express.Router();

router.get("/:genre", async(req, res) => {
  const genre = req.params.genre;
  const { page, limit } = req.query;

  try {
    const players = await playerService.getPlayers(genre, page, limit)
    res.status(200).json({ok: true, players})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
});

router.get("/:genre/:id", async(req, res) => {
  const {genre, id} = req.params;

  try {
    const players = await playerService.getPlayer(genre, id)
    res.status(200).json({ok: true, players})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
});

module.exports = router;