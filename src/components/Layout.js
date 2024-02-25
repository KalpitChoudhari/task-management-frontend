import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    const token = localStorage.getItem('_user_access_token');
    // localStorage.removeItem('_user_access_token');
    axios.delete('http://localhost:4000/users/sign_out', {
      headers: {
        'Authorization': token
      }
    }
    ).then((response) => {
      if (response.status === 200) {
        localStorage.removeItem('_user_access_token');
        navigate('/sign-in');
      }
    }).catch((error) => {
      console.log(error);
    }
    )
  }


  const routes = [
    {
      name: 'Home',
      link: '/',
    },
    {
      name: 'Sign In',
      link: '/sign-in',
    },
    {
      name: 'Sign Up',
      link: '/sign-up',
    },
    {
      name: 'Sign Out',
      // link: '/sign-out',
      onClick: handleSignOut,
    },
  ]

  return (
    <>
      <nav>
        {
          routes.map(route => (
            <NavLink key={route.name} to={route.link} onClick={route.onClick} >
              {route.name}
            </NavLink>
          ))
        }
      </nav>

      <main>
        {children}
      </main>
    </>
  );
}

export default Layout;
