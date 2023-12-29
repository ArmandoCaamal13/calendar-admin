import React,{useContext} from 'react';
import { faTrash,faBan,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import style from './style.module.scss'
import { MetaTagsContext } from 'components/context/metaTags'

const IconDetail = ({target}) => {
    const { data,setData } = useContext(MetaTagsContext)
    return(        
        <div className='u-flex'>
            <div className = {['',style.accordion__icon].join(' ')}>
                <FontAwesomeIcon icon = {faEdit} className = {style.accordion__icon__edit}/>
            </div>            
            <div className = {['',style.accordion__icon].join(' ')}>
                <FontAwesomeIcon icon = {faBan} className = {style.accordion__icon_clean}/>
            </div>
            <div className = {[style.accordion__icon].join(' ')} onClick = {(e)=>{
                    e.stopPropagation()
                    console.log('click',target)
                    const temp = data
                    const _data = data.filter( value => value['@Id'] == target.site)[0]
                    const _newData = _data.Page.filter( value => value['@Url'] !== target.url)
                    
                    temp.forEach( value =>{
                        if(value['@Id'] === target.site){
                            value.Page = _newData
                        }
                    })
                    //console.log(temp)
                    setData(temp)
                    target.setFetch(!target.fetch)
                }}>
                <FontAwesomeIcon icon = {faTrash} className = {style.accordion__icon_delete} />
            </div>
        </div>                        
    )
}

export default IconDetail