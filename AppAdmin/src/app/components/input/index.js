import React, { useEffect, useRef, useState } from 'react'
import style from './style.module.scss'
import { Input  } from 'antd'

const CustomInput = ({ placeholder = "input custom" }) => {
    const inputRef = useRef(null);
    const [input_value,set_input_value] = useState(null)
    const [input_open,set_input_open] = useState(false)
    const autoFocus = () => inputRef.current.focus()
    const handlerFocus = () => set_input_open(true)
    const handlerBlur = () => {
        const is_animation =  input_value ? true : false
        set_input_open(is_animation)
    }
    const handlerSelect = (event) => {
        const value = event.target.value
        if(value.trim() !== ""){
            set_input_value(value)
            return
        }

        set_input_value(null)
    }

    return (
        <div className = {[style.input ,input_open? style.select_focus: ""].join(" ")}>
            <Input 
                ref = {inputRef}
                bordered = {false}
                className = {style.input_ant}
                onSelect = {handlerSelect}
                onFocus= {handlerFocus}
                onBlur = {handlerBlur}
                onChange = {handlerSelect}
            />
            <label  onClick={autoFocus} className = {[style.select_label,input_value || input_open? style.select_label_up : ""].join(" ")}>{placeholder}</label>
        </div>
    )
}

export default CustomInput