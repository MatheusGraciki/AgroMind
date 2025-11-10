import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      App: path.resolve(__dirname, "./src/App"),
      Components: path.resolve(__dirname, "./src/Components"),
      Context: path.resolve(__dirname, "./src/Context"),
      Utils: path.resolve(__dirname, "./src/Utils"),
      Hooks: path.resolve(__dirname, "./src/Hooks"),
      Styles: path.resolve(__dirname, "./src/styles"),
    },
  },
});
