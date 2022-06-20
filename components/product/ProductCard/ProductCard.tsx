// next tags
import Link from "next/link";
import Image from "next/image";
// types
import { FC } from "react";
import { Product } from "@common/types/product";
//styles
import s from "./ProductCard.module.css";

// armamos un componente funcional que reciba como props las key de la interface Product
interface Props {
	product: Product;
}
// for Image src, always point as relative path into public folder
const placeHolderImage = "/product-image-placeholder.svg";

const ProductCard: FC<Props> = ({ product }) => {
	// Link href={`/products/${product.slug}` will navigate to /products/cool-hat
	// to add a className have to use a anchor tag<a></a> inside Link Tag

	const imageUrlNormalized = `${product.images[0].url.split(".").slice(0, 2).join(".")}.png`;
	//
	return (
		<Link href={`/products/${product.slug}`}>
			<a href="" className={s.root}>
				<div className={s.productBg}></div>
				<div className={s.productTag}>
					<h3 className={s.productTitle}>
						<span>{product.name}</span>
					</h3>
					<span className={s.productPrice}>{`${product?.price?.value} ${product?.price?.currencyCode}`}</span>
				</div>
				{product.images && (
					<Image
						className={s.productImage}
						src={`${imageUrlNormalized}` ?? placeHolderImage}
						alt={product.name ?? "product image"}
						height={540}
						width={540}
						quality="85"
						layout="responsive"
					/>
				)}
			</a>
		</Link>
	);
};

export default ProductCard;
