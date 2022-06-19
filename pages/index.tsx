// types
import type { InferGetStaticPropsType } from "next";
//utils frameworks
import getAllProducts from "@framework/product/get-all-products";
import { getConfig } from "@framework/api/config";
import { Layout } from "@components/common";
//componentes absolute paths

export async function getStaticProps() {
	const config = getConfig();
	const products = await getAllProducts(config);
	// console.log(JSON.stringify(products, null, 2), "normalized products");
	return {
		props: {
			products,
		},
		revalidate: 4 * 60 * 60, // 4 hours
	};
}

export default function Home({ products }: InferGetStaticPropsType<typeof getStaticProps>) {
	return <div className="root">{JSON.stringify(products)}</div>;
}
// instead of wrapping with Layout tag in home declare this
Home.Layout = Layout;
