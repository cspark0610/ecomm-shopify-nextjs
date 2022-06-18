import React, { FC, PropsWithChildren } from "react";
// module.css imports styles
import s from "./Layout.module.css";

const Layout: FC<{ children: any }> = ({ children }: PropsWithChildren<{}>) => {
	return (
		<>
			<div className={s.root} style={{ backgroundColor: "var(--green)" }}>
				<main className="fit">{children}</main>;
			</div>
		</>
	);
};

export default Layout;
