import { enableMocking } from "@/shared/api/mocks";
import { ROUTES } from "@/shared/model/routes";
import { useSession } from "@/shared/model/session";
import { Navigate, Outlet, redirect } from "react-router-dom";

const ProtectedRoute = () => {
    const { session } = useSession();

    if (!session) return <Navigate to={ROUTES.LOGIN} />;

    return <Outlet />;
};

export default ProtectedRoute; 

export const ProtectedLoader = async () => {
    await enableMocking();
    const session = await useSession.getState().refreshToken();

    if (!session) {
        return redirect(ROUTES.LOGIN);
    }

    return null;
};
