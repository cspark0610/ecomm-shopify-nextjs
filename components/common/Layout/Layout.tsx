import React, { FC, ReactNode } from "react";
// styles
import s from "./Layout.module.css";
//components
import { Footer, Navbar } from "@components/common";

export interface LayoutProps {
	children: ReactNode;
}
const Layout: FC<LayoutProps> = ({ children }) => {
	return (
		<div className={s.root}>
			<Navbar />
			<main className="fit">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
