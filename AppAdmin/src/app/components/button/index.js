import React from 'react'
import style from './style.module.scss'

const Button = ({ name,children,className,theme }) => {
    return(
        <button className = {[className,style.button,style[`button__${theme}`]].join(' ')}>
            <div>{name}</div>
            {children}
        </button>
    )
}

export default Button