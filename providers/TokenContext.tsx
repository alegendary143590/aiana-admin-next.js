import { createContext, useContext, useState } from 'react';

// Create the context
interface TokenState {
    token: string;
    setToken: React.Dispatch<React.SetStateAction<string>>;
}
const TokenContext = createContext<TokenState | undefined>(null);


// Provider component that wraps your app and makes the token value available globally
const TokenProvider = ({ children }) => {
    const [token, setToken] = useState("");
    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    );
};

// Custom hook to use the token context values
export const useToken = () => {
    const context = useContext(TokenContext);
    if (context === undefined) {
        throw new Error("useToken must be used within a TokenProvider");
    }
    return context;
};

export default TokenProvider