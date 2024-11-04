const express = require('express')
const { playerService } = require('../services')
const router = express.Router();

router.get("/:genre", async(req, res) => {
  const genre = req.params.genre;
  const { page, limit } = req.query;

  try {
    const nations = await playerService.getNations(genre)
    res.status(200).json({ok: true, nations})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
});

module.exports = router;