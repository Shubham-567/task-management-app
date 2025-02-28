import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: [
      'task-management-app-frontend-si04.onrender.com', // Add Render host
      'localhost',  // Allow localhost for local development
    ],
  },
});
