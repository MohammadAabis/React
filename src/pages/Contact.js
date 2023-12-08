import React from "react";
import { addJson } from "../helpers/api";

const Contact = () => {
  const addData = () => {
    let dataArr = [
      {
        name: "Ahmed",
        registration: "112",
        email: "a@gmail.com",
      },
      {
        name: "AlAhmedi",
        registration: "223",
        email: "ahmed@gmail.com",
      },
      {
        name: "Abis",
        registration: "445",
        email: "abis@gmail.com",
      },
    ];

    let data2 = dataArr;

    let data = {
      name: "Mohd",
      registration: "12535",
      email: "mohd@gmail.com",
      dependents: data2,
    };
    data = { json: data };

    addJson(data).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      <div>
        <button onClick={addData}>Add JSON</button>
      </div>
    </>
  );
};

export default Contact;
