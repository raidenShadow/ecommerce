//Setups
const express = require("express")
require("../db/database")
const User = require("../models/accounts")
const router = new express.Router()
const auth = require("../middleware/auth")
const authCritical = require("../middleware/authCritical")
//APIs
//Panel
//Login page
router.get("/user/login", async (req, res) => {
  try {
    res.render("login", {})
  } catch (e) {
    res.status(500).send("An error occured!")
  }
})
router.get("/user/panel", auth, async (req, res) => {
  try {
    console.log(req.cookies)
    if (req.user.isAdmin === false) {
      res.render("userPanel", {})
    } else {
      res.render("adminPanel", {})
    }
  } catch (e) {
    res.status(500).send()
  }
})
//Profile info
router.get('/user/me', auth, async (req, res) => {
  try {
    res.status(200).send(req.user)
  } catch (e) {
    res.status(500).send()
  }
})
//Sign-up
router.post("/user/register", async (req, res) => {
  try {
    let token
    const creating = new User(req.body)
    await creating.save()
    if (creating.isAdmin === false) {
      token = await creating.generateAuthToken()
    } else {
      token = await creating.generateAuthToken("admin")
    }
    res.status(201).send({ creating, token})
  } catch (e) {
    res.status(500).send(e)
  }
})
//Sign-in
router.post("/user/login", async (req, res) => {
  try {
    const account = await User.findByCredentials(req.body.username, req.body.password)
    const token = await account.generateAuthToken()
    res.cookie('Authorization', 'Bearer ' + token, {
    expires: new Date(Date.now() + 24 * 3600000) // cookie will be removed after 8 hours
  }).status(202).send({ account, token })
  } catch (e) {
    res.status(400).send(e)
  }
})
//Sign-in for admin
router.post("/user/admin", auth, async (req, res) => {
  try {
    const account = await User.findByCredentials(req.body.username, req.body.password)
    const token = await account.generateAuthToken("admin")
    res.status(202).send({ account, token})
  } catch (e) {
    res.status(400).send(e)
  }
})
//Sign-out
router.post("/user/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token
    })
    await req.user.save()

    res.status(200).send("Logged out successfully!")
  } catch (e) {
    res.status(500).send()
  }
})
//Sign-out all other sessions
router.post("/user/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token === req.token
    })
    await req.user.save()

    res.status(200).send("All other sessions have been removed successfully")
  } catch (e) {
    res.status(500).send()
  }
})
//Update self-account
router.patch("/user/me", auth, async (req, res) => {
  const updateEntries = Object.keys(req.body)
  const allowedUpdates = ["thumbnail", "email", "password", "username"]
  const isValid = updateEntries.every((entry) => {
    return allowedUpdates.includes(entry)
  })
  if (!isValid) {
    return res.status(400).send({ error: "Invalid entries!"})
  }
  try {
    const myAccount = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true})
    res.status(202).send(myAccount)
  } catch (e) {
    res.status(500).send("Something went wrong!")
  }
})
//Delete self-account
router.delete("/user/me", auth, async (req, res) => {
  try {
    await User.findOneAndDelete({ _id: req.user._id })
    res.status(202).send("Account deleted successfully!")
  } catch (e) {
    res.status(400).send()
  }
})
//Update an account (Other accounts)
router.patch("/user/change", authCritical, async (req, res) => {
  //
  const updateEntries = Object.keys(req.body[1])
  const allowedUpdates = ["isAdmin", "thumbnail", "email", "password", "username"]
  const isValid = updateEntries.every((entry) => {
    return allowedUpdates.includes(entry)
  })
  if (!isValid) {
    return res.status(400).send({ error: "Invalid entries!"})
  }
  try {
    const user = await User.findOne({ username: req.body[0].username })
    if (!user) {
      return res.status(404).send()
    }
    const specifiedAccount = await User.findByIdAndUpdate(user._id, req.body[1], { new: true, runValidators: true})
    res.status(202).send(specifiedAccount)
  } catch (e) {
    res.status(500).send("Something went wrong!")
  }
})
//Delete an account (Other accounts)
router.delete("/user/admin/delete", authCritical, async (req, res) => {
  try {
    const user = await User.findOneAndDelete({ username: req.body.username, email: req.body.email })
    if (!user) {
      return res.status(404).send()
    }
    res.status(202).send("Account deleted successfully!")
  } catch (e) {
    res.status(400).send()
  }
})

//Export the APIs
module.exports = router
