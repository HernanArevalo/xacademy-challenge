const express = require('express')
const { playerService } = require('../services');
const { authenticateToken } = require('../middleware');
const router = express.Router();

router.get("/:genre", authenticateToken, async(req, res) => {
  const genre = req.params.genre;
  const { page, limit } = req.query;

  try {
    const clubs = await playerService.getClubs(genre)
    res.status(200).json({ok: true, clubs})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
});

module.exports = router;