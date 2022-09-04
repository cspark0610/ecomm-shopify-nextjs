import { ButtonHTMLAttributes, ComponentType, FC, HTMLAttributes, ReactNode } from "react";
import s from "./Button.module.css";
import cn from "classnames";
import { LoadingDots } from "@components/ui";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode | ReactNode[];
	isLoading?: boolean;
	Component?: string | ComponentType<HTMLAttributes<HTMLElement>>;
	href?: string;
}

const Button: FC<ButtonProps> = ({
	children,
	className,
	isLoading = false,
	Component = "button",
	...rest
}) => {
	const rootClassName = cn(s.root, className, {
		//aplico la clase "loading" solamente cuando la variable "isLoading" esta en true
		[s.loading]: isLoading,
	});
	return (
		<Component className={rootClassName} type="button" {...rest}>
			{children}
			{isLoading && (
				<i className="pl-2 m-0 flex">
					<LoadingDots />
				</i>
			)}
		</Component>
	);
};

export default Button;
