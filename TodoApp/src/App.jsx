// App.js
import Todo from './components/todo';
import Home from "./components/Home";
import Signup from './components/Signup';
import Layout from './components/Navbar'; // Import the Layout component
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Login from "./components/login";
import { Navigate } from 'react-router-dom'; // used for redirecting
import Cookie from 'js-cookie'; // assuming you're using cookies to store auth status

// ProtectedRoute function to handle authentication
const ProtectedRoute = ({element}) => {
  const isAuthenticated = Cookie.get('mycookie'); // check if cookie is set
  if (!isAuthenticated) {
    return <Navigate to="/login"/>; // redirect to login if not authenticated
  }
  return element; 
}

// Route for signup or redirect
const SignupRoute = ( {element} ) => {
  const isAuthenticated = Cookie.get('mycookie'); 

  if (isAuthenticated) {
    return <Navigate to="/todo" />; 
  }

  return element; 
};

const router = createBrowserRouter( 
  [
    {
      path: "/",
      element: <Layout />, // Use Layout here
      children: [
        {
          index: true, // default route
          element: <Home />,
        },
        {
          path: "login",
          element: <SignupRoute element= {<Login/>}/>, 
          // element:<Login/>
        },
        {
          path: "todo",
          element: <ProtectedRoute element={<Todo />} />, 
        },
        {
          path: "signup",
          element: <SignupRoute element={<Signup />} />,
        }
      ]
    }
  ]
);

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}

