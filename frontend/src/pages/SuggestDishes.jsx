import React, { useState } from "react";
import axios from "axios";

export default function SuggestDishes() {
  const [input, setInput] = useState("");
  const [dishes, setDishes] = useState([]);

  const handleSuggest = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/food/suggest", {
        ingredients: input.split(",").map((i) => i.trim()),
      });
      setDishes(res.data);
    } catch (err) {
      console.error("Failed to suggest dishes", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Suggest Dishes</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="e.g. rice flour, coconut, jaggery"
        className="border p-2 w-full max-w-md rounded mb-3"
      />
      <button
        onClick={handleSuggest}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Suggest
      </button>

      {dishes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {dishes.map((dish) => (
            <div key={dish._id} className="bg-white p-4 rounded shadow">
              <img
                src={`https://picsum.photos/id/${dish.imageId % 1000}/300/200`}
                alt={dish.name}
                className="rounded mb-2"
              />
              <h2 className="font-semibold text-lg">{dish.name}</h2>
              <p className="text-sm text-gray-600">
                {dish.region} | {dish.diet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
