import { FC, ReactNode } from "react";
import { Container } from "@components/ui";
import Link from "next/link";
import s from "./Navbar.module.css";
import { Usernav } from "@components/common";

const Navbar = () => {
	return (
		<Container>
			<div className={s.root}>
				<div className="flex flex-1 items-center">
					<Link href="/">
						<a className={s.logo}>next-store</a>
					</Link>
					<nav className="ml-6 space-x-8">
						<Link href="/">
							<a className={s.link}>All</a>
						</Link>
						<Link href="/">
							<a className={s.link}>Clothes</a>
						</Link>
						<Link href="/">
							<a className={s.link}>Asesories</a>
						</Link>
						<Link href="/">
							<a className={s.link}>Shoes</a>
						</Link>
					</nav>
					<div className="flex flex-1 justify-end space-x-8">
						<Usernav />
					</div>
				</div>
			</div>
		</Container>
	);
};

export default Navbar;
