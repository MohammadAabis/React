const express = require("express");
const router = express.Router();

const {
  getCustomer,
  addCustomer,
  getOrders,
  addJson,
  addImage,
} = require("../controller/customer");

router.post("/add_customer", addCustomer);
router.post("/get_orders", getOrders);
router.post("/add_json", addJson);
router.post("/add_image", addImage);

//route.post("/del_customer", delCustomer);

module.exports = router;
