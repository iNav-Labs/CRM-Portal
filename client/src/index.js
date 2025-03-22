import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import "./Assets/Styles/index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { AuthLogin } from "./AuthComponents/AuthLogin";

// Create a root for your app
const root = createRoot(document.getElementById("root"));

// Render your app
root.render(
  <AuthLogin>
    <App />
  </AuthLogin>
);

// Register the service worker (optional)
registerServiceWorker();
