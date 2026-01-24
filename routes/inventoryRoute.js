// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")

// Route to build inventory by classification view
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// 🔹 NEW: Route to build inventory detail view
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildByInventoryId)
)

// 🔹 NEW: Route to trigger an intentional error
router.get(
  "/error",
  utilities.handleErrors(invController.triggerError)
)


module.exports = router
