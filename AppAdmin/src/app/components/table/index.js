import React,{ Fragment } from 'react'
import { Pagination,Tabs,Button  } from 'antd';
import style from './style.module.scss'

const Table = ({ children,onChange,onPagination })  => {

    return (
        <div className = {style.table}>
            <div className = {style.table_head}>                
                <Tabs defaultActiveKey="1" onChange  = {onChange}>
                    <Tabs.TabPane tab="Date general" key = "1"/> 
                    <Tabs.TabPane tab="Dates conditiont" key = "2"/>
                </Tabs>                            
            </div>
            <div  className = {style.table_body}>
                {children}
            </div>
        </div>
    )
}


export default Table