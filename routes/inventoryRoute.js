// Needed Resources
const express = require("express")
const router = new express.Router()
const invController = require("../controllers/invController")
const utilities = require("../utilities")
const inventoryValidate = require("../utilities/inventory-validation")

/* =========================
   PUBLIC ROUTES (NO LOGIN)
========================= */

// Inventory by classification
router.get(
  "/type/:classificationId",
  utilities.handleErrors(invController.buildByClassificationId)
)

// Inventory detail view
router.get(
  "/detail/:inv_id",
  utilities.handleErrors(invController.buildByInventoryId)
)

// Inventory JSON (used by management page JS)
router.get(
  "/getInventory/:classification_id",
  utilities.handleErrors(invController.getInventoryJSON)
)

/* =========================
   PROTECTED ROUTES
   Employee / Admin ONLY
========================= */

// Inventory management view
router.get(
  "/",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildManagement)
)

// Build edit inventory view
router.get(
  "/edit/:inv_id",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.editInventoryView)
)

// Process inventory update
router.post(
  "/update",
  utilities.checkEmployeeOrAdmin,
  inventoryValidate.inventoryRules(),
  inventoryValidate.checkUpdateData,
  utilities.handleErrors(invController.updateInventory)
)

// Build delete confirmation view
router.get(
  "/delete/:inv_id",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.deleteInventoryView)
)

// Process delete inventory item
router.post(
  "/delete",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.deleteInventory)
)

// Add classification view
router.get(
  "/add-classification",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildAddClassification)
)

// Process classification
router.post(
  "/add-classification",
  utilities.checkEmployeeOrAdmin,
  inventoryValidate.classificationRules(),
  inventoryValidate.checkClassificationData,
  utilities.handleErrors(invController.addClassification)
)

// Add inventory view
router.get(
  "/add-inventory",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.buildAddInventory)
)

// Process inventory
router.post(
  "/add-inventory",
  utilities.checkEmployeeOrAdmin,
  utilities.handleErrors(invController.addInventory)
)

module.exports = router


