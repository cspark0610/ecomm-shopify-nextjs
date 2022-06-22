import { FC, MutableRefObject, useEffect, useRef } from "react";
import { disableBodyScroll, enableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

interface Props {
	children: any;
	isOpen: boolean;
	onClose: () => void;
}

const Sidebar: FC<Props> = ({ children, isOpen, onClose }) => {
	//creamos una referencia del JSX del sidebar de modo que, al tener el sidebar abierto, NO se pueda scrollear
	const ref = useRef() as MutableRefObject<HTMLDivElement>;

	useEffect(() => {
		if (ref.current) {
			if (isOpen) {
				disableBodyScroll(ref.current);
			} else {
				enableBodyScroll(ref.current);
			}
		}
		//return a clenaup function, this is executed when the component is destroy from DOM
		return () => {
			clearAllBodyScrollLocks();
		};
	}, [isOpen]);

	return (
		<>
			{isOpen ? (
				<div ref={ref} className="fixed inset-0 overflow-hidden h-full z-50">
					<div className="absolute inset-0 overflow-hidden">
						<div onClick={onClose} className="absolute inset-0 bg-black bg-opacity-50 transition-opacity" />
						<section className="absolute inset-y-0 right-0 pl-10 max-w-full flex sm:pl-16 outline-none">
							<div className="h-full md:w-screen md:max-w-md">
								<div className="h-full flex flex-col text-base bg-accents-1 shadow-xl overflow-y-auto">{children}</div>
							</div>
						</section>
					</div>
				</div>
			) : null}
		</>
	);
};

export default Sidebar;
