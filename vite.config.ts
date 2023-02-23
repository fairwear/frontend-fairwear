import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@constants": path.resolve(__dirname, "./src/constants"),
			"@models": path.resolve(__dirname, "./src/models"),
			"@assets": path.resolve(__dirname, "./src/assets"),
		},
	},
	plugins: [react()],
});
