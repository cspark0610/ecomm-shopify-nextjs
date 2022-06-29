import { useAddItem } from "@common/cart";
import { MutationHook } from "@common/types/hooks";

export default useAddItem;

export const handler: MutationHook = {
	fetcher: (input: any) => {
		console.log("handler fetcher calling", JSON.stringify(input));
	},
	useHook: ({ fetch }: any) => {
		return (input: any) => {
			const response = fetch(input);
			return {
				output: response,
			};
		};
	},
};
