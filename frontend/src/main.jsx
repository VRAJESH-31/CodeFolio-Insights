import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";   // ✅ add this
import "./index.css";
import App from "./App.jsx";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query';
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient();  

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>     {/* ✅ Wrap App inside Router */}
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster/>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>
);
