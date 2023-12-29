import React from 'react'
import { Row,Col,DatePicker,Switch,Card } from 'antd'
import { CheckOutlined } from '@ant-design/icons'
import useDaysWeek from '../hooks/useDaysWeek'
import style from '../form.module.scss'

const CalendarEditConditional = ({className}) => {    
    const DAYS_WEEK = useDaysWeek()
    return(
        <Row className = {className}>
            {/* <Col span = {12}>
                <Card title="Date Conditionality">
                    <DatePicker.RangePicker 
                        className = {style.form_date}
                        onChange={()=>{}} 
                    />
                    {
                        DAYS_WEEK.map( (day,key) => [
                            <div className = {style.form_days} key = {key}>
                                <p>{day.name}</p>
                                <Switch  
                                    checkedChildren={<CheckOutlined />} 
                                />
                            </div>   
                        ])
                    }       
                </Card>   
            </Col> */}
        </Row>
    )   
}


export default CalendarEditConditional