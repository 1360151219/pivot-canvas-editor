import React, { useReducer, useContext, Reducer } from 'react';
import { GlobalContextProps } from './types';
const initialState = {} as GlobalContextProps;
const GlobalContext = React.createContext<{ state: GlobalContextProps; dispatch: React.Dispatch<any> }>({} as any);

const reducer: Reducer<GlobalContextProps, any> = (state, action) => {
  switch (action.type) {
    case 'initCanvas':
      return { canvas: action.payload.canvas };
    case 'decrement':
      return { canvas: action.payload.canvas };
    default:
      return state;
  }
};

export const GlobalProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GlobalContext.Provider value={{ state, dispatch }}>{children}</GlobalContext.Provider>;
};

export const useGlobal = () => {
  return useContext(GlobalContext);
};
