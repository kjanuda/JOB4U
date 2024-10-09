//import React from 'react'
import React, { useState } from 'react'
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";


const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen)
    };
     
    

    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/my-job", title: "My Jobs" },
        { path: "/salary", title: "Salary estimate" },
        { path: "/post-job", title: "Post A Job" },
      ]

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
    <nav className="flex justify-between items-center py-6">
        <a href="/" className="flex items-center gap-2 text-2xl text-black font-bold">
        <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="29" 
        height="30" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="#3575E2" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="feather feather-briefcase">
            <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
            <path d="M16 3v4H8V3a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2z"></path>
        </svg>
        <span className="text-black font-bold">JOB4U</span></a>

                <ul className="hidden md:flex gap-12">
                    
                        {navItems.map(({ path, title }) => (
                        <li key={path}>
                            <NavLink
                         to = {path}
                         className={({ isActive }) =>
                          isActive ? "active" : ""
                             
                            } 
                        >
                            {title}
                            </NavLink>      
                        </li>
                        ))
                    }
                </ul>

                <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
                    <Link to="/login" className="py-2 px-5 border rounded">LOG IN</Link>
                    <Link to="/sign-up" className="py-2 px-5 border rounded bg-blue text-white">SIGN UP</Link>
                </div>

                <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <>
                <FaXmark className="w-5 h-5 text-primary/75" />
              </>
            ) : (
              <>
                <FaBarsStaggered className="w-5 h-5 text-primary/75" />
              </>
            )}
          </button>
        </div>
        </nav>
            
           {/* mobile menu items */}
      <div
        className={`px-4 bg-white py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
          <br></br>
          

          <li className="py-1 flex space-x-4">
  <Link
    to="/login" // Ensure correct path
    className="bg-green-300 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-green-400"
  >
    Log in
  </Link>
  <Link
    to="/sign-up" // Ensure correct path
    className="bg-gray-500 text-white py-2 px-4 rounded transition-colors duration-300 hover:bg-blue-400"
  >
    Sign up
  </Link>
</li>



        </ul>
      </div>









    </header>
  );
};

export default Navbar;
