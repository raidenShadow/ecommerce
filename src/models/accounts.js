const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const validator = require("validator")
const jwt = require("jsonwebtoken")

const userSchema = new mongoose.Schema({
  nickname:{
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true,
    validate(value){
      if (value.length < 5) {
        throw new Error("The password is too short!")
      }
      if (value.toLowerCase().includes("password")) {
        throw new Error("\"password\" cannot be included in your credentials")
      }
    }
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value){
      if (!validator.isEmail(value)) {
        throw new Error("The entered input is not an email")
      }
    }
  },
  isAdmin: {
    type: Boolean,
    required: false,
    default: false
  },
  thumbnail:{
    type: String,
    required: false,
    default: "none"
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  cart: [{
    productName: {
      type: String,
      required: true
    },
    productPrice: {
      type: Number,
      required: true
    },
    thumbnail: {
      type: String,
      required: true
    },
    buyAmount: {
      type: Number,
      required: true
    }
  }]
})

userSchema.methods.toJSON = function (){
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens
  delete userObject.isAdmin

  return userObject
}

userSchema.methods.generateAuthToken = async function(secret) {
  if (!secret) {
    secret = "normalUser"
  }
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, secret, { expiresIn: "1 days" })
  user.tokens = user.tokens.concat({ token })
  await user.save()

  return token
}

userSchema.statics.findByCredentials = async (username, password) => {
  const user = await Account.findOne({ username })

  if (!user) {
    throw new Error("Unable to login")
  }

  const isMatch = await bcrypt.compare(password, user.password)

  if (!isMatch) {
    throw new Error("Unable to login")
  }

  return user
}
userSchema.statics.findByNameAndEmail = async (username, email) => {
  const user = await Account.findOne({ username, email })

  if (!user) {
    throw new Error("Unable to login")
  }

  return user
}


userSchema.pre("save", async function (next) {
  const user = this

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const Account = mongoose.model("Account", userSchema)

module.exports = Account
