import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/index.css";

import "./styles/App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Hello from "./components/Hello.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
