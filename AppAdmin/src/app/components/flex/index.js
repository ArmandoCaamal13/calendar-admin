import React from 'react'
import style from './style.module.scss'

const Flex = ({ children,className }) => {
    return(
        <div className = {[style.flex,className].join(' ')}>
            {children}
        </div>
    )
}

export default Flex