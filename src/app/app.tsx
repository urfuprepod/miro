import { AppHeader } from "@/features/header";
import { Outlet } from "react-router-dom";
import { Providers } from "./providers";

export function App() {
    return (
        <Providers>
            <div className="bg-gray-100 min-h-screen flex flex-col">
                <AppHeader />
                <Outlet />
            </div>
        </Providers>
    );
}
