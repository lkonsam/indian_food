// src/api/api.js
import axios from "axios";

const BASE_URL = "https://indian-food-p1b1.onrender.com/api/food";

export const fetchDishes = async (
  page = 1,
  limit = 10,
  filters = {},
  search = ""
) => {
  const params = new URLSearchParams({ page, limit });

  if (filters.diet) params.append("diet", filters.diet);
  if (filters.flavor) params.append("flavor", filters.flavor);
  if (filters.state) params.append("state", filters.state);
  if (search) params.append("search", search);

  const res = await axios.get(`${BASE_URL}?${params.toString()}`);
  return res.data;
};

export const getDishByName = async (name) => {
  const res = await axios.get(`${BASE_URL}/${name}`);
  return res.data;
};

export const suggestDishes = async (ingredients, search) => {
  const param = ingredients
    .split(",")
    .map((ele) => ele.trim())
    .filter((ele) => ele.length > 0);

  const res = await axios.post(`${BASE_URL}/suggest`, {
    ingredients: param,
    search,
  });
  return res.data;
};

export const loadSeedData = async () => {
  const res = await axios.post(`${BASE_URL}/load-data`);
  return res.data;
};

export const getFilterOptions = async () => {
  const res = await axios.post(`${BASE_URL}/filters`);
  return res.data;
};
