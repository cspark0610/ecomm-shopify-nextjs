// sirve como wrapper de todos los componentes de la aplicacion
//styles
import "@assets/main.css";
//types
import { LayoutProps } from "@components/common/Layout/Layout";
import { AppProps } from "next/app";
import { FC } from "react";

const Noop: FC<LayoutProps> = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }: AppProps & { Component: { Layout: FC<LayoutProps> } }) {
	const Layout = Component.Layout ?? Noop;
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
