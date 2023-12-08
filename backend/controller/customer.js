const {
  getCustomerMod,
  addCustomerMod,
  addOrdersMod,
  getOrdersMod,
  addJsonMod,
} = require("../modal/customer");

const getCustomer = async (req, res) => {
  if (!req.body) {
    return;
  }
  const result = {
    status: "Success",
    message: "",
  };

  if (req.body.email && req.body.first_name) {
    const data = await getCustomerMod(req, res);
    if (data.status && data.status === "Fail") {
      result.status = "Fail";
      result.message = data.message;
      return res.json(result);
    } else {
      return res.json(data);
    }
  }
};

const addCustomer = async (req, res) => {
  if (
    !req.body ||
    !req.body.customer ||
    !req.body.orders ||
    !req.body.orders.length
  ) {
    return;
  }

  let result = {
    status: "Fail",
    message: "Could not perform operation.",
  };
  if (req.body.customer) {
    let cust = await addCustomerMod(req, res);
    if (cust.status && cust.status == "Fail") {
      return res.json(cust);
    }

    if (cust.customer_id && !isNaN(cust.customer_id)) {
      result = await addOrdersMod(req, res, cust.customer_id);
    }
    return res.json(result);
  }

  return res.json(result);
};

const getOrders = async (req, res) => {
  if (!req.body.order_id) return;

  let orders = await getOrdersMod(req, res);
  return res.json(orders);
};

const addJson = async (req, res) => {
  if (!req.body.json) return;

  let orders = await addJsonMod(req, res);
  return res.json(orders);
};

const addImage = async (req, res) => {
  console.log(req.body);
  console.log("in contriller");
  res.status(200).send({ message: "File Upload test", code: 200 });
};

module.exports = { getCustomer, addCustomer, getOrders, addJson, addImage };
