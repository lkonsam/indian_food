import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";

export default function Home() {
  const [dishes, setDishes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [limit] = useState(10);
  const [loading, setLoading] = useState(false);

  const fetchDishes = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:3000/api/food?page=${page}&limit=${limit}`
      );
      setDishes(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Error fetching dishes:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, [page]);

  return (
    <>
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Indian Dishes</h1>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">Image</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Diet</th>
                  <th className="p-2 border">Prep Time</th>
                  <th className="p-2 border">Cook Time</th>
                  <th className="p-2 border">Region</th>
                </tr>
              </thead>
              <tbody>
                {dishes.map((dish) => (
                  <tr key={dish._id} className="text-sm">
                    <td className="p-2 border">
                      <img
                        src={`https://picsum.photos/id/${
                          dish.imageId % 1000
                        }/80/60`}
                        alt={dish.name}
                        className="rounded"
                      />
                    </td>
                    <td className="p-2 border">
                      <Link
                        to={`/dish/${encodeURIComponent(dish.name)}`}
                        className="text-blue-500 hover:underline"
                      >
                        {dish.name}
                      </Link>
                    </td>
                    <td className="p-2 border">{dish.diet}</td>
                    <td className="p-2 border">{dish.prep_time}</td>
                    <td className="p-2 border">{dish.cook_time}</td>
                    <td className="p-2 border">{dish.region}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
    </>
  );
}
