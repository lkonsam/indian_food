// src/pages/Suggest.jsx
import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { suggestDishes } from "../api/api";
import { Link } from "react-router-dom";

export default function Suggest() {
  const { showMessage, search } = useOutletContext();
  const [input, setInput] = useState("");
  const [suggested, setSuggested] = useState([]);

  const fetchSuggestions = async () => {
    if (input.trim() == "") {
      return;
    }
    try {
      const res = await suggestDishes(input, search);
      setSuggested(res);
    } catch (err) {
      console.error(err);
      showMessage("Failed to fetch suggestions", "error");
    }
  };

  useEffect(() => {
    fetchSuggestions();
  }, [search]);

  const safeValue = (val) =>
    val === -1 ||
    val === "-1" ||
    val === undefined ||
    val === null ||
    val === ""
      ? "N/A"
      : val;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Suggest Dishes by Ingredients</h1>
      <div className="flex gap-4 mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border rounded w-full"
          placeholder="Enter ingredients separated by comma (e.g. rice, potato)"
        />
        <button
          onClick={() => fetchSuggestions()}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {suggested.map((dish) => (
          <div
            key={dish._id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <Link
              to={`/dish/${encodeURIComponent(dish.name)}`}
              className="text-blue-500 hover:underline"
            >
              <div className="w-full h-60 overflow-hidden rounded ">
                <img
                  src={`/images/food${(dish.imageId % 14) + 1}.jpg`}
                  alt={safeValue(dish.name)}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "/images/alt_image.png";
                  }}
                />
              </div>

              <h2 className="text-xl font-semibold mb-1">
                {safeValue(dish.name)}
              </h2>
              <p className="text-sm text-gray-600 mb-1">
                {safeValue(dish.region)} / {safeValue(dish.state)}
              </p>
              <p className="text-sm mb-1">Diet: {safeValue(dish.diet)}</p>
              <p className="text-sm mb-1">
                Flavor: {safeValue(dish.flavor_profile)}
              </p>
              <p className="text-sm mb-1">
                Prep Time: {safeValue(dish.prep_time)}
              </p>
              <p className="text-sm mb-1">
                Cook Time: {safeValue(dish.cook_time)}
              </p>
              <p className="text-sm mt-2">
                <strong>Ingredients:</strong>{" "}
                {Array.isArray(dish.ingredients)
                  ? dish.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 m-0.5 rounded text-xs"
                      >
                        {ing.trim()}
                      </span>
                    ))
                  : safeValue(dish.ingredients)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
