// import { handler } from "@framework/cart/use-add-item";
import { MutationHook } from "@common/types/hooks";
import { useHook } from "@common/utils/use-hook";

const useAddItem = () => {
	const hook: MutationHook = useHook((hooks) => hooks.cart.useAddItem);

	return hook.useHook({
		fetch: hook.fetcher,
	});
};

export default useAddItem;
