//const { Time, connect } = require("mssql");

const connection = require("../dbConfig").pool;
const getCustomerMod = async (req, res) => {
  if (!req.body) return;

  try {
    const result = await connection.query(`select * from tbl_student`);
    return result.rows;
  } catch (e) {
    return { status: "Fail", message: e.message };
  }
};

const addCustomerMod = async (req, res) => {
  if (!req.body) return;

  let keysBill = "";
  let valuesBill = "";
  let keysShip = "";
  let valuesShip = "";
  for (const key in req.body.customer) {
    if (key.includes("billing")) {
      if (keysBill.length) keysBill += `,`;
      if (valuesBill.length) valuesBill += `,`;
      keysBill += key;
      valuesBill += `'${req.body.customer[key]}'`;
    } else if (key.includes("shipping")) {
      if (keysShip.length) keysShip += `,`;
      if (valuesShip.length) valuesShip += `,`;
      keysShip += key;
      valuesShip += `'${req.body.customer[key]}'`;
    }
  }

  const userCheck = await connection.query(
    `select email_billing from customer WHERE email_billing='${req.body.customer.email_billing}'`
  );

  if (
    req.body.customer.phone_billing.length > 11 &&
    req.body.customer.phone_billing.length < 10
  )
    return { status: "Fail,", message: "Phone Number is not correct!" };

  if (userCheck.rows.length > 0) {
    return { status: "Fail", message: "User is already registered" };
  }
  try {
    if (userCheck.rows.length == 0) {
      const resultCust = await connection.query(
        `insert into customer(${keysBill})  values(${valuesBill}) `
      );

      const new_id = await connection.query(
        `SELECT max(customer_id) as customer_id FROM customer `
      );
      const customer_id = new_id.rows[0].customer_id;

      const resultShip = await connection.query(
        `insert into tbl_shipping(${keysShip}, customer_id)  values(${valuesShip}, ${customer_id}) `
      );

      return {
        customer_id: customer_id,
      };
    }

    return { status: "Fail", message: "User insert not successful" };
  } catch (e) {
    return { status: "Fail", message: e.message };
  }
};

const addOrdersMod = async (req, res, customer_id) => {
  if (!req.body || !req.body.orders || !customer_id) return;
  let payment = req.body.customer.payment;
  const getDateTime = new Date();
  var dd = String(getDateTime.getDate()).padStart(2, "0");
  var mm = String(getDateTime.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = getDateTime.getFullYear();
  date = mm + "-" + dd + "-" + yyyy;

  var hours = String(getDateTime.getHours()).padStart(2, "0");
  var mnts = String(getDateTime.getMinutes()).padStart(2, "0");
  var sec = String(getDateTime.getSeconds()).padStart(2, "0");
  let time = hours + ":" + mnts + ":" + sec;

  let dateTime = `${date} ${time}`;

  try {
    const result = await connection.query(
      `insert into orders(customer_id,payment_type,date,status)  
      values(${customer_id}, '${payment}','${dateTime}','Pending') `
    );

    const orderid = await connection.query(
      `SELECT max(order_id) as order_id FROM orders `
    );
    let order_id = orderid.rows[0].order_id;

    for (let i = 0; i < req.body.orders.length; i++) {
      const item = req.body.orders[i];
      const result = await connection.query(
        `insert into order_item(product_id,order_id,qty,price,status,date,item_name)  
        values(${item.id},${order_id}, '${item.qty}', ${item.price},'Pending','${dateTime}','${item.title}') `
      );
    }
    console.log("order modal success");

    return {
      status: "Success",
      message: "Order has been placed.",
      order_id: order_id,
    };
  } catch (e) {
    return { status: "Fail", message: e.message };
  }
};
const getOrdersMod = async (req, res) => {
  if (!req.body.order_id) return;

  try {
    const result_item = await connection.query(
      `Select * from order_item where order_id=${req.body.order_id}`
    );
    const result_order = await connection.query(
      `Select * from orders where order_id=${req.body.order_id}`
    );

    let data = { order_detail: result_order.rows[0], items: result_item.rows };
    return data;
  } catch (e) {
    return { status: "Fail", message: e.message };
  }
};

const addJsonMod = async (req, res) => {
  if (!req.body.json) return;
  let params = [req.body.json];
  console.log(params);
  try {
    /*const result_item = await connection.query(
      "Insert into tbl_bids(data) values($1)",
      params
    );*/

    const result = await connection.query(
      "SELECT data->'dependents' as dependents from tbl_bids where data->'dependents'!='null'"
    );
    return { status: "Success", message: result.rows };
  } catch (e) {
    return { status: "Fail", message: e.message };
  }
};

module.exports = {
  getCustomerMod,
  addCustomerMod,
  addOrdersMod,
  getOrdersMod,
  addJsonMod,
};
