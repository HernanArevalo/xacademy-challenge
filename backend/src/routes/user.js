const express = require('express')
const { userService } = require('../services');
const router = express.Router();

router.post("/login", async(req, res) => {
  const {email, password } = req.body;

  try {
    const user = await userService.loginUser({email, password})

    res.status(201).json({ok: true, user})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
})

router.post("/register", async(req,res)=> {
  const {name, email, password } = req.body;

  try {
    const user = await userService.registerUser({name, email, password })

    res.status(201).json({ok: true})
    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }
})

router.delete("/:userId", async(req, res)=>{
  const userId = req.params.userId;

  try {
    const deletedUser = await userService.deleteUser(userId)
    if (deletedUser !== 0) {
      res.status(200).json({ok: true, message:'user deleted'})
    }else{
      res.status(400).json({ok: false, message:'user not found'})
    }

    } catch (error) {
    res.status(500).json({ok: false, message: error.message})
  }})

module.exports = router;