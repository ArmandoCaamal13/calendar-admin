import React, { Fragment, useEffect, useState } from 'react'
import { DatePicker,Empty,List } from 'antd'
import { CloseOutlined } from '@ant-design/icons'
import style from './date.module.scss'
import moment from 'moment'

const ListDate = ({ defaultDates }) => {

    const [listDate,setListDate] = useState([])

    useEffect(()=>{
        if(Array.isArray(defaultDates)){
            setListDate(defaultDates?.Date)
        }
    },[defaultDates])

    const addDate = (moment,date) => {
        const getCurrentListDate = [...listDate]
        getCurrentListDate.push(date)
        defaultDates.Date = getCurrentListDate
        setListDate(getCurrentListDate)
    }

    const deleteDate = (event) => {
        const position = event.currentTarget.dataset.position
        const getCurrentListDate = [...listDate]
        const filterListDate = getCurrentListDate.filter( (item,index) => index != position)
        defaultDates.Date = getCurrentListDate
        setListDate(filterListDate)
    }

    return(
        <Fragment>
            <DatePicker  className = {style.datepicker} format = "YYYY/MM/DD" onChange = {addDate} />
            {
                listDate.length === 0 ?
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                        height: 60,
                        }}
                        description={
                        <span>
                            date empty
                        </span>
                        }
                    />
                : null
            }
            {
                listDate.length > 0 ? 
                    <List  
                        className = {style.date_list}
                        dataSource={listDate}
                        renderItem={(Item,key) => (
                        <List.Item key={key} className = {style.date_list_item}>
                            <div>{Item}</div>
                            <div  
                                data-position = {key}                                
                                className = {style.date_close} 
                                onClick = {deleteDate}
                            >
                                <CloseOutlined />
                            </div>
                        </List.Item>
                    )}
                />     
                :null
            }  
        </Fragment>
    )
}


export default ListDate