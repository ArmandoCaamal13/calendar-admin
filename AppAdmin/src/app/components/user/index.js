import React from 'react'
import style from './style.module.scss'

const User = () => {
    return(
        <div className = {style.user}>
            <img className = {style.user__img} src='https://snews.pro/assets/images/2021-02/Keanu-Reeves1.jpg' />
            <div className = {style.user__info}>
                <div className = {style.user__name}>Esteban Guzman</div>
                <div className = {style.user__type}>Admin</div>
            </div>
        </div>
    )
}

export default User