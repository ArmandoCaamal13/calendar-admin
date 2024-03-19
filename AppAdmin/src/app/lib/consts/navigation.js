import React from 'react'
import { HiOutlineViewGrid, HiCalendar, HiCollection, HiOutlineLogout } from "react-icons/hi";

export const LINKS = [
    {
        key: 'Home',
        label: 'Home',
        path: '/',
        icon: <HiOutlineViewGrid/>
    },
    {
        key: 'Meta Tags' ,
        label: 'Meta Tags',
        path: '/create-file',
        icon: <HiCollection/>
    },
    {
        key: 'Schedules' ,
        label: 'Schedules',
        path: '/create-schedule',
        icon: <HiCalendar/> 
    }
]

export const LINKS_BOTTOM = [
    
]
