/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			boxShadow: {
				"3xl": "0.3em 0.6em 0.6em rgb(64, 64, 70)",
			},
		},
	},
	plugins: [require("daisyui")],
	daisyui: {
		themes: ["business"],
	},
};
