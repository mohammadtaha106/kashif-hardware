import { NextUIProvider } from "@nextui-org/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";
import App from "./App.jsx";
import AuthContextProvider from "./context/AuthContext.jsx";
import CartContextProvider from "./context/CartContext.jsx";
import { QueryProvider } from "./context/QueryContext.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContextProvider>
      <QueryProvider>
        <CartContextProvider>
          <NextUIProvider>
            <App />
            <Toaster richColors />
          </NextUIProvider>
        </CartContextProvider>
      </QueryProvider>
    </AuthContextProvider>
  </StrictMode>
);
