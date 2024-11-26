import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { NextUIProvider } from "@nextui-org/react";
import { Toaster } from "sonner";
import AuthContextProvider from "./context/AuthContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <NextUIProvider>
          <App />
          <Toaster richColors />
        </NextUIProvider>
      </CartContextProvider>
    </AuthContextProvider>
  </StrictMode>
);
