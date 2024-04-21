require("dotenv").config();
const express = require("express");
const router = require("./routers/index");
const cors = require("cors");

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3001",
    // origin: "http://localhost:3000",
  })
);
app.options("*", cors());

app.use("/", router);

app.listen(port, () => {
  console.log("server is running on port", port);
});
