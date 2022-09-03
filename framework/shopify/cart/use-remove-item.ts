import useCart from "@common/cart/use-cart";
import useRemoveItem, { UseRemoveItem } from "@common/cart/use-remove-item";
import { Cart } from "@common/types/cart";
import { MutationHook } from "@common/types/hooks";
import { CheckoutLineItemsRemovePayload } from "@framework/schema";
import { checkoutToCart, getCheckoutId } from "@framework/utils";
import { checkoutLineItemsRemoveMutation } from "@framework/utils/mutations";

export default useRemoveItem as UseRemoveItem<typeof handler>;

export type RemoveItemDescriptor = {
	fetcherInput: {
		id: string;
	};
	fetcherOutput: {
		checkoutLineItemsRemove: CheckoutLineItemsRemovePayload;
	};
	data: Cart;
};

export const handler: MutationHook<RemoveItemDescriptor> = {
	fetcherOptions: {
		query: checkoutLineItemsRemoveMutation,
	},
	async fetcher({ input: { id }, fetch, options }) {
		const { data } = (await fetch({
			...options,
			variables: {
				checkoutId: getCheckoutId(),
				lineItemIds: [id],
			},
		})) as any;

		const cart = checkoutToCart(data.checkoutLineItemsRemove.checkout);
		return cart;
	},
	useHook:
		({ fetch }: any) =>
		() => {
			const { mutate: updateCart } = useCart();
			return async (input: any) => {
				const data = await fetch(input);
				updateCart(data);
				return data;
			};
		},
};
