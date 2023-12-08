import React, { useState } from "react";
// import ImageUploader from "react-images-uploading";
// import styled from "styled-components";
import { addImage } from "../helpers/api";

const Home = () => {
  const [file, setfile] = useState();
  //const [fileName, setFileName] = useState("");

  const upload = (e) => {
    e.preventDefault();

    const selectedFile = file;

    // Check if a file is selected
    if (selectedFile) {
      // Get the file extension
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();

      // Check if the file extension is allowed (e.g., 'jpg', 'png')
      const allowedExtensions = ["jpg", "jpeg", "png", "pdf"];
      if (allowedExtensions.includes(fileExtension)) {
        // File is valid, set it in the state or perform further actions
        setfile(selectedFile);

        const formData = new FormData();
        formData.append("file", file);
        //formData.append("testname", "test name");

        addImage(formData).then((res) => {
          //console.log(res.data);
        });
      } else {
        // Invalid file type, show an error message or take appropriate action
        console.error(
          "Invalid file type. Allowed types:",
          allowedExtensions.join(", ")
        );
      }
    }
  };
  const handleChange = (e) => {
    setfile(e.target.files[0]);
    //setFileName(e.target.files[0].name);
    console.log(file);
  };

  return (
    <>
      <input
        type="file"
        name="fileToBeUploaded"
        onChange={handleChange}
      ></input>
      <button type="button" onClick={upload}>
        Upload
      </button>
    </>
  );
};

export default Home;
