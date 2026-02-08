// Needed Resources
const express = require("express")
const router = new express.Router()
const utilities = require("../utilities")
const accountController = require("../controllers/accountController")
const regValidate = require("../utilities/account-validation")

router.get(
  "/",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountManagement)
)

// Deliver account update view
router.get(
  "/update/:account_id",
  utilities.checkLogin,
  utilities.handleErrors(accountController.buildAccountUpdate)
)

// Process account update
router.post(
  "/update",
  utilities.checkLogin,
  regValidate.accountUpdateRules(),
  regValidate.checkAccountUpdateData,
  utilities.handleErrors(accountController.updateAccount)
)

// Process password change
router.post(
  "/update-password",
  utilities.checkLogin,
  regValidate.passwordRules(),
  regValidate.checkPasswordData,
  utilities.handleErrors(accountController.updatePassword)
)

// Route to build login view
router.get(
  "/login",
  utilities.handleErrors(accountController.buildLogin)
)

// Route to build registration view
router.get(
  "/register",
  utilities.handleErrors(accountController.buildRegister)
)

// Process the registration data
router.post(
  "/register",
  regValidate.registationRules(),
  regValidate.checkRegData,
  utilities.handleErrors(accountController.registerAccount)
)

// Process the login attempt
router.post(
  "/login",
  regValidate.loginRules(),
  regValidate.checkLoginData,
  utilities.handleErrors(accountController.accountLogin)
)

// Logout route
router.get(
  "/logout",
  utilities.handleErrors(accountController.accountLogout)
)


module.exports = router
