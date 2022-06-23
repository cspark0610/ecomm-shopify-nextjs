const { withFrameworkConfig } = require("./framework/common/config");

/** @type {import('next').NextConfig} */
const nextConfig = {
	framework: {
		name: "shopify",
	},
	reactStrictMode: false,
	i18n: {
		locales: ["en-US", "es"],
		defaultLocale: "es",
	},
};

// console.log(JSON.stringify(withFrameworkConfig(nextConfig), null, 2));

module.exports = withFrameworkConfig(nextConfig);
