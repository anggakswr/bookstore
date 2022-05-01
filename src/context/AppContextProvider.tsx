import { createContext, useReducer } from "react";

type StateType = {
  searchKeyword: string;
};

type ActionType = {
  type: "SET_SEARCH_KEYWORD";
  payload: string;
};

const initialState = { searchKeyword: "" };

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_SEARCH_KEYWORD":
      return { searchKeyword: action.payload };

    default:
      return state;
  }
};

type ContextType = {
  appState: StateType;
  appDispatch: (obj: ActionType) => void;
};

export const AppContext = createContext({} as ContextType);

type AppContextType = {
  children: React.ReactNode;
};

const AppContextProvider = ({ children }: AppContextType) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ appState: state, appDispatch: dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
