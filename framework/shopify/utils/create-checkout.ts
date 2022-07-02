import { ApiFetcher } from "@common/types/api";
import { checkoutCreateMutation } from "@framework/utils/mutations";
import { Checkout, CheckoutCreatePayload, Maybe } from "@framework/schema";
import Cookies from "js-cookie";
import { SHOPIFY_CHECKOUT_ID_COOKIE, SHOPIFY_CHECKOUT_URL_COOKIE, SHOPIFY_CHECKOUT_EXPIRE } from "../const";

const createCheckout = async (
	fetch: ApiFetcher<{ checkoutCreate: CheckoutCreatePayload }>
): Promise<Maybe<Checkout | undefined>> => {
	const { data } = await fetch({
		query: checkoutCreateMutation,
	});
	const { checkout } = data.checkoutCreate;
	const checkoutId: string = checkout?.id;

	if (checkoutId) {
		const options = {
			expires: SHOPIFY_CHECKOUT_EXPIRE,
		};
		Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options);
		Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl);
	}
	return checkout;
};

export default createCheckout;
