import Link from "next/link";
import React, { FC } from "react";
import s from "./Usernav.module.css";
import { Heart, Bag as Cart } from "@components/icons";
import { useUI } from "@components/ui/context";
import useCart from "@framework/cart/use-cart";
import { LineItem } from "@common/types/cart";

const Usernav: () => JSX.Element = () => {
	const ui = useUI();
	const { data } = useCart();
	// console.log(data, "data in usernav");

	const itemsCount =
		data?.lineItems.reduce((count: number, lineItem: LineItem) => {
			return count + lineItem.quantity;
		}, 0) ?? 0;

	return (
		<nav>
			<ul className={s.list}>
				<li className={s.item}>
					<Cart onClick={ui.openSidebar} />
					{itemsCount > 0 && <span className={s.bagCount}>{itemsCount}</span>}
				</li>
				<li className={s.item}>
					<Link href="/wishlist">
						<a>
							<Heart />
						</a>
					</Link>
				</li>
			</ul>
		</nav>
	);
};

export default Usernav;
