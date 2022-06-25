// sirve como wrapper de todos los componentes de la aplicacion
//styles
import "@assets/main.css";
import "keen-slider/keen-slider.min.css";
//types
import { LayoutProps } from "@components/common/Layout/Layout";
import { UIProvider, useUI } from "@components/ui/context";
import { AppProps } from "next/app";
import { FC } from "react";

const Noop: FC<LayoutProps> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps & { Component: { Layout: FC<LayoutProps> } }) {
	const Layout = Component.Layout ?? Noop;
	return (
		<UIProvider>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</UIProvider>
	);
}

export default MyApp;
