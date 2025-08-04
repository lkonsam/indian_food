const {
  loadCSVData,
  getAllDishes,
  getDishByName,
  getDishesByIngredients,
  getFilterOptions,
} = require("../services/foodService");

const loadDataOnce = async (req, res) => {
  try {
    const result = await loadCSVData();
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to load CSV data", details: err.message });
  }
};

const listDishes = async (req, res) => {
  try {
    const result = await getAllDishes(req);
    res.status(200).json(result);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch dishes", details: err.message });
  }
};

const findDish = async (req, res) => {
  try {
    const dish = await getDishByName(req.params.name);
    if (!dish) return res.status(404).json({ message: "Dish not found" });
    res.status(200).json(dish);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch dish", details: err.message });
  }
};

const suggestDishes = async (req, res) => {
  try {
    const ingredients = req.body.ingredients;
    const search = req.body.search;
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return res
        .status(400)
        .json({ message: "Ingredients must be a non-empty array" });
    }
    const dishes = await getDishesByIngredients(ingredients, search);
    res.status(200).json(dishes);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to suggest dishes", details: err.message });
  }
};
const filterOptions = async (req, res) => {
  try {
    const filters = await getFilterOptions();
    // console.log(filters);
    res.json({ ...filters });
  } catch (err) {
    res.status(500).json({ error: "Failed to load filters" });
  }
};

module.exports = {
  loadDataOnce,
  listDishes,
  findDish,
  suggestDishes,
  filterOptions,
};
