const express = require("express");
const dotenv = require("dotenv").config();
const errorHandler = require("../backend/middlewares/errorMiddleware.js");
const colors = require("colors");
const conectDB = require("./config/db.js");

conectDB();

const goalRouter = require("./routes/goalRoutes.js");
const userRouter = require("./routes/userRoutes.js");

const port = process.env.PORT || 5000;
const app = express();

app.use(express.json());
// for URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Route not found",
  });
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
