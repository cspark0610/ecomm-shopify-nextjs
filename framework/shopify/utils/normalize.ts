import {
	Product as ShopifyProduct,
	ImageEdge,
	MoneyV2,
	ProductOption,
	ProductVariantConnection,
	SelectedOption,
	Checkout,
} from "../schema";
import { Product } from "@common/types/product";
import { Cart } from "@common/types/cart";
import { CheckoutLineItemEdge } from "../schema";
import { LineItem } from "../../common/types/cart";

const normalizeProductImages = ({ edges }: { edges: Array<ImageEdge> }) =>
	edges.map(({ node: { originalSrc: url, ...rest } }) => ({
		url: `/images/${url}.jpg`,
		...rest,
	}));

const normalizeProductPrice = ({ currencyCode, amount }: MoneyV2) => {
	return {
		value: +amount,
		currencyCode,
	};
};

const normalizeProductOption = ({ id, values, name: displayName }: ProductOption) => {
	const normalized = {
		id,
		displayName,
		values: values.map((value) => {
			let output: any = {
				label: value,
			};

			if (displayName.match(/colou?r/gi)) {
				output = {
					...output,
					hexColor: value,
				};
			}
			return output;
		}),
	};
	// console.log(normalized, "normalized");
	return normalized;
};

const normalizeProductVariants = ({ edges }: ProductVariantConnection) => {
	return edges.map(({ node }) => {
		const { id, selectedOptions, sku, title, priceV2, compareAtPriceV2 } = node;
		return {
			id,
			name: title,
			sku: sku || id,
			price: +priceV2.amount,
			listPrice: +compareAtPriceV2?.amount ?? 0,
			requiresShipping: true,
			options: selectedOptions.map(({ name, value }: SelectedOption) => {
				const option = normalizeProductOption({ id, name, values: [value] });
				return option;
			}),
		};
	});
};

export function normalizeProduct(productNode: ShopifyProduct): Product {
	const {
		id,
		title: name,
		handle,
		vendor,
		description,
		images: imageConnection,
		priceRange,
		options,
		variants,
		...rest
	} = productNode;

	const product = {
		id,
		name,
		vendor,
		description,
		path: `/products/${handle}`,
		slug: handle.replace(/^\/+|\/+$/g, ""),
		images: normalizeProductImages(imageConnection),
		price: normalizeProductPrice(priceRange.minVariantPrice),
		options: options
			? options.filter((o) => o.name !== "Title").map((o) => normalizeProductOption(o))
			: [],
		variants: variants ? normalizeProductVariants(variants) : [],
		...rest,
	};
	return product;
}

// normalize line items

const normalizeLineItem = ({
	node: { id, title, variant, quantity, ...rest },
}: CheckoutLineItemEdge): LineItem => {
	return {
		id,
		variantId: String(variant?.id),
		productId: String(variant?.id),
		name: title,
		path: variant?.product?.handle ?? "",
		discounts: [],
		options: variant?.selectedOptions?.map(({ name, value }: SelectedOption) => {
			const option = normalizeProductOption({ id, name, values: [value] });
			return option;
		}),
		variant: {
			id: String(variant?.id),
			sku: variant?.sku ?? "",
			name: variant?.title,
			requiresShipping: variant?.requiresShipping ?? false,
			// actual price with discounts
			price: variant?.priceV2.amount,
			// base price
			listPrice: variant?.compareAtPriceV2.amount,
			// TODO image
			image: {
				url:
					process.env.NEXT_PUBLIC_FRAMEWORK === "shopify_local"
						? `/images/${variant?.image?.originalSrc}`
						: variant?.image?.originalSrc ?? "/product-image-placeholder.svg",
			},
		},
		...rest,
	} as any;
};

// CartNormalization function
export const normalizeCart = (checkout: Checkout): Cart => {
	return {
		id: checkout.id,
		createdAt: checkout.createdAt,
		currency: {
			code: checkout.totalPriceV2.currencyCode,
		},
		taxesIncluded: checkout.taxesIncluded,
		lineItemsSubtotalPrice: Number(checkout.subtotalPriceV2.amount),
		totalPrice: checkout.totalPriceV2.amount,
		lineItems: checkout.lineItems.edges.map(normalizeLineItem),
		discounts: [],
	};
};
