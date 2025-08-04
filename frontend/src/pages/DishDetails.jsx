import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDishByName } from "../api/api";

export default function DishDetails() {
  const { name } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const res = await getDishByName(name);
        setDish(res);
      } catch (err) {
        console.error("Dish not found", err);
      }
    };
    fetchDish();
  }, [name]);

  if (!dish) return <div className="p-6">Loading...</div>;

  const safeValue = (val) =>
    val === -1 ||
    val === "-1" ||
    val === undefined ||
    val === null ||
    val === ""
      ? "N/A"
      : val;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to List
      </Link>
      <div className="w-75 h-60 mt-4 overflow-hidden rounded border">
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
      <h2 className="text-2xl font-bold mt-4 mb-2"> {safeValue(dish.name)}</h2>
      <ul className="text-sm space-y-1">
        <li>
          <strong>Ingredients:</strong> {dish.ingredients.join(", ")}
        </li>
        <li>
          <strong>Diet:</strong> {safeValue(dish.diet)}
        </li>
        <li>
          <strong>Prep Time:</strong> {safeValue(dish.prep_time)}
        </li>
        <li>
          <strong>Cook Time:</strong> {safeValue(dish.cook_time)}
        </li>
        <li>
          <strong>Flavor Profile:</strong> {safeValue(dish.flavor_profile)}
        </li>
        <li>
          <strong>Course:</strong> {safeValue(dish.course)}
        </li>
        <li>
          <strong>State:</strong> {safeValue(dish.state)}
        </li>
        <li>
          <strong>Region:</strong> {safeValue(dish.region)}
        </li>
      </ul>
    </div>
  );
}
