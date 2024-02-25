import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => (props) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] =  useState(false);

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('_user_access_token');

    setIsAuthenticated(isAuthenticated);

    if (!isAuthenticated) {
      navigate("/sign-in");
    }
  }, [])

  if (isAuthenticated) {
    return <Component {...props} />;
  }
};

export default withAuth;
