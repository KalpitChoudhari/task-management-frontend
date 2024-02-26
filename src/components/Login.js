import { ToggleGroup } from "@radix-ui/react-toggle-group";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = ({ type }) => {
  const navigate = useNavigate();
  const [currentType, setCurrentType] = useState(type);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    const URI = currentType === 'signup' ? 'http://localhost:4000/users' : 'http://localhost:4000/users/sign_in';
    const message = currentType === 'signup' ? 'Signed up successfully!' : 'Signed in successfully!';

    await axios.post(URI, {
      user: {
        email: email,
        password: password
      },
      
    }).then((response) => {
      const authToken = response.headers.get('Authorization')
      if (response.status === 200) {
        localStorage.setItem('_user_access_token', authToken);
        toast.success(message);
        navigate('/');
      }
    }).catch((error) => {
      console.log(error);
      if (error.response.status === 401) {
        toast.error('Invalid credentials!');
      } else {
        toast.error('Something went wrong!');
      }
    });
  }

  return (
    <form className="max-w-sm mx-auto mt-44 border px-5 py-10 rounded-md" onSubmit={handleSubmit}>
      <span className="capitalize text-lg">{currentType}</span>
      <div className="mb-5">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
        <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark: dark:" placeholder="email@example.com" required />
      </div>
      <div className="mb-5">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
        <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark: dark:" required />
      </div>
      <button type="submit" className="text-white bg-gray-600 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
      <div class="relative mt-5"><div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div><div class="relative flex justify-center text-xs uppercase"><span class="bg-background bg-white px-2 text-muted-foreground">Or continue with</span></div></div>
      <button className="text-white bg-gray-600 font-medium rounded-md text-sm w-full px-5 py-1 mt-5 text-center" onClick={() => setCurrentType(
        currentType === 'signup' ? 'login' : 'signup'
      )}>
        {
          currentType === 'signup' ? 'Sign In' : 'Sign Up'
        }
      </button>
    </form>
  )
}

export default Login;
