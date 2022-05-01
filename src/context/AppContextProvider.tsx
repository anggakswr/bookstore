import { createContext, useReducer } from "react";

type StateType = {
  searchKeyword: string;
  bookmarkPing: boolean;
};

type KeywordAction = {
  type: "SET_SEARCH_KEYWORD";
  payload: string;
};

type BookmarkAction = {
  type: "SET_BOOKMARK_PING";
  payload: boolean;
};

type ActionType = KeywordAction | BookmarkAction;

const initialState = { searchKeyword: "", bookmarkPing: false };

const reducer = (state: StateType, action: ActionType) => {
  switch (action.type) {
    case "SET_SEARCH_KEYWORD":
      return { ...state, searchKeyword: action.payload };

    case "SET_BOOKMARK_PING":
      return { ...state, bookmarkPing: action.payload };

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
