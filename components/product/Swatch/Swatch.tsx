import { FC } from "react";
import s from "./Swatch.module.css";
import cn from "classnames";
import { isDark } from "@lib/color";

// components
import { Check } from "@components/icons";

interface SwatchProps {
	size?: "sm" | "md" | "lg";
	label?: string;
	color?: string;
	variant: "Size" | "Color" | string;
	active?: boolean;
	onClick: () => void;
}
const Swatch: FC<SwatchProps> = ({ color, label, variant, active, size = "md", ...rest }) => {
	label = label?.toUpperCase();

	const rootClassName = cn(s.root, {
		[s.active]: active,
		[s.color]: color,
		[s.size]: variant === "Size",
		[s.dark]: color && isDark(color),
		[s.sm]: size === "sm",
	});
	return (
		<button className={rootClassName} style={color ? { backgroundColor: color } : {}} {...rest}>
			{variant === "Color" && active && (
				<span>
					<Check />
				</span>
			)}
			{variant === "Size" ? label : null}
		</button>
	);
};

export default Swatch;
