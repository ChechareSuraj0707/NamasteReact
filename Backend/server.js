const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 3000;

const CORS = require("cors");
const { error } = require("console");
app.use(CORS());
app.get("/api/restaurants", (req, res) => {
  const filePath = path.join(__dirname, "restro.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read data" });
    }
    res.json(JSON.parse(data));
  });
});
app.get("/api/foodItemFilter", (req, res) => {
  const filePath = path.join(__dirname, "foodItemFilter.json");
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "failed to read data" });
    }
    res.json(JSON.parse(data));
  });
});
app.get("/api/restroMenu/:id", (req, res) => {
  const filePath = path.join(__dirname, "RestroMenu.json");
  const ID = req.params;
  let restaurants;
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "failed to read data" });
    }
    restaurants = JSON.parse(data);
    if (restaurants) {
      let menu = restaurants.find((v) => v.id == ID.id);
      res.json(menu);
    }
  });
});
app.listen(port, () => {
  console.log(`server stared at ${port}`);
});
