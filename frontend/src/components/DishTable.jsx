import React from "react";

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
      <table className="table-auto w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Image</th>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => onSort("name")}
            >
              Name{getArrow("name")}
            </th>
            <th className="p-2 border">Diet</th>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => onSort("prep_time")}
            >
              Prep Time{getArrow("prep_time")}
            </th>
            <th
              className="p-2 border cursor-pointer"
              onClick={() => onSort("cook_time")}
            >
              Cook Time{getArrow("cook_time")}
            </th>
            <th className="p-2 border">State</th>
            <th className="p-2 border">Region</th>
          </tr>
        </thead>
        <tbody>
          {dishes.map((dish) => (
            <tr key={dish._id} className="text-sm">
              <td className="p-2 border">
                <img
                  src={`https://picsum.photos/id/${dish.imageId % 1000}/80/60`}
                  alt={safeValue(dish.name)}
                  className="rounded"
                />
              </td>
              <td className="p-2 border">
                <a
                  href={`/dish/${encodeURIComponent(dish.name)}`}
                  className="text-blue-500 hover:underline"
                >
                  {safeValue(dish.name)}
                </a>
              </td>
              <td className="p-2 border">{safeValue(dish.diet)}</td>
              <td className="p-2 border">{safeValue(dish.prep_time)}</td>
              <td className="p-2 border">{safeValue(dish.cook_time)}</td>
              <td className="p-2 border">{safeValue(dish.state)}</td>
              <td className="p-2 border">{safeValue(dish.region)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
