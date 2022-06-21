import { ComponentType, FC, HTMLAttributes, ReactNode } from "react";

interface Props {
	children: ReactNode | ReactNode[];
	el?: ComponentType<HTMLAttributes<HTMLElement>>;
}

const Container: FC<Props> = ({ children, el: Component = "div" }) => {
	// max-w-8xl was seted in tailwind.config.js
	// el={"h1" as any} se necesita hacer el casting
	return <Component className="px-6 mx-auto max-w-8xl">{children}</Component>;
};

export default Container;
