const { body, validationResult } = require("express-validator")

exports.classificationRules = () => [
  body("classification_name")
    .trim()
    .isAlphanumeric()
    .withMessage("Classification name must contain only letters and numbers."),
]

exports.checkClassificationData = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    req.flash("notice", errors.array()[0].msg)
    return res.redirect("/inv/add-classification")
  }
  next()
}

exports.inventoryRules = () => [
  body("classification_id").isInt().withMessage("Choose a classification."),
  body("inv_make").trim().notEmpty(),
  body("inv_model").trim().notEmpty(),
  body("inv_year").isLength({ min: 4, max: 4 }).isNumeric(),
  body("inv_description").trim().notEmpty(),
  body("inv_image").trim().notEmpty(),
  body("inv_thumbnail").trim().notEmpty(),
  body("inv_price").isFloat({ min: 0 }),
  body("inv_miles").isInt({ min: 0 }),
  body("inv_color").trim().notEmpty(),
]

exports.checkInventoryData = async (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const classifications = await invModel.getClassifications()
    return res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav: await utilities.getNav(),
      classifications: classifications.rows,
      errors: errors.array(),
      ...req.body, 
    })
  }
  next()
}

