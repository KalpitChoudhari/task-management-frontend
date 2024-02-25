import { NavLink } from "react-router-dom";

const Layout = ({ children }) => {
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
      link: '/sign-out',
    },
  ]

  return (
    <>
      <nav>
        {
          routes.map(route => (
            <NavLink key={route.link} to={route.link} activeStyle={{ fontWeight: 'bold' }}>
              {route.name}
            </NavLink>
          ))
        }
      </nav>

      <main>
        <h2>This is layout</h2>
        {children}
      </main>
    </>
  );
}

export default Layout;
