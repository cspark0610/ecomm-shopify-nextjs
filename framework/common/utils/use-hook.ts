import { useApiProvider } from "@common";
import { MutationHook } from "@common/types/hooks";
import { ApiHooks } from "../types/api";

export const useHook = (fn: (apiHooks: ApiHooks) => MutationHook) => {
	const { hooks } = useApiProvider();
	return fn(hooks);
};

export const useMutationHook = (hook: MutationHook) => {
	return hook.useHook({
		fetch: (input: any) => {
			return hook.fetcher({
				input,
				fetch: async (input: any) => {
					return {
						data: JSON.stringify(input) + "__modified",
					};
				},
			});
		},
	});
};
