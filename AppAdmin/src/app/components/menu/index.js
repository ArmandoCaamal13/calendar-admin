import React, { useEffect, useState } from 'react'
//import './style_sidebar.scss'
import { NavLink, Link, useLocation, useNavigate } from 'react-router-dom';
import MenuNavbar from 'components/header/index';
import RouteApp from '../../routers/index';
import Home from '../../pages/home/index';
import { FcBullish } from 'react-icons/fc';
import { LINKS, LINKS_BOTTOM } from '../../lib/consts/navigation';
import classNames from 'classnames';
import { HiOutlineLogout, HiOutlineX, HiOutlineMenu } from "react-icons/hi";
import authService from '../../services/auth.service';


export default function Sidebar() {
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const linkClasses =
        'flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:text-white active:bg-neutral-600 rounded-sm text-base';

    const { pathname } = useLocation();

    const isLoginPage = location.pathname === "/login";

    useEffect(() => {
        // Verifica si el usuario esta autenticado
        const isAuthenticated = authService.getCurrentUser();
        if (!isLoginPage && !isAuthenticated) {
            navigate("/login");
        }
    }, [isLoginPage, navigate]);

    function SidebarLink({ item }) {
        return (
            <Link
                to={item.path}
                className={classNames(
                    pathname === item.path ? 'bg-neutral-700 text-white' : ' text-neutral-400',
                    linkClasses
                )}
            >
                <span className='text-xl'>{item.icon}</span>
                {item.label}
            </Link>
        );
    }

    const handleLogout = async () => {
        authService.logout();
        navigate('/login');
    };

    return (
        <>
            <div className='md:hidden'>
                <button
                    className='fixed bottom-5 right-5 bg-neutral-900 p-3 rounded-full text-white z-10'
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <span className='text-2xl'>
                        {isMobileMenuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
                    </span>
                </button>
                {isMobileMenuOpen && (
                    <div className='z-10 fixed inset-0 bg-black bg-opacity-50 jus' onClick={() => setIsMobileMenuOpen(false)}>
                        <div className='flex flex-col top-0 left-0 bottom-0 bg-neutral-900 w-60 h-100 p-3 text-white'>
                            <div className='flex items-center gap-2 px-1 py-3'>
                                <FcBullish fontSize={24} />
                                <span className='text-neutral-180 text-lg'>Calendar</span>
                            </div>
                            <div className='flex-1 flex mt-5 flex-col gap-5'>
                                {LINKS.map((item) => (
                                    <SidebarLink key={item.key} item={item} />
                                ))}
                            </div>
                            <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700 '>
                                {/* {LINKS_BOTTOM.map((item) => (
                                    <SidebarLink key={item.key} item={item} />
                                ))} */}
                                <div
                                    onClick={handleLogout}
                                    className={classNames(' text-red-500 cursor-pointer', linkClasses)}
                                >
                                    <span className='text-xl'>
                                        <HiOutlineLogout />
                                    </span>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className='hidden md:flex md:flex-col md:fixed md:inset-0 md:bg-neutral-900 md:w-60 md:p-3 md:text-white'>
                <div className='flex items-center gap-2 px-1 py-3'>
                    <FcBullish fontSize={24} />
                    <span className='text-neutral-180 text-lg'>Calendar</span>
                </div>
                <div className='flex-1 flex mt-5 flex-col gap-5'>
                    {LINKS.map((item) => (
                        <SidebarLink key={item.key} item={item} />
                    ))}
                </div>
                <div className='flex flex-col gap-0.5 pt-2 border-t border-neutral-700'>
                    {LINKS_BOTTOM.map((item) => (
                        <SidebarLink key={item.key} item={item} />
                    ))}
                    <div
                        onClick={handleLogout}
                        className={classNames(' text-red-500 cursor-pointer', linkClasses)}
                    >
                        <span className='text-xl'>
                            <HiOutlineLogout />
                        </span>
                        Logout
                    </div>
                </div>
               
            </div>
            
        </>
    );
}


