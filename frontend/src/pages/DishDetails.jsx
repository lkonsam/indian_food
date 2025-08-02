import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

export default function DishDetails() {
  const { name } = useParams();
  const [dish, setDish] = useState(null);

  useEffect(() => {
    const fetchDish = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/food/${name}`);
        setDish(res.data);
      } catch (err) {
        console.error("Dish not found", err);
      }
    };
    fetchDish();
  }, [name]);

  if (!dish) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <Link to="/" className="text-blue-500 hover:underline">
        ← Back to List
      </Link>
      <img
        src={`https://picsum.photos/id/${dish.imageId % 1000}/600/300`}
        alt={dish.name}
        className="rounded-lg mt-4"
      />
      <h2 className="text-2xl font-bold mt-4 mb-2">{dish.name}</h2>
      <ul className="text-sm space-y-1">
        <li>
          <strong>Ingredients:</strong> {dish.ingredients.join(", ")}
        </li>
        <li>
          <strong>Diet:</strong> {dish.diet}
        </li>
        <li>
          <strong>Prep Time:</strong> {dish.prep_time}
        </li>
        <li>
          <strong>Cook Time:</strong> {dish.cook_time}
        </li>
        <li>
          <strong>Flavor Profile:</strong> {dish.flavor_profile}
        </li>
        <li>
          <strong>Course:</strong> {dish.course}
        </li>
        <li>
          <strong>State:</strong> {dish.state}
        </li>
        <li>
          <strong>Region:</strong> {dish.region}
        </li>
      </ul>
    </div>
  );
}
