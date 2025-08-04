import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { createGStore } from "create-gstore";

type Session = {
    userId: string;
    email: string;
    exp: number;
    lat: number;
};
const TOKEN_KEY = "token";
export const useSession = createGStore(() => {
    const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY));

    const login = (token: string) => {
        localStorage.setItem(TOKEN_KEY, token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem(TOKEN_KEY);
        setToken(null);
    };

    const session = token ? jwtDecode<Session>(token) : null;

    const refreshToekn = async () => {
        if ()
    }

    return { token, login, logout, session };
});
