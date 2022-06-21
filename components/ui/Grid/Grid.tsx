// types
import { FC, ReactNode } from "react";
//styles
import s from "./Grid.module.css";
import cn from "classnames";

interface GridProps {
	children: ReactNode[];
	layout?: "A" | "B";
}

const Grid: FC<GridProps> = ({ children, layout = "A" }) => {
	const rootClassName = cn(s.root, {
		[s.layoutA]: layout === "A",
		[s.layoutB]: layout === "B",
	});
	return <div className={rootClassName}>{children}</div>;
};

export default Grid;

/*
i m going to recieve 3 items because of the Grid layout system
childen interface
[
  {
    '$$typeof': Symbol(react.element),
    type: [Function: ProductCard],
    key: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4NjQ5NTQyNjE2OTE=',
    ref: null,
    props: { product: [Object] },
    _owner: null,
    _store: {}
  },
  {
    '$$typeof': Symbol(react.element),
    type: [Function: ProductCard],
    key: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4NjUyNzg0MzU1MTU=',
    ref: null,
    props: { product: [Object] },
    _owner: null,
    _store: {}
  },
  {
    '$$typeof': Symbol(react.element),
    type: [Function: ProductCard],
    key: 'Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzY4NjUyNzk2ODA2OTk=',
    ref: null,
    props: { product: [Object] },
    _owner: null,
    _store: {}
  }
] 
*/
