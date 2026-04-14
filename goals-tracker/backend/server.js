const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("../backend/middlewares/errorMiddleware.js");

const router = require("./routes/goalRoutes.js");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
// for URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
