//dinamic page folder products -> [slug of product] => /products/[slug]

// react, next utils
import { useRouter } from "next/router";
// components
import { Layout } from "@components/common";
// types
import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
// framework
import { getAllProductsPaths, getProduct } from "@framework/product";
import { getConfig } from "@framework/api/config";

// fetch all products slugs, siempre retorna un objeto deforma { paths: [ { params: { slug: 'string' } } ] }
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

// provide product specific data to the page, siempre retorna un objeto de formato { props: { product: { slug: ... } } }
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ slug: string }>) => {
	const config = getConfig();

	const { product } = await getProduct({
		config,
		variables: { slug: params?.slug },
	});
	console.log("aca", product);

	return {
		props: {
			product,
		},
	};
};
// la function ahora recibira por props el objeto que retorna el getStaticProps
export default function ProductSlug({ product }: InferGetStaticPropsType<typeof getStaticProps>) {
	// console.log(product);
	return (
		<div>
			<h2>{product?.name}</h2>
			<h2>{product?.slug}</h2>
		</div>
	);
}

ProductSlug.Layout = Layout;
