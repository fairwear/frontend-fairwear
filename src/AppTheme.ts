import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import { createTheme } from "@mui/material";

const AppTheme = createTheme({
	components: {
		MuiAccordion: {
			styleOverrides: {
				root: {
					width: "100%",
					borderRadius: "4px",
					"::before": {
						backgroundColor: "transparent",
					},
					"&.stage-accordion-container": {
						display: "flex",
						width: "100%",
						"&.MuiCollapse-entered": {
							display: "flex",
						},
					},
					"&.MuiAccordionSummary-content": {
						margin: "10px",
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					boxShadow: "none",
					":hover": {
						boxShadow: "none",
					},
				},
				contained: {
					backgroundColor: "#222222",
					opacity: 0.87,
					color: "#e9e9e9",
					"&:hover": {
						backgroundColor: "#222222",
						color: "#e9e9e9",
						opacity: 0.8,
					},
				},
				outlined: {
					borderColor: "#222222",
					color: "#222222",
					"&:hover": {
						borderColor: "#222222",
						color: "#222222",
					},
				},
				text: {
					color: "#1F2B31",
				},
			},
			variants: [
				{
					props: { variant: "danger" },
					style: {
						background: "#E53935",
						color: "#FFFFFF",
						"&.MuiButton-root": {
							":hover": {
								background: "#B71C1C !important",
								backgroundColor: "#B71C1C !important",
							},
						},
					},
				},
				{
					props: { variant: "grey" },
					style: {
						background: "#EEEEEE",
						color: "#171440",
						"&.MuiButton-root": {
							":hover": {
								background: "#e0e0e0",
								backgroundColor: "#e0e0e0",
							},
						},
					},
				},
				{
					props: { color: "error" },
					style: {
						"&.MuiButton-root": {
							":hover": {
								background: "inherit",
							},
						},
						color: "#E53935",
					},
				},
			],
		},
		MuiToolbar: {
			styleOverrides: {
				root: {
					minHeight: "70px",
					backgroundColor: "#e9e9e9",
					"&.MuiToolbar-gutters": {
						paddingLeft: "48px",
						paddingRight: "48px",
					},
				},
			},
			variants: [
				{
					props: {
						className: "footer-toolbar",
					},
					style: {
						"&.MuiToolbar-root": {
							background: "#F7F8FC",
						},
					},
				},
			],
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					minHeight: "70px",
					backgroundColor: "#e9e9e9",
					// Adds a shadow to the appbar
					boxShadow: "none",
					// boxShadow:
					// 	"0px 6px 12px -6px rgba(0, 43, 0, 0.05), 0px 8px 22px -4px rgba(0, 43, 0, 0.05)",
					// Makes the appbar fixed
					// position: "relative",
				},
			},
		},
	},
	palette: {
		red: {
			50: "#FEEBEE",
			100: "#FECDD2",
			200: "#EF9A9A",
			300: "#E57373",
			400: "#EF5350",
			500: "#F44336",
			600: "#E53935",
			700: "#D32F2F",
			800: "#C62828",
			900: "#B71C1C",
		},
	},

	typography: {
		fontFamily: "Inter",
		fontWeightLight: "300",
		fontWeightRegular: "400",
		fontWeightMedium: "500",
		fontWeightBold: "600",
		h1: {
			fontSize: "36px",
			lineHeight: "120%",
			fontWeight: "700",
		},
		h2: {
			fontSize: "28px",
			lineHeight: "120%",
			fontWeight: "700",
		},
		h3: {
			fontSize: "22px",
			lineHeight: "120%",
			fontWeight: "500",
		},
		h4: {
			fontSize: "18px",
			lineHeight: "120%",
			fontWeight: "500",
		},
		h5: {
			fontSize: "15px",
			lineHeight: "120%",
			fontWeight: "500",
		},
		h6: {
			fontSize: "14px",
			lineHeight: "120%",
			fontWeight: "500",
		},
		body1: {
			fontSize: "16px",
			lineHeight: "120%",
			fontWeight: "400",
		},
		body2: {
			fontSize: "14px",
			lineHeight: "120%",
			fontWeight: "400",
		},

		subtitle1: {
			fontSize: "14px",
			lineHeight: "120%",
			fontWeight: "400",
		},
		subtitle2: {
			fontSize: "12px",
			lineHeight: "120%",
			fontWeight: "400",
		},
	},
});
declare module "@mui/material/styles/createPalette" {
	interface Palette {
		specific: Palette["primary"];
		neutral: Palette["primary"];
		error: Palette["primary"];
		red: Palette["grey"];
		green: Palette["grey"];
	}

	interface PaletteOptions {
		specific?: PaletteOptions["primary"];
		neutral?: PaletteOptions["primary"];
		error?: PaletteOptions["primary"];
		red?: PaletteOptions["grey"];
		green?: PaletteOptions["grey"];
	}
}
declare module "@mui/material/Button" {
	interface ButtonPropsVariantOverrides {
		danger: true;
		grey: true;
	}
}

export default AppTheme;
