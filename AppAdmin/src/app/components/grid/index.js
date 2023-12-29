import React from 'react'
import style from './style.module.scss'

const Grid = ({ spacing = null, children,className }) => {
    return (
        <div className = {[
            className,
            style.grid,
            style[`grid__spacing-${spacing}`]
        ].join(' ')}>
            {children}
        </div>
    )
}

const Colum = ({children,colum}) => {
    return(
        <div className={style[`grid__${colum}`]}>
            {children}
        </div>
    )
}

export { Grid,Colum }