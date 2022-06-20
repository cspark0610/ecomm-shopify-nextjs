// types
import { FC, ReactNode } from "react";
//styles
import s from "./Grid.module.css";

const Grid: FC<{ children: ReactNode }> = ({ children }) => {
	return <div className={s.root}>{children}</div>;
};

export default Grid;
