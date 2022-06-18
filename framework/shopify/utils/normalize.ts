import { Product as ShopifyProduct, ImageEdge } from "../schema";
import { Product } from "@common/types/product";

const normalizeProductImages = ({ edges }: { edges: Array<ImageEdge> }) =>
	edges.map(({ node: { originalSrc: url, ...rest } }) => ({
		url: `/images/${url}.jpg`,
		...rest,
	}));

export function normalizeProduct(productNode: ShopifyProduct): Product {
	const { id, title: name, handle, vendor, description, images: imageConnection, ...rest } = productNode;

	const product = {
		id,
		name,
		vendor,
		description,
		path: `/products/${handle}`,
		slug: handle.replace(/^\/+|\/+$/g, ""),
		images: normalizeProductImages(imageConnection),
		...rest,
	};
	return product;
}
