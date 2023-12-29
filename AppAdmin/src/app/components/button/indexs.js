import React from "react"
import style from './style.module.scss'

const Button = ({ 
    click, 
    name = 'button', 
    color = '',
    className
}) =>{
    return(
       <input 
            className = {[className,style.button,style[`button__${color}`]].join(' ')}
            type = 'button' 
            value = {name} 
        />
    )
}

export default Button