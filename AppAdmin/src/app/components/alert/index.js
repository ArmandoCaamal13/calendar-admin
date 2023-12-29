import { Alert } from 'antd'
import React, { useEffect } from 'react'

const CustomAlert = ({ show = false , message = "write message", type = "success", onClose = () => {} }) => {
    useEffect(()=> {
        if(show){
            const time = setTimeout(() => {
                onClose()
                clearTimeout(time);
            },2000)    
        }
    },[show])

    if(show){
        return (
            <Alert 
                message = {message} 
                type = {type} 
                showIcon
            />
        )
    }

    return <React.Fragment></React.Fragment>
}


export default CustomAlert