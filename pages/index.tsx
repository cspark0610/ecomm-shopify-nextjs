// types
import type { InferGetStaticPropsType } from "next";
//utils frameworks
import getAllProducts from "@framework/product/get-all-products";
import { getConfig } from "@framework/api/config";
//componentes absolute paths
import { Layout } from "@components/common";
import { ProductCard } from "@components/product";
import { Grid } from "@components/ui";

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
	return (
		<>
			<Grid>
				{products.slice(0, 3).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
		</>
	);
}
// instead of wrapping with Layout tag in home declare this
Home.Layout = Layout;
