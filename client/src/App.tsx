import { useState } from 'react'
import { useEffect } from "react";
import './App.css'

function App() {
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((data: { message: string }) => {
        setMessage(data.message);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Gaming Backlog Tracker</h1>
      <p>{message}</p>
    </div>
  );
}

export default App
