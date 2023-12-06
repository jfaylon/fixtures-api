require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const swaggerUi = require('swagger-ui-express');
const specs = require('./swaggerConfig');
const tournamentsRouter = require("./routes/tournamentsRouter");

app.use(cors());

app.use("/api/tournaments", tournamentsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));



module.exports = app;
