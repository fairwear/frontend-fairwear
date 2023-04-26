// vite.config.ts
import { defineConfig } from "file:///Users/kernius/fairwear/frontend-fairwear/node_modules/vite/dist/node/index.js";
import react from "file:///Users/kernius/fairwear/frontend-fairwear/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
var __vite_injected_original_dirname =
	"/Users/kernius/fairwear/frontend-fairwear";
var vite_config_default = defineConfig({
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
			"@": path.resolve(__vite_injected_original_dirname, "./src"),
			"@api": path.resolve(__vite_injected_original_dirname, "./src/api"),
			"@components": path.resolve(
				__vite_injected_original_dirname,
				"./src/components"
			),
			"@pages": path.resolve(__vite_injected_original_dirname, "./src/pages"),
			"@utils": path.resolve(__vite_injected_original_dirname, "./src/utils"),
			"@constants": path.resolve(
				__vite_injected_original_dirname,
				"./src/constants"
			),
			"@models": path.resolve(__vite_injected_original_dirname, "./src/models"),
			"@assets": path.resolve(__vite_injected_original_dirname, "./src/assets"),
			"@redux": path.resolve(__vite_injected_original_dirname, "./src/redux"),
			"@services": path.resolve(
				__vite_injected_original_dirname,
				"./src/services"
			),
		},
	},
	plugins: [react()],
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva2Vybml1cy9mYWlyd2Vhci9mcm9udGVuZC1mYWlyd2VhclwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tlcm5pdXMvZmFpcndlYXIvZnJvbnRlbmQtZmFpcndlYXIvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tlcm5pdXMvZmFpcndlYXIvZnJvbnRlbmQtZmFpcndlYXIvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHJlYWN0IGZyb20gXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiO1xuaW1wb3J0IHBhdGggZnJvbSBcInBhdGhcIjtcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHNlcnZlcjoge1xuXHRcdHByb3h5OiB7XG5cdFx0XHRcIi9hcGlcIjoge1xuXHRcdFx0XHR0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDo4MDgwXCIsXG5cdFx0XHRcdGNoYW5nZU9yaWdpbjogdHJ1ZSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSxcblx0cmVzb2x2ZToge1xuXHRcdGFsaWFzOiB7XG5cdFx0XHRcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcblx0XHRcdFwiQGFwaVwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL2FwaVwiKSxcblx0XHRcdFwiQGNvbXBvbmVudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb21wb25lbnRzXCIpLFxuXHRcdFx0XCJAcGFnZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9wYWdlc1wiKSxcblx0XHRcdFwiQHV0aWxzXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmMvdXRpbHNcIiksXG5cdFx0XHRcIkBjb25zdGFudHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9jb25zdGFudHNcIiksXG5cdFx0XHRcIkBtb2RlbHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9tb2RlbHNcIiksXG5cdFx0XHRcIkBhc3NldHNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9hc3NldHNcIiksXG5cdFx0XHRcIkByZWR1eFwiOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBcIi4vc3JjL3JlZHV4XCIpLFxuXHRcdFx0XCJAc2VydmljZXNcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyYy9zZXJ2aWNlc1wiKSxcblx0XHR9LFxuXHR9LFxuXHRwbHVnaW5zOiBbcmVhY3QoKV0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNlMsU0FBUyxvQkFBb0I7QUFDMVUsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sVUFBVTtBQUZqQixJQUFNLG1DQUFtQztBQUt6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMzQixRQUFRO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTixRQUFRO0FBQUEsUUFDUCxRQUFRO0FBQUEsUUFDUixjQUFjO0FBQUEsTUFDZjtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsTUFDcEMsUUFBUSxLQUFLLFFBQVEsa0NBQVcsV0FBVztBQUFBLE1BQzNDLGVBQWUsS0FBSyxRQUFRLGtDQUFXLGtCQUFrQjtBQUFBLE1BQ3pELFVBQVUsS0FBSyxRQUFRLGtDQUFXLGFBQWE7QUFBQSxNQUMvQyxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsY0FBYyxLQUFLLFFBQVEsa0NBQVcsaUJBQWlCO0FBQUEsTUFDdkQsV0FBVyxLQUFLLFFBQVEsa0NBQVcsY0FBYztBQUFBLE1BQ2pELFdBQVcsS0FBSyxRQUFRLGtDQUFXLGNBQWM7QUFBQSxNQUNqRCxVQUFVLEtBQUssUUFBUSxrQ0FBVyxhQUFhO0FBQUEsTUFDL0MsYUFBYSxLQUFLLFFBQVEsa0NBQVcsZ0JBQWdCO0FBQUEsSUFDdEQ7QUFBQSxFQUNEO0FBQUEsRUFDQSxTQUFTLENBQUMsTUFBTSxDQUFDO0FBQ2xCLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
