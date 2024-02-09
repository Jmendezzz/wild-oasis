import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '../features/authentication/useUser';
import styled from 'styled-components';
import Spinner from './Spinner';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute() {
  const navigate = useNavigate();
  //1. Load the autenticated user
  const {isLoading, isAutenticated } = useUser();

  useEffect(() => {
    if (!isAutenticated && !isLoading) {
      navigate('/login');
    }
  }, [isAutenticated, isLoading, navigate]);

  if (isLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  if (isAutenticated) {
    return <Outlet />;
  }
}

export default ProtectedRoute;
