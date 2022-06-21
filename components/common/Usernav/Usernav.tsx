import Link from "next/link";
import React, { FC } from "react";
import s from "./Usernav.module.css";
import { Heart, Bag as Cart } from "@components/icons";

interface UsernavProps {}

const Usernav = () => {
	return (
		<nav>
			<ul className={s.list}>
				<li className={s.item}>
					<Cart />
				</li>
				<li className={s.item}>
					<Link href="/">
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
