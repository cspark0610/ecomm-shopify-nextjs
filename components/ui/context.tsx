import { createContext, FC, useContext, useReducer } from "react";

interface Props {
	children: any;
}
export interface StateModifiers {
	openSidebar: () => void;
	closeSidebar: () => void;
}
export interface StatesValues {
	isSidebarOpen: boolean;
}
const stateModifiers: StateModifiers = {
	openSidebar: () => {},
	closeSidebar: () => {},
};
const initialState = {
	isSidebarOpen: false,
};
type State = StatesValues & StateModifiers;
type Action = { type: "OPEN_SIDEBAR" | "CLOSE_SIDEBAR" };

// 1.1 create a reducer function that will set isSidebarOpen to true or false depending on the action type
const uiReducer = (state: StatesValues, action: Action) => {
	switch (action.type) {
		case "OPEN_SIDEBAR":
			return { ...state, isSidebarOpen: true };
		case "CLOSE_SIDEBAR":
			return { ...state, isSidebarOpen: false };
	}
};

//1. Create a new context with createContext()
const UIContext = createContext<State>({
	...initialState,
	...stateModifiers,
});

//2. armar un componente funcional el cual recibe children y retorna el contexto.Provider
//1.2 useReducer hook , const  [state, dispatch] = useReducer(uiReducer, initialState);
export const UIProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(uiReducer, initialState);

	const openSidebar = () => dispatch({ type: "OPEN_SIDEBAR" });
	const closeSidebar = () => dispatch({ type: "CLOSE_SIDEBAR" });

	const value = {
		...state, // equivalente a la ultima linea
		openSidebar,
		closeSidebar,
		// isSidebarOpen: state.isSidebarOpen,
	};

	return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

// 3. armar el hook (por convencion debe empezar con "use") para consumir el contexto, usar la funcion useContext()
export const useUI = () => {
	const context = useContext(UIContext);
	return context;
};

//4. ir a la page ppal y envolver el componente con el componente funcional creado en el paso 2, UIProvider

//5. consumir en cualquier componente el contexto, usar la funcion hook creada en el paso 3 useUI()
