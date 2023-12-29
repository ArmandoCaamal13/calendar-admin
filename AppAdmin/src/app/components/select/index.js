import React, { useRef, useState } from 'react'
import style from './select.module.scss'
import { Select } from 'antd'
const { Option } = Select;

const CustomSelect = ({ options, placeholder = "select custom",onChange = ()=>{}, disabled = false, children }) => {
    const inputRef = useRef(null);
    const [select_open,set_select_open] = useState(false)
    const [select_value,set_select_value] = useState(null)

    const handlerClean = () => set_select_value(null)
    const handlerFocus = () => set_select_open(true)
    const autoFocus = () => inputRef.current.focus()
    const handlerBlur = () => {
        const is_animation =  select_value ? true : false
        set_select_open(is_animation)
    }
    const handlerSelect = (value) => {
        if(value){
            set_select_value(value)
            onChange(value)
        }
    }

    
    return (      
        <div className = {[style.select ,select_open? style.select_focus: ""].join(" ")}>
            <Select
                ref = {inputRef}
                bordered = {false}
                disabled = {disabled}
                allowClear
                showSearch
                className = {style.select_select_ant}
                onSelect = {handlerSelect}
                onFocus= {handlerFocus}
                onBlur = {handlerBlur}
                onClear = {handlerClean}
                optionFilterProp="children"
                filterOption={(input, option) => option.children.includes(input)}
                filterSort={(optionA, optionB) => optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                }
            >
                {
                    options?
                        options.map((item,key)=>[
                            <Option key = {key} value = {item.value}>{item.name}</Option>
                        ])
                    : 
                    children?
                        children
                    :
                        null
                }
            </Select>
            <div 
                onClick={autoFocus} 
                className = {[style.select_label,select_open? style.select_label_up : ""].join(" ")}
            > 
                {placeholder}
            </div>
        </div>
    )
}

export default CustomSelect