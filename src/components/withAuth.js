import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const withAuth = (Component) => (props) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const authToken = localStorage.getItem('_user_access_token');
      setIsAuthenticated(!!authToken);

      if (!authToken) {
        navigate("/sign-in");
      }
    };

    checkAuth();

  }, [navigate]);

  return isAuthenticated ? <Component {...props} /> : null;
};

export default withAuth;
