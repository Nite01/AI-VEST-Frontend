import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext/ThemeContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider> {/* Wrap App in UserProvider */}
      <ThemeProvider> {/* Wrap App in ThemeProvider */}
        <App />
      </ThemeProvider>
    </UserProvider>
  </StrictMode>
);