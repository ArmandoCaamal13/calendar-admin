import React, { useState } from 'react'
import style from './style.module.scss'

import { Link } from 'react-router-dom'

import { Menu as Options } from 'antd';
import 
{   FileSearchOutlined,
    CalendarOutlined,
    HomeOutlined
} from '@ant-design/icons';

const Menu = ({ className, collapsed }) => {


    return (
        <React.Fragment>
            <div className={style.menu}>
                <Options
                    defaultSelectedKeys={["1"]}
                    mode="inline"
                    //theme="dark"
                    className={style.menu}
                >
                    <div className={style.menu__item}>
                    <Options.Item key="1" icon={<HomeOutlined style={{fontSize:'1rem'}} />}>
                        <Link to='/'>
                            Home
                        </Link>
                    </Options.Item>
                    <Options.Item key="2" icon={<FileSearchOutlined style={{fontSize:'1rem'}}/>}>
                        <Link to='/create-file'>
                            Meta Tags
                        </Link>
                    </Options.Item>
                    <Options.Item key="3" icon={<CalendarOutlined style={{fontSize:'1rem'}}/>}>
                        <Link to='/create-schedule'>
                            Fechas
                        </Link>
                    </Options.Item>
                    {/* <Options.Item key="4" icon={<CalendarOutlined />}>
                        <Link to='/refactorizacion-create-schedule'>
                            Calendar Edit
                        </Link>
                    </Options.Item> */}
                    </div>
                </Options>
            </div>
        </React.Fragment>
    )
}

export default Menu