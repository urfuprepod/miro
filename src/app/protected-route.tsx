import { ROUTES } from '@/shared/model/routes';
import { useSession } from '@/shared/model/session'
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const {session} = useSession();

  if (!session) return <Navigate to={ROUTES.LOGIN} />

  return (
    <Outlet />
  )
}

export default ProtectedRoute
