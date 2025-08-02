// src/router/index.jsx
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import DishDetails from "../pages/DishDetails";
import SuggestDishes from "../pages/SuggestDishes";

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/dish/:name", element: <DishDetails /> },
  { path: "/suggest", element: <SuggestDishes /> },
]);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
