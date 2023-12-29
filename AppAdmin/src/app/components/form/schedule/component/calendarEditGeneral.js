import React, { useEffect, useState } from 'react'
import { Row,Col,Card,Switch } from 'antd'
import ListDate from 'components/listDate'
import useDaysWeek from '../hooks/useDaysWeek'
import { CheckOutlined } from '@ant-design/icons'
import style from '../form.module.scss'

const CalendarEditGeneral = ({ className, data }) => {    
    const DAYS_WEEK = useDaysWeek()
    const [week,setWeek] = useState({
        "Sunday": true,
        "Monday": true,
        "Tuesday": true,
        "Wednesday": true,
        "Thursday": true,
        "Friday": true,
        "Saturday": true
    })

    useEffect(()=>{
        if(data?.Week){
            setWeek(data?.Week)
        }

    },[data?.Week])


    return(
        <Row gutter = {[20,20]} className = {className}>
            <Col span = {14}>
                <Card title="Days of week">
                    {
                        DAYS_WEEK.map( (day,key) => [
                            console.log(day.key),
                            <div className = {style.form_days} key = {key}>
                                <p>{day.name}</p>
                                <Switch 
                                    onChange = {(checked)=>{
                                        console.log(checked)
                                        const _week = {...week}
                                        _week[day.key] = checked
                                        data.Week[day.key] = checked
                                        setWeek(_week)
                                    }}
                                    checked = {week[day.key]}
                                    checkedChildren={<CheckOutlined />} 
                                />
                            </div>   
                        ])
                    }       
                </Card>   
            </Col>
            <Col span = {10}>
                <Card title="Dates of years" className = {style.form_card}>
                    <ListDate defaultDates = {data} />
                </Card>                   
            </Col>                    
        </Row>
    )
}


export default CalendarEditGeneral