const express = require("express");
const router = express.Router();
const {
  loadDataOnce,
  listDishes,
  findDish,
  suggestDishes,
} = require("../controllers/foodController");

router.post("/load-data", loadDataOnce);
router.get("/", listDishes);
router.get("/:name", findDish);
router.post("/suggest", suggestDishes);

module.exports = router;
