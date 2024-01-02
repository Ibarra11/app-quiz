import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
console.log(process.cwd());
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: `http://localhost:3000`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});