import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import useAlert from "./hooks/useAlert";
import { useState } from "react";

export default function App() {
  const { showMessage, AlertComponent } = useAlert();
  const [search, setSearch] = useState("");

  return (
    <>
      <Header search={search} setSearch={setSearch} onSearch={() => {}} />
      <Outlet context={{ showMessage, search }} />
      <AlertComponent />
    </>
  );
}
