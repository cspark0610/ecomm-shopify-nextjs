//dinamic page folder products -> [slug of product] => /products/[slug]

// react, next utils
// components
import { Layout } from "@components/common";
import { ProductView } from "@components/product";
// types
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
// framework
import { getAllProductsPaths, getProduct } from "@framework/product";
import { getConfig } from "@framework/api/config";

//1. getStaticPaths: fetch all products slugs, siempre retorna un objeto deforma { paths: [ { params: { slug: 'string' } } ] }
// fallback:false al navegar a una ruta que no existe lanzara un 404
export const getStaticPaths: GetStaticPaths = async () => {
	const config = getConfig();
	const { products } = await getAllProductsPaths(config);
	return {
		paths: products.map((product) => ({
			params: { slug: product.slug },
		})),
		fallback: false,
	};
};

//2. getStaticProps: provide product specific data to the page, returns object with format: { props: { product: { slug: ... } } }
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
	const config = getConfig();

	const { product } = await getProduct({
		config,
		variables: { slug: params?.slug },
	});
	// console.log("aca", JSON.stringify(product, null, 2));
	return {
		props: {
			product,
		},
	};
};

//3. la function ahora recibira por props el objeto que retorna el getStaticProps
export default function ProductSlug({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
	return <>{product && <ProductView product={product} />}</>;
}

ProductSlug.Layout = Layout;

// <Container>
// 	<div>
// 		<p>id: {product?.id}</p>
// 		<p>name: {product?.name}</p>
// 		<p>price value: {product?.price.value}</p>
// 		<p>price currency: {product?.price.currencyCode}</p>
// 		<p>description: {product?.description}</p>

// 		<h1 className="mb-4 leading-4">OPTIONS</h1>
// 		<div>
// 			{product?.options.map((option) => (
// 				<div key={option.id}>
// 					<p>Name: {option.displayName}</p>
// 					{option.values.map((value) => (
// 						<div key={value.label}>
// 							<p>Value: {value.label}</p>
// 							<p>Hex Color: {value.hexColor}</p>
// 						</div>
// 					))}
// 				</div>
// 			))}
// 		</div>
// 	</div>
// 	<h1 className="mb-4 leading-4">VARIANTS</h1>
// 	<div>
// 		{product?.variants.map((variant) => (
// 			<div key={variant.id}>
// 				<p>Variant Name: {variant.name}</p>
// 				{variant.options.map((option) => (
// 					<div key={option.id}>
// 						<p>Option Name: {option.displayName}</p>
// 						{option.values.map((value) => (
// 							<div key={value.label}>
// 								<p>Label: {value.label}</p>
// 								<p>Hexcolor: {value.hexColor}</p>
// 							</div>
// 						))}
// 					</div>
// 				))}
// 			</div>
// 		))}
// 	</div>
// </Container>
