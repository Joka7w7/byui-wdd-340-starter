// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const {
  classificationRules,
  checkClassificationData
} = require("../utilities/inventory-validation")

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

// Inventory management view
router.get(
  "/",
  utilities.handleErrors(invController.buildManagement)
)

// Add classification view
router.get(
  "/add-classification",
  utilities.handleErrors(invController.buildAddClassification)
)

// Process classification
router.post(
  "/add-classification",
  classificationRules(),
  checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add inventory view
router.get(
  "/add-inventory",
  utilities.handleErrors(invController.buildAddInventory)
)

// Process inventory
router.post(
  "/add-inventory",
  utilities.handleErrors(invController.addInventory)
)

module.exports = router

