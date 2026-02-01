const invModel = require("../models/inventory-model")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

/* ***************************
 *  Build inventory detail view
 * ************************** */
invCont.buildByInventoryId = async function (req, res, next) {
  const inv_id = req.params.inv_id
  const data = await invModel.getInventoryByInventoryId(inv_id)
  const vehicleHTML = await utilities.buildInventoryDetail(data)
  let nav = await utilities.getNav()

  res.render("./inventory/detail", {
    title: `${data.inv_make} ${data.inv_model}`,
    nav,
    vehicleHTML,
  })
}

/* ***************************
 * Build inventory management view
 * ************************** */
invCont.buildManagement = async function (req, res) {
  const classifications = await invModel.getClassifications()

  res.render("inventory/management", {
    title: "Inventory Management",
    nav: await utilities.getNav(),
    classifications: classifications.rows
  })
}

/* ***************************
 * Build add classification view
 * ************************** */
invCont.buildAddClassification = async function (req, res) {
  res.render("inventory/add-classification", {
    title: "Add Classification",
    nav: await utilities.getNav(),
    errors: null
  })
}

/* ***************************
 * Process add classification
 * ************************** */
invCont.addClassification = async function (req, res) {
  const { classification_name } = req.body
  const result = await invModel.addClassification(classification_name)

  if (result) {
    req.flash("notice", "Classification added successfully.")
    res.redirect("/inv/")
  } else {
    res.render("inventory/add-classification", {
      title: "Add Classification",
      nav: await utilities.getNav(),
      errors: [{ msg: "Failed to add classification." }]
    })
  }
}

/* ***************************
 * Build add inventory view
 * ************************** */
invCont.buildAddInventory = async function (req, res) {
  const classifications = await invModel.getClassifications()

  res.render("inventory/add-inventory", {
    title: "Add Inventory",
    nav: await utilities.getNav(),
    classifications: classifications.rows,
    errors: null,
    
    classification_id: "",
    inv_make: "",
    inv_model: "",
    inv_year: "",
    inv_description: "",
    inv_image: "",
    inv_thumbnail: "",
    inv_price: "",
    inv_miles: "",
    inv_color: ""
  })
}

/* ***************************
 * Process add inventory
 * ************************** */
invCont.addInventory = async function (req, res) {
  const result = await invModel.addInventory(req.body)

  if (result) {
    req.flash("notice", "Inventory item added successfully.")
    res.redirect("/inv/")
  } else {
    const classifications = await invModel.getClassifications()
    res.render("inventory/add-inventory", {
      title: "Add Inventory",
      nav: await utilities.getNav(),
      classifications: classifications.rows,
      errors: [{ msg: "Failed to add inventory item." }],
      ...req.body,
    })
  }
}

module.exports = invCont