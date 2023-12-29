import React from 'react';
import style from './style.module.scss';
import Input from './input';

const Fieldset = ({ 
    leyend = 'leyend', 
    className = null,
    name = null,
    value = null,
    type = null,
    site
}) => {
    
    return (
        <fieldset className = {[style.accordion__item,className].join(' ')}>
            <legend className = {style.accordion__legend}>{leyend}</legend>                                
            <Input 
                name = {name}
                value = {value}
                type = {type}
                site = {site}
            />
        </fieldset>
    )
} 

export default Fieldset