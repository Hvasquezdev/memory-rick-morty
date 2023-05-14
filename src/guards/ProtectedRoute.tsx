import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  hasAccess: boolean;
}

const ProtectedRoute = ({ hasAccess, children }: ProtectedRouteProps) => {
  if (!hasAccess) return <Navigate to='/' replace />;

  return <>{children}</>;
};

export default ProtectedRoute;
