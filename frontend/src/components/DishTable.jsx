import React from "react";
import { Link } from "react-router-dom";

export default function DishTable({ dishes, onSort, sortBy, order }) {
  const getArrow = (field) => {
    if (sortBy !== field) return "";
    return order === "asc" ? " 🔼" : " 🔽";
  };

  const safeValue = (val) =>
    val === -1 ||
    val === "-1" ||
    val === undefined ||
    val === null ||
    val === ""
      ? "N/A"
      : val;

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border border-gray-300 shadow-md rounded">
        <thead className="bg-gray-200 text-sm uppercase text-gray-700">
          <tr>
            <th className="p-3 border">Image</th>
            <th
              className="p-3 border cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("name")}
            >
              Name{getArrow("name")}
            </th>
            <th className="p-3 border">Diet</th>
            <th
              className="p-3 border cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("prep_time")}
            >
              Prep Time{getArrow("prep_time")}
            </th>
            <th
              className="p-3 border cursor-pointer hover:bg-gray-100"
              onClick={() => onSort("cook_time")}
            >
              Cook Time{getArrow("cook_time")}
            </th>
            <th className="p-3 border">State</th>
            <th className="p-3 border">Region</th>
            <th className="p-3 border">View</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish._id} className="text-sm hover:bg-gray-50 transition">
              <td className="p-2 border">
                <div className="w-32 h-24 overflow-hidden rounded border">
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
              </td>
              <td className="p-3 border font-medium">
                <Link
                  to={`/dish/${encodeURIComponent(dish.name)}`}
                  className="text-blue-500 hover:underline"
                >
                  {safeValue(dish.name)}
                </Link>
              </td>
              <td className="p-3 border">{safeValue(dish.diet)}</td>
              <td className="p-3 border">{safeValue(dish.prep_time)}</td>
              <td className="p-3 border">{safeValue(dish.cook_time)}</td>
              <td className="p-3 border">{safeValue(dish.state)}</td>
              <td className="p-3 border">{safeValue(dish.region)}</td>
              <td className="p-3 border text-center">
                <Link
                  to={`/dish/${encodeURIComponent(dish.name)}`}
                  className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
