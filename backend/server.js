const express = require("express");
const multer = require("multer");
const app = express();
const cors = require("cors");
//const fileupload = require("express-fileupload");
const bodyParser = require("body-parser");

const port = 3009;

app.use(bodyParser.json({ limit: "50000mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50000mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(
  express.urlencoded({
    limit: "50000mb",
    extended: true,
    parameterLimit: 50000,
  })
);
app.use(express.json());
app.use(express.text());

var whitelist = [
  "http://localhost:3009",
  "http://localhost:3001",
  "http://localhost",
  "http://localhost:3000",
  "http://localhost/test",
]; //white list consumers

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true, //Credentials are cookies, authorization headers or TLS client certificates.
};

app.use(cors(corsOptions)); //adding cors middleware to the express with above configurations
app.use(express.static(__dirname));

const connection = require("../backend/dbConfig").pool;

/*app.post("/", async (request, response) => {
  let rec = await selectQuery(request, response);
  response.json(rec.rows);
});*/

//app.use(fileupload());
//app.use(express.static("files"));

// Multer configuration for file upload
//const storage = multer.memoryStorage(); // Store file in memory
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Specify the directory where you want to save the uploaded files
    cb(null, "./../public");
  },
  filename: function (req, file, cb) {
    // Set the filename to be the original name of the file
    cb(null, file.originalname);
    //    return cb(null, `${Date.now()}-${file.filename}`);
  },
});
const upload = multer({ storage: storage });

const customer = require("./route/customer");
app.use("/customer", upload.single("file"), customer);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
