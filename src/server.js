//Importing necessaries
  const express = require("express")
  const path = require("path")
  const hbs = require("hbs")
  const productRouter = require("./routers/product")
  const userRouter = require("./routers/user")
  const cookieParser = require("cookie-parser")
//Paths
  const publicPath = path.join(__dirname, '../public')
  const viewPath = path.join(__dirname, '../templates')
//Getting started
  const app = express()
  const port = process.env.PORT || 3000
  app.use(cookieParser())
  app.use(express.json())
  app.use(productRouter)
  app.use(userRouter)
  app.set('view engine', 'hbs')
  app.set('views', viewPath)
  app.use(express.static(publicPath))
//Homepage
  app.get('/', (req, res) => {
    res.render("index", {})
  })
//Starting the server on the port 3000
  app.listen(port, () => {
    console.log("Server is running on port " + port)
  })
