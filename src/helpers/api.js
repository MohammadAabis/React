import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:3009",
});

const HomeApi = async (dataArg) => {
  const res = await client.post("/customer/get_customer", {
    email: "test email",
    first_name: "test name",
  });
  console.log("in api...");
  return res;
};

const addCustomerApi = async (dataArg) => {
  const res = await client.post("/customer/add_customer", dataArg);

  return res;
};
const getOrders = async (dataArg) => {
  const res = await client.post("/customer/get_orders", dataArg);
  return res;
};

const addJson = async (dataArg) => {
  const res = await client.post("/customer/add_json", dataArg);
  return res;
};

const addImage = async (dataArg) => {
  const res = await client.post("/customer/add_image", dataArg, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res;
};

export { HomeApi, addCustomerApi, getOrders, addJson, addImage };
