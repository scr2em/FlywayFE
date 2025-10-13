import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { useCurrentUserQuery } from '../../api/queries/user';
import { Center, Loader } from '@mantine/core';

interface ProtectedRouteProps {
  children: ReactNode;
  requireOrganization?: boolean;
}

export function ProtectedRoute({ children, requireOrganization = true }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { data: user, isLoading } = useCurrentUserQuery(isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to={`/login${location.search}`} replace />;
  }

  if (isLoading) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  // If organization is required and user doesn't have one, redirect to create organization
  if (requireOrganization && !user?.organization) {
    return <Navigate to={`/create-organization${location.search}`} replace />;
  }

  // If user has organization and tries to access create-organization page, redirect to dashboard
  if (!requireOrganization && user?.organization && location.pathname === '/create-organization') {
    return <Navigate to={`/dashboard${location.search}`} replace />;
  }

  return <>{children}</>;
}

