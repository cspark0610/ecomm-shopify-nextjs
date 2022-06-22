import Link from "next/link";
import React, { FC } from "react";
import s from "./Usernav.module.css";
import { Heart, Bag as Cart } from "@components/icons";
import { useUI } from "@components/ui/context";

const Usernav: () => JSX.Element = () => {
	const ui = useUI();

	return (
		<nav>
			<ul className={s.list}>
				<li className={s.item}>
					<Cart onClick={ui.openSidebar} />
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
