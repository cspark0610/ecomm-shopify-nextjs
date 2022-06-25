import React, { FC, Children, isValidElement, cloneElement, ReactNode } from "react";
import s from "./ProductSlider.module.css";
import { useKeenSlider } from "keen-slider/react";
import cn from "classnames";

interface ProductSliderProps {
	children: ReactNode | ReactNode[];
}

const ProductSlider: FC<ProductSliderProps> = ({ children }) => {
	const [sliderRef, slider] = useKeenSlider({
		initial: 0,
		// slideChanged(s) {
		// 	console.log(`Slide changed to`, s.details().relativeSlide);
		// },
	});
	return (
		<div className={s.root}>
			<div
				ref={sliderRef as React.RefObject<HTMLDivElement>}
				className="keen-slider h-full transition-opacity duration-150"
			>
				<button onClick={slider?.prev} className={cn(s.leftControl, s.control)} />
				<button onClick={slider?.next} className={cn(s.rightControl, s.control)} />
				{Children.map(children, (child) => {
					if (isValidElement(child)) {
						// return {
						// 	...child,
						// 	props: {
						// 		...child.props,
						// 		className: `${child.props.className ? `${child.props.className}` : ""}keen-slider__slide`,
						// 	},
						// };

						return cloneElement(child, {
							className: `keen-slider__slide`,
						});
					}
					return child;
				})}
			</div>
		</div>
	);
};

export default ProductSlider;
