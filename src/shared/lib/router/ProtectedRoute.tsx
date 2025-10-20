import type { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router';
import { useAuth } from '../auth/AuthContext';
import { useCurrentUserQuery } from '../../api/queries/user';
import { useCurrentOrganization } from '../../hooks';
import { Center, Loader } from '@mantine/core';

interface ProtectedRouteProps {
  children: ReactNode;
  requireOrganization?: boolean;
}

export function ProtectedRoute({ children, requireOrganization = true }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const { isLoading: isLoadingUser } = useCurrentUserQuery(isAuthenticated);
  const { hasOrganizations, isLoading: isLoadingOrg } = useCurrentOrganization();

  if (!isAuthenticated) {
    return <Navigate to={`/login${location.search}`} replace />;
  }

  if (isLoadingUser || isLoadingOrg) {
    return (
      <Center style={{ height: '100vh' }}>
        <Loader size="lg" />
      </Center>
    );
  }

  // If organization is required and user doesn't have one, redirect to create organization
  if (requireOrganization && !hasOrganizations) {
    return <Navigate to={`/create-organization${location.search}`} replace />;
  }

  return <>{children}</>;
}

