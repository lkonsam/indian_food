import React from "react";
import { Link } from "react-router-dom";

export default function Header({ search, setSearch, onSearch }) {
  return (
    <>
      <header className="w-full flex items-center justify-between bg-gray-700 p-4 shadow">
        <div className="flex flex-wrap gap-4 items-center align-middle">
          <Link to="/">
            <h1 className="text-lg md:text-xl font-bold text-white flex">
              <img
                src="/product-logo.png"
                alt="Food Dashboard"
                className="h-8"
              />{" "}
              Indian Food
            </h1>
          </Link>

          <Link to="/" className="text-white text-lg  hover:font-semibold ">
            Home
          </Link>

          <Link
            to="/suggest"
            className="text-white text-lg hover:font-semibold"
          >
            Suggest
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            onKeyDown={(e) => e.key === "Enter" && onSearch()}
            placeholder="Search dishes, ingredients, or region..."
            className="hidden md:block border px-2 py-1 rounded bg-white text-gray-800 focus:outline-none w-sm"
          />
        </div>
      </header>
      <div className="w-full">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
          placeholder="Search dishes, ingredients, or region..."
          className="w-full md:hidden border px-2 py-1  bg-white text-gray-800 focus:outline-none "
        />
      </div>
    </>
  );
}
