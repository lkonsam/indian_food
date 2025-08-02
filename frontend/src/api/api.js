// src/api/api.js
import axios from "axios";

const BASE_URL = "http://localhost:3000/api/food";

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
  const res = await axios.get(`${BASE_URL}/${encodeURIComponent(name)}`);
  return res.data;
};

export const suggestDishes = async (ingredients) => {
  const res = await axios.post(`${BASE_URL}/suggest`, { ingredients });
  return res.data;
};

export const loadSeedData = async () => {
  const res = await axios.post(`${BASE_URL}/load-data`);
  return res.data;
};
