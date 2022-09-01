import useCart from "@common/cart/use-cart";
import { checkoutToCart, createCheckout, getCheckoutQuery } from "@framework/utils";
import { useMemo } from "react";

export default useCart;

export const handler = {
	fetcherOptions: {
		query: getCheckoutQuery,
	},
	async fetcher({ fetch, options, input: { checkoutId } }: any) {
		let checkout;
		if (checkoutId) {
			const { data } = await fetch({
				...options,
				variables: {
					checkoutId,
				},
			});
			checkout = data.node;
		} else {
			checkout = await createCheckout(fetch);
		}

		const cart = checkoutToCart(checkout);
		// normalize cart
		return checkout;
	},
	useHook: ({ useData }: any) => {
		const data = useData({
			swrOptions: {
				//auto revalidate when window gets focused
				revalidateOnFocus: false,
			},
		});

		return useMemo(() => {
			return data;
		}, [data]);
	},
};
