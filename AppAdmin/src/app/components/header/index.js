import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthService from '../../services/auth.service';
import classNames from 'classnames';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

export default function MenuNavbar() {
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();
  const navbarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (navbarRef.current && !navbarRef.current.contains(event.target)) {
        setShowNavbar(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = async () => {
    AuthService.logout();
    navigate('/login');
  };

  const user = AuthService.getCurrentUser();

  return (
    <>
      {/* Navbar */}
      <div className='bg-white h-16 px-4 flex justify-end items-center' >
        {/* Botón de menú para dispositivos móviles */}
        <button className='md:hidden' onClick={handleShowNavbar}>
          {showNavbar ? (
            <HiOutlineX className='text-3xl text-gray-800' />
          ) : (
            // <HiOutlineMenu className='text-3xl text-gray-800' />
            null
          )}
        </button>
        {/* Barra de navegación */}
        <div className='hidden md:flex items-center gap-2 mr-2'>
          <Menu as='div' className='relative'>
            <div>
              <Menu.Button className='ml-2 bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-neutral-400'>
                <span className='sr-only'>Open user Menu</span>
                <div className='h-10 w-10 rounded-full bg-gray-800 bg-cover bg-no-repeat bg-center'>
                  <span className='sr-only'>User</span>
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter='transition ease-out duration-100'
              enterFrom='transform opacity-0 scale-95'
              enterTo='transform opacity-100 scale-100'
              leave='transition ease-in duration-75'
              leaveFrom='transform opacity-100 scale-100'
              leaveTo='transform opacity-0 scale-95'
            >
              <Menu.Items className='origin-top-right z-10 absolute right-0 mt-2 w-48 rounded-sm shadow-md p-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={() => navigate('/profile')}
                      className={classNames(
                        active && 'bg-gray-100',
                        'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                      )}
                    >
                      Your Profile
                    </div>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <div
                      onClick={handleLogout}
                      className={classNames(
                        active && 'bg-gray-100',
                        'active:bg-gray-200 rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
                      )}
                    >
                      Sign out
                    </div>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      {/* Menú desplegable para dispositivos móviles */}
      {showNavbar && (
        <div className='md:hidden absolute top-15 left-0 w-full z-10' >
          <div className='bg-white shadow-md p-2'>
            <div className='flex flex-col gap-5'>
              {/* <NavLink
                to='/profile'
                className='rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
              >
                Your Profiles
              </NavLink>
              <div
                onClick={handleLogout}
                className='rounded-sm px-4 py-2 text-gray-700 cursor-pointer focus:bg-gray-200'
              >
                Sign Out
              </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
