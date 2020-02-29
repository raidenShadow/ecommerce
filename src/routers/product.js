//Setups
const express = require("express")
require("../db/database")
const Product = require("../models/product")
const router = new express.Router()
const auth = require("../middleware/auth")
const authCritical = require("../middleware/authCritical")
//APIs
//Show all
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find({})
    res.status(202).send(products)
  } catch (e) {
    res.status(500).send(e)
  }
})
//Search for specified product
router.get("/products", async (req, res) => {
  try {
    if (req.query.name) {
      const searchInput = req.query.name
      if (searchInput) {
        const searchResult = await Product.findOne({ name: new RegExp(`^${searchInput}$`, 'i') })
        if (!searchResult) {
          return res.status(404).send({ error: "Not Found!"})
        }
        res.status(202).send(searchResult)
      }
    }
    if (req.query.price) {
      const searchInput = req.query.price
      if (searchInput) {
        const searchResult = await Product.findOne({ price: searchInput})
        if (!searchResult) {
          return res.status(404).send({ error: "Not Found!"})
        }
        res.status(202).send(searchResult)
      }
    }
    res.status(400).send({ error: "Didn't request correctly!"})
  } catch (e) {
    res.status(500).send(e)
  }
})
//Insert a product
router.post("/products/new", authCritical, async (req, res) => {
  try {
    const creating = new Product(req.body)
    await creating.save()
    res.status(201).send({ result: "Product created successfully!"})
  } catch (e) {
    res.status(400).send(e)
  }
})
//Update
router.patch("/product/change", authCritical, async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ["name", "price", "amount", "imageURL", "barcode"]
  const isValid = updates.every((update) => {
    return allowedUpdates.includes(update)
  })
  if (!isValid) {
    return res.status(400).send({ error: "Invalid entries!"})
  }
  try {
    const specifiedProduct = await Product.findByIdAndUpdate(req.query.id, req.body, { new: true, runValidators: true})
    if (!specifiedProduct) {
      return res.status(404).send("Not found!")
    }
    res.status(202).send(specifiedProduct)
  } catch (e) {
    res.status(500).send(e)
  }
})
//Delete a document
router.delete("/product/remove", authCritical, async (req, res) => {
  try {
    const deleteADocument = await Product.findByIdAndDelete(req.query.id)
    if (!deleteADocument) {
      return res.status(404).send("Not Found!")
    }
    res.status(202).send("Task completed successfully!")
  } catch (e) {
    res.status(500).send(e)
  }
})

//Export the APIs
module.exports = router
