const path = require("path");
const deepmerge = require("deepmerge");
const fs = require("fs");
const prettier = require("prettier");

const ALLOWED_FRAMEWORKS = ["shopify", "bigcommerce", "shopify_local"];

function withFrameworkConfig(defaultConfig = {}) {
	let framework = defaultConfig?.framework?.name;

	if (!framework) {
		throw new Error("the api Framework name is required");
	}
	if (!ALLOWED_FRAMEWORKS.includes(framework)) {
		throw new Error(
			`the api Framework name ${framework} is not allowed, please use one of ${ALLOWED_FRAMEWORKS.join(", ")}`
		);
	}
	if (framework === "shopify_local") {
		framework = ALLOWED_FRAMEWORKS[0];
	}

	// "../shopify/next.config.js"
	const frameworkNextConfig = require(path.join("../", framework, "next.config"));
	const mergedConfigs = deepmerge(defaultConfig, frameworkNextConfig);

	const tsPath = path.join(process.cwd(), "tsconfig.json");
	const tsConfig = require(tsPath);
	tsConfig.compilerOptions.paths["@framework"] = [`/framework/${framework}`];
	tsConfig.compilerOptions.paths["@framework/*"] = [`/framework/${framework}/*`];

	fs.writeFileSync(tsPath, prettier.format(JSON.stringify(tsConfig), { parser: "json" }));

	return mergedConfigs;
}

module.exports = { withFrameworkConfig };
