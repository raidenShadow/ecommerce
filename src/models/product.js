const mongoose = require("mongoose")

const imageURLValidator = (URL) => {
  const cropped = URL.substring(URL.length - 3, URL.length)
  const allowedItems = ["jpg", "png", "gif"]
  const isThere = allowedItems.includes(cropped)
  if (isThere) {
    return true
  } else {
    return false
  }
}

const Product = mongoose.model("Product", {
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  imageURL:{
    type: String,
    required: false,
    validate(value){
      if (!imageURLValidator(value)) {
        throw new Error('The image format must be one the \'jpg\', \'png\' or \'gif\'.')
      }
    }
  },
  barcode: {
    type: Number,
    required: false,
    default: 0
  },
  category: {
    type: String,
    required: true,
    trim: true
  }
})

module.exports = Product
