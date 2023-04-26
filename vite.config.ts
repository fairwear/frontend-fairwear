import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		proxy: {
			"/api": {
				target: "http://localhost:8080",
				changeOrigin: true,
			},
		},
	},
	resolve: {
		alias: {
			"@src": path.resolve(__dirname, "./src"),
			"@api": path.resolve(__dirname, "./src/api"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@pages": path.resolve(__dirname, "./src/pages"),
			"@utils": path.resolve(__dirname, "./src/utils"),
			"@constants": path.resolve(__dirname, "./src/constants"),
			"@models": path.resolve(__dirname, "./src/models"),
			"@assets": path.resolve(__dirname, "./src/assets"),
			"@redux": path.resolve(__dirname, "./src/redux"),
			"@services": path.resolve(__dirname, "./src/services"),
		},
	},
	build: {
		outDir: "dist",
	},
	base: "./src",
	plugins: [react()],
});
