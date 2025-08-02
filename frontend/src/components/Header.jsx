import React from "react";
import { Link } from "react-router-dom";

export default function Header({ search, setSearch, onSearch }) {
  return (
    <header className="bg-white shadow px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <nav className="flex flex-wrap gap-4 items-center">
        <Link to="/" className="text-xl font-semibold text-gray-800">
          Indian Food
        </Link>
        <Link to="/" className="text-gray-600 hover:text-black text-sm">
          Home
        </Link>
        <Link to="/suggest" className="text-gray-600 hover:text-black text-sm">
          Suggest
        </Link>
      </nav>

      {/* Search Box */}
      <div className="w-full md:w-auto">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Search dishes, ingredients, or region..."
          className="w-full md:w-96 border p-2 rounded text-sm"
        />
      </div>
    </header>
  );
}
