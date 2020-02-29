const jwt = require("jsonwebtoken")
const User = require("../models/accounts")

const auth = async (req, res, next) => {
  try {
    let token
    try {
      token = req.header("Authorization").replace("Bearer ", "")
    } catch (e) {
      token = req.cookies.Authorization.replace("Bearer ", "")
    }
    let decoded
    try {
      decoded = jwt.verify(token, "normalUser")
    } catch (e) {
      decoded =  jwt.verify(token, "admin")
    }
    const user = await User.findOne({ _id: decoded._id, "tokens.token": token })
    if (!user) {
      throw new Error()
    }
    req.token = token
    req.user = user
    next()
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." })
  }
}

module.exports = auth
