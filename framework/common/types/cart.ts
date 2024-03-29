import { ProductOption, ProductVariant, ProductImage } from "./product";
interface Discount {
	value: number;
}

export interface Cart {
	id: string;
	createdAt: string;
	currency: {
		code: string;
	};
	taxesIncluded: boolean;
	lineItemsSubtotalPrice: number;
	totalPrice: number;
	lineItems: any[];
	discounts: Discount[];
}

export interface LineItem {
	id: string;
	variantId: string;
	productId: string;
	name: string;
	path: string;
	quantity: number;
	discounts: Discount[];
	options: ProductOption[];
	variant: ProductVariant;
}
