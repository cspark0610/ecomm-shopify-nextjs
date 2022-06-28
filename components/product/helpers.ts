import { Product, ProductVariant } from "@common/types/product";

type AvailableChoices = "Size" | "Color" | string;
type Choices = {
	[P in AvailableChoices]: string;
};
export function getVariant(product: Product, choices: Choices): ProductVariant {
	const { variants } = product;
	return variants.find((variant) => {
		// console.log(variant.options);
		// console.log("should match every");
		// console.log(choices);
		const isMatchingChoice: boolean = variant.options.every((variantoption) => {
			const optionName = variantoption.displayName.toLowerCase();
			if (optionName in choices) {
				if (choices[optionName] === variantoption.values[0].label) {
					return true;
				}
			}
			return false;
		});
		return isMatchingChoice;
	});
}
