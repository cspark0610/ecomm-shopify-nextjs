// only one hook useHook

import { handler as useAddItem } from "./cart/use-add-item";

export const shopifyHooks = {
	cart: {
		useAddItem,
	},
};
