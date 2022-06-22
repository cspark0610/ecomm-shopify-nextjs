// types
import type { InferGetStaticPropsType } from "next";
//frameworks
import { getAllProducts } from "@framework/product";
import { getConfig } from "@framework/api/config";
//componentes absolute paths
import { Layout } from "@components/common";
import { ProductCard } from "@components/product";
import { Grid, Hero, Marquee } from "@components/ui";

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
			<Hero
				headline="Cookies, ice cream text"
				description="Chocolate cake pastry chocolate bar bear claw pie wafer. Chupa chups sugar plum cheesecake halvah candy. Marshmallow powder gummi bears cheesecake tart pudding chocolate chupa chups. Bear claw gummi bears gingerbread bear claw cake muffin marshmallow tiramisu. Wafer oat cake chupa chups chocolate cake marshmallow chupa chups oat cake. Gingerbread candy canes cotton candy topping caramels cake cake. Cupcake sweet roll fruitcake pudding topping gummi bears."
			/>
			<Marquee gradient={false}>
				{products.map((product) => (
					<ProductCard key={product.id} product={product} variant="slim" />
				))}
			</Marquee>
			<Grid layout="B">
				{products.slice(0, 3).map((product) => (
					<ProductCard key={product.id} product={product} />
				))}
			</Grid>
			<Marquee gradient={false} variant="secondary">
				{products.map((product) => (
					<ProductCard key={product.id} product={product} variant="slim" />
				))}
			</Marquee>
		</>
	);
}
// instead of wrapping with Layout tag in home declare this
Home.Layout = Layout;
