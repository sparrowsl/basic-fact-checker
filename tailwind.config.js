import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{html,js,svelte,ts}"],

	theme: {
		extend: {},
	},

	daisyui: {
		themes: ["light"],
	},

	plugins: [
		require("@tailwindcss/typography"),
		require("@tailwindcss/forms"),
		daisyui,
	],
};
