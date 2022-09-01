import { Checkout, Maybe } from "@framework/schema";
import { normalizeCart } from "./normalize";

const checkoutToCart = (checkout?: Maybe<Checkout>) => {
	//normalize function checkout
	if (!checkout) throw new Error("Missing checkout object");

	return normalizeCart(checkout);
};

export default checkoutToCart;
