// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-2xl font-bold">
          <Link to="/">TodoApp</Link>
        </div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Home
            </Link>
          </li>
          <li>
            <Link to="/login" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Login
            </Link>
          </li>
          <li>
            <Link to="/Signup" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              Signup
            </Link>
          </li>
          {/* <li>
            <Link to="/todo" className="text-white hover:bg-gray-700 px-3 py-2 rounded">
              TodoList
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
    <Outlet />
    </>
  );
};

export default Navbar;
