import { MutationHook } from "@common/types/hooks";
import { useHook, useMutationHook } from "@common/utils/use-hook";

const useAddItem = () => {
	const hook: MutationHook = useHook((hooks) => hooks.cart.useAddItem);

	return useMutationHook({ ...hook });
};

export default useAddItem;
