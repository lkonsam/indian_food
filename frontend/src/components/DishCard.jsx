import React from "react";

export default function DishCard({ dish }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 w-full md:w-60">
      <img
        src={`/images/food${(dish.imageId % 14) + 1}.jpg`}
        alt={dish.name}
        className="rounded-md mb-3"
      />

      <h2 className="font-semibold text-lg mb-1">{dish.name}</h2>
      <p className="text-sm text-gray-600">
        {dish.region}, {dish.state}
      </p>
      <span className="inline-block mt-2 px-2 py-1 text-xs bg-gray-100 rounded">
        {dish.diet}
      </span>
    </div>
  );
}
