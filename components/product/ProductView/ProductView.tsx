//utils
import cn from "classnames";
import { FC, useState } from "react";
import Image from "next/image";
import { getVariant } from "../helpers";

//styles
import s from "./ProductView.module.css";

//components
import { Container, Button } from "@components/ui";
import { ProductSlider, Swatch } from "@components/product";
import { Product } from "@common/types/product";
import { useUI } from "@components/ui/context";

//hook function
import useAddItem from "@framework/cart/use-add-item";
import { useApiProvider } from "@framework";

interface Props {
	product: Product;
}

type AvailableChoices = "Size" | "Color" | string;
type Choices = {
	[P in AvailableChoices]: string;
};

const ProductView: FC<Props> = ({ product }) => {
	const [choices, setChoices] = useState<Choices>({});
	const { openSidebar } = useUI();
	const addItem = useAddItem();
	const { hooks, fetcher } = useApiProvider();

	const variant = getVariant(product, choices);

	const addToCart = async () => {
		try {
			const item = {
				productId: String(product.id),
				variantId: variant?.id,
				variantOptions: variant?.options,
				quantity: 1,
			};
			const output = await addItem(item);

			alert(JSON.stringify(output));
			openSidebar();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container>
			<div className={cn(s.root, "fit")}>
				<div className={cn(s.productDisplay, "fit")}>
					<div className={s.nameBox}>
						<h1 className={s.name}>{product.name}</h1>
						<div className={s.price}>
							{product.price.value}
							{` `}
							{product.price.currencyCode}
						</div>
					</div>
					<ProductSlider>
						{product.images.map((image, i) => (
							<div className={s.imageContainer} key={image.url}>
								<Image
									className={s.img}
									src={`${product.images[i].url.split(".").slice(0, 2).join(".")}.png`}
									alt={image.alt}
									width={1050}
									height={1050}
									quality="85"
								/>
							</div>
						))}
					</ProductSlider>
				</div>
				<div className={s.sidebar}>
					<section>
						{product.options.map((option) => (
							<div className="pb-4" key={option.id}>
								<h2 className="uppercase font-medium">{option.displayName}</h2>
								<div className="flex flex-row py-4">
									{option.values.map((optValue) => {
										const activeChoice = choices[option.displayName.toLowerCase()];

										return (
											<Swatch
												key={optValue.label}
												label={optValue.label}
												color={optValue.hexColor}
												variant={option.displayName}
												active={optValue.label.toLowerCase() === activeChoice ? true : false}
												onClick={() => {
													setChoices({
														...choices,
														[option.displayName.toLowerCase()]: optValue.label.toLowerCase(),
													});
													// going to have for.ex { Size: 'm', Color: '#00000'}
												}}
											/>
										);
									})}
								</div>
							</div>
						))}
						<div className="pb-14 break-words w-full max-w-xl text-lg">{product.description}</div>
					</section>
					<div>
						<Button onClick={addToCart} className={s.button}>
							Add to Cart
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ProductView;
