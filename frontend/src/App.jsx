import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import useAlert from "./hooks/useAlert";
import { useState, useEffect } from "react";

export default function App() {
  const { showMessage, AlertComponent } = useAlert();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <>
      <Header search={search} setSearch={setSearch} onSearch={() => {}} />
      <Outlet context={{ showMessage, search: debouncedSearch }} />
      <AlertComponent />
    </>
  );
}
