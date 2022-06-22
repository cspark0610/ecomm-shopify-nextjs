import React, { FC, ReactNode } from "react";
// styles
import s from "./Layout.module.css";
//components
import { Footer, Navbar } from "@components/common";
import { Sidebar } from "@components/ui";
import { CartSidebar } from "@components/cart";
import { useUI } from "@components/ui/context";

export interface LayoutProps {
	children: ReactNode;
}
const Layout: FC<LayoutProps & any> = ({ children }) => {
	const ui = useUI();
	// console.log(ui, "ui en layout");

	return (
		<div className={s.root}>
			<Navbar />
			{/* sidebar will be under navbar */}
			<Sidebar isOpen={ui.isSidebarOpen} onClose={ui.closeSidebar}>
				{/*children is CartSidebar*/}
				<CartSidebar />
			</Sidebar>
			<main className="fit">{children}</main>
			<Footer />
		</div>
	);
};

export default Layout;
