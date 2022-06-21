import { FC, ReactNode } from "react";
import s from "./Marquee.module.css";
import ReactFastMarquee from "react-fast-marquee";
import cn from "classnames";

interface MarqueeProps {
	children: ReactNode[];
	direction?: "left" | "right";
	gradient?: boolean;
	variant?: "primary" | "secondary";
}
const Marquee: FC<MarqueeProps> = ({ children, direction = "left", variant = "primary", gradient }) => {
	const rootClassName = cn(s.root, {
		[s.secondary]: variant === "secondary",
	});

	return (
		<div className={rootClassName}>
			<ReactFastMarquee speed={50} gradient={gradient} direction={direction} loop={0} play={true}>
				<div className={s.container}>{children}</div>
			</ReactFastMarquee>
		</div>
	);
};

export default Marquee;
