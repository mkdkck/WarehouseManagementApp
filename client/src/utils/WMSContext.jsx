import { createContext, useContext, useReducer } from "react";
import reducer from './reducers'

const WMSContext = createContext();

export const useWMSContext = () => useContext(WMSContext);

export const WMSProvider = ({ children }) => {
    const WMSState = useReducer(reducer);

    return (
        <WMSContext.Provider value={WMSState}>
            {children}
        </WMSContext.Provider>);
};


