import { useState, useCallback } from "react";

let idCounter = 0;

export default function useAlert() {
  const [alerts, setAlerts] = useState([]);

  const showMessage = useCallback((message, type = "info", duration = 3000) => {
    const id = idCounter++;
    const alert = { id, message, type };
    setAlerts((prev) => [...prev, alert]);

    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== id));
    }, duration);
  }, []);

  const AlertComponent = () => (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col-reverse gap-2">
      {alerts.map((alert) => (
        <div
          key={alert.id}
          className={`px-4 py-2 rounded shadow-lg text-white animate-fade-in-down transition-all duration-300 ${
            alert.type === "success"
              ? "bg-green-500"
              : alert.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          {alert.message}
        </div>
      ))}
    </div>
  );

  return { showMessage, AlertComponent };
}
