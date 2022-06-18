// sirve como wrapper de todos los componentes de la aplicacion
//styles
import "@assets/main.css";
//components
import { Layout } from "@components/common";
//types
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;
