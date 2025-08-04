// src/pages/Home.jsx (moved table to component)
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { fetchDishes, getFilterOptions } from "../api/api";
import DishTable from "../components/DishTable";

export default function Home() {
  const { showMessage, search } = useOutletContext();
  const [dishes, setDishes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [filters, setFilters] = useState({ diet: "", flavor: "", state: "" });
  const [flavorOptions, setFlavorOptions] = useState([]);
  const [stateOptions, setStateOptions] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");
  const [loading, setLoading] = useState(false);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setPage(1);
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setOrder(order === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setOrder("asc");
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchDishes(
        page,
        limit,
        filters,
        search,
        sortBy,
        order
      );
      setDishes(res.data);
      setTotal(res.total);
    } catch (err) {
      console.error(err);
      showMessage("Failed to load dishes", "error");
    } finally {
      setLoading(false);
    }
  };

  const loadFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
      const { states, flavors } = res;
      const cleanStates = states.filter((s) => s && s !== "-1");
      const cleanFlavors = flavors.filter((f) => f && f !== "-1");
      setStateOptions(cleanStates);
      setFlavorOptions(cleanFlavors);
    } catch (err) {
      console.error(err);
      showMessage("Failed to load filter options", "error");
    }
  };

  useEffect(() => {
    loadFilterOptions();
  }, []);

  useEffect(() => {
    loadData();
  }, [page, filters, search, sortBy, order]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Indian Dishes</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          name="diet"
          value={filters.diet}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Diets</option>
          <option value="vegetarian">Veg</option>
          <option value="non vegetarian">Non-Veg</option>
        </select>

        <select
          name="flavor"
          value={filters.flavor}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All Flavors</option>
          {flavorOptions.map((f) => (
            <option key={f} value={f}>
              {f}
            </option>
          ))}
        </select>

        <select
          name="state"
          value={filters.state}
          onChange={handleFilterChange}
          className="p-2 border rounded"
        >
          <option value="">All States</option>
          {stateOptions.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <DishTable
          dishes={dishes}
          onSort={handleSort}
          sortBy={sortBy}
          order={order}
        />
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-4 gap-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm font-medium">Page {page}</span>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page * limit >= total}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
