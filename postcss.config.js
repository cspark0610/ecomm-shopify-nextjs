module.exports = {
	plugins: ["tailwindcss", "postcss-nesting", "autoprefixer"],
};

/*
FOR TAILWIND VEERSION 3
	plugins: {
		"postcss-import": {},
		"tailwindcss/nesting": "postcss-nesting",
		tailwindcss: {},
		autoprefixer: {},
	},
*/

// "postcss-nesting"
// to apply & > * { styles }

// just for testing
// module.exports = {
// 	plugins: [require("tailwindcss"), require("autoprefixer")],
// };
