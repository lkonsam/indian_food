const fs = require("fs");
const path = require("path");
const csv = require("csv-parser");
const Dish = require("../models/Dish");

const loadCSVData = async () => {
  const results = [];

  return new Promise((resolve, reject) => {
    let index = 1;
    fs.createReadStream(path.join(__dirname, "../assets/indian_food.csv"))
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          name: data.name,
          ingredients:
            data.ingredients?.split(",").map((i) => i.trim().toLowerCase()) ||
            [],
          diet: data.diet,
          prep_time: data.prep_time,
          cook_time: data.cook_time,
          flavor_profile: data.flavor_profile,
          course: data.course,
          state: data.state,
          region: data.region,
          imageId: index++,
        });
      })
      .on("end", async () => {
        try {
          await Dish.deleteMany();
          await Dish.insertMany(results);
          resolve({ message: "CSV data loaded successfully" });
        } catch (err) {
          reject(err);
        }
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const getAllDishes = async (req) => {
  const {
    page = 1,
    limit = 10,
    diet,
    flavor,
    state,
    sortBy,
    order = "asc",
    search = "",
  } = req.query;
  const filter = {};

  if (diet) filter.diet = diet;
  if (flavor) filter.flavor_profile = flavor;
  if (state) filter.state = state;

  if (search.trim() !== "") {
    const regex = new RegExp(search.trim(), "i");
    filter.$or = [
      { name: regex },
      { ingredients: regex },
      { state: regex },
      { region: regex },
    ];
  }

  const sort = {};
  if (sortBy) sort[sortBy] = order === "desc" ? -1 : 1;

  const dishes = await Dish.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(parseInt(limit));

  const count = await Dish.countDocuments(filter);

  return {
    total: count,
    page: parseInt(page),
    limit: parseInt(limit),
    data: dishes,
  };
};

const getDishByName = async (name) => {
  return await Dish.findOne({ name: new RegExp(`^${name}$`, "i") });
};

const getDishesByIngredients = async (ingredients) => {
  return await Dish.find({
    ingredients: { $all: ingredients.map((i) => i.toLowerCase()) },
  });
};

const getFilterOptions = async () => {
  const states = await Dish.distinct("state");
  const flavors = await Dish.distinct("flavor_profile");
  return { states: states.filter(Boolean), flavors: flavors.filter(Boolean) };
};

module.exports = {
  loadCSVData,
  getAllDishes,
  getDishByName,
  getDishesByIngredients,
  getFilterOptions,
};
