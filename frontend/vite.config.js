import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      external: ["firebase/app", "firebase/database", "firebase/auth"],
    },
  },
  optimizeDeps: {
    include: ["firebase/app", "firebase/database", "firebase/auth"],
  },
});
