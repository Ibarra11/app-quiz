import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

const devAPIURL = loadEnv(process.env.NODE_ENV, process.cwd()).VITE_API_URL;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(devAPIURL), // Expose dev API URL to the frontend
  },
});
