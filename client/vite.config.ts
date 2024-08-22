import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // add proxy for connecting front and backend
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:6767",
        secure: false,
      },
    },
  },
  plugins: [react()],
});
