import React, { useContext,useState,useEffect } from 'react'
import { ISeo } from '../../interface/seo'
import style from './style.module.scss'
import { MetaTagsContext } from 'components/context/metaTags'

const Input = ({name = null,value = null,type = null,site = null}) => {
    const { data,setData } = useContext(MetaTagsContext)
    const [text,seText] = useState('')
    const changesText = (value) => {
        if(type && Array.isArray(data)){
           const _seo = data.map(SITE => {
                if(SITE[ISeo.IDsite] === site){
                    return{
                        ...SITE,
                        Page : SITE.Page.map( item => {
                            if(item[ISeo.Url] === name){
                                return {
                                    ...item,
                                    [type] : value
                                }
                            }
                            return item          
                        })
                    }
                }
                return SITE
            })
            setData(_seo)
        }
    }

    useEffect(()=>{
        const _time = setTimeout(()=>{
            changesText(text)
        },500)    
        return () => clearTimeout(_time)
    },[text, data, site, name, type, setData]);

    useEffect(()=>{
        seText(value)
    },[value])
    return (
        <input 
            className = {style.accordion__input} 
            type="text" 
            value = {text} 
            readOnly = {false}
            onChange = {(e)=> seText(e.target.value)}
        />
    )
}


export default Input