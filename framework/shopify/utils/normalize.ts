import { Product as ShopifyProduct, ImageEdge, CurrencyCode, MoneyV2 } from "../schema";
import { Product } from "@common/types/product";

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

export function normalizeProduct(productNode: ShopifyProduct): Product {
	const { id, title: name, handle, vendor, description, images: imageConnection, priceRange, ...rest } = productNode;

	const product = {
		id,
		name,
		vendor,
		description,
		path: `/products/${handle}`,
		slug: handle.replace(/^\/+|\/+$/g, ""),
		images: normalizeProductImages(imageConnection),
		price: normalizeProductPrice(priceRange.minVariantPrice),
		...rest,
	};
	return product;
}
