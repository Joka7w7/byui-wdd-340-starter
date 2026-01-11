const express = require("express")
const router = express.Router()
const path = require("path")

// Absolute path to /public
const publicPath = path.join(__dirname, "..", "public")

router.use(express.static(publicPath))

module.exports = router
console.log("Serving static from:", publicPath)

