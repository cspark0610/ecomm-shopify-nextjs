import { useApiProvider } from "@common";
import { MutationHook } from "@common/types/hooks";
import { ApiHooks } from "../types/api";

export const useHook = (fn: (apiHooks: ApiHooks) => MutationHook) => {
	const { hooks } = useApiProvider();
	return fn(hooks);
};

export const useMutationHook = (hook: MutationHook) => {
	const { fetcher } = useApiProvider();

	return hook.useHook({
		fetch: (input: any) => {
			return hook.fetcher({
				input,
				fetch: fetcher,
				options: hook.fetcherOptions,
			});
		},
	});
};
