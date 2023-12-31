const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");
const ConnectDB = require("./config/db");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");


var corsOptions = {
    // origin: "*",
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
    ],
    credentials: true,
  };

dotenv.config();
const productRoutes = require("./routes/productRoutes")
const fileRoutes = require("./routes/fileRoutes")
const app = express();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, (req, res) => {
  console.log(`app is listening at port ${PORT}`);
});

ConnectDB();
app.use(express.json()); // to accept json data
app.use(morgan("dev")); // to display hit url in terminal
app.use(cors(corsOptions)); // to accept request from origin specified in cor options

app.use("/store", productRoutes)
app.use("/files", fileRoutes);
app.get("/", (req, res) => {
    res.send("welcome !!!");
  });

app.use(notFound);

app.use(errorHandler);