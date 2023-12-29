import { FontAwesomeIcon } from '@fortawesome/react-fontawesome/index';
import { faBars, faCogs } from '@fortawesome/free-solid-svg-icons/index';
import React from 'react';
import style from './style.module.scss';
import AdminLogo from '../../../public/icon/admin.svg';
import UserLogo from '../../../public/icon/user.svg';

const Header = ({ collapsed, user, onLogout }) => {
    const renderUserSection = () => {
        if (user) {
            return (
                <div className={style.header__user}>
                    <span>{user.username}</span>
                    <button onClick={onLogout}>Cerrar sesión</button>
                    <FontAwesomeIcon icon={faCogs} />
                </div>
            );
        } else {
            return (
                <a href='/login'>
                    <img src={UserLogo} className='u-margin-r-1' />
                </a>
            );
        }
    };

    return (
        <div className={style.header}>
            <div className='u-flex'>
                <img src={AdminLogo} width='100' height='auto' className='u-margin-r-6' />
                <div className={style.header__menu} onClick={collapsed}>
                    <FontAwesomeIcon icon={faBars} className={style.header__icon} />
                </div>
            </div>
            {renderUserSection()}
        </div>
    );
};

export default Header;
