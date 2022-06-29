import { getConfig } from "./api/config";
import { ApiProvider as CoreApiProvider, useApiProvider as useCoreApiProvider } from "@common";
import { shopifyHooks } from "./hooks";

const config = getConfig();

interface ShopifyApiProviderProps {
	children: React.ReactNode | React.ReactNode[];
}

export const ApiProvider = ({ children }: ShopifyApiProviderProps) => {
	return (
		<CoreApiProvider hooks={shopifyHooks} config={{ ...config }}>
			{children}
		</CoreApiProvider>
	);
};

export const useApiProvider = () => {
	return useCoreApiProvider();
};
