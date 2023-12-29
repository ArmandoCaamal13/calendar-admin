import React, { useState,useEffect } from 'react'
import style from './prueba.module.scss'
import Layout from '../schedules/layout'
import Table from 'components/table'
import FormSchedule from 'components/form/schedule'
import { Col, Row, Breadcrumb,Typography,Card,Button,Space   } from 'antd'
import { HomeOutlined, UserOutlined ,AppstoreAddOutlined,DeleteOutlined} from '@ant-design/icons'
import Calendar from 'components/calendar'
import 'components/calendar/style.scss'

const PageSchedule = () => {
    const [tab,setTap ] = useState("1")

    useEffect(()=>{
        const date = new Date()
        if(document.querySelector("#calendario")){
            const calendar = new Calendar({
                selector: "#calendario",
                formatMonth: 'long',
                formatWeekDay: 'short',
                lang: "es",
                initialDate: '',                                
                onSelect: (date) => {
                    
                }
            })                       
        }
    },[])

    return (
        <Space className = "u-container" direction="vertical">
            <Row>
                <Col span = {19}>
                    <Typography.Title>Calendar Edit </Typography.Title>
                    <Breadcrumb>                        
                        <Breadcrumb.Item href="">
                            <HomeOutlined />
                        </Breadcrumb.Item>
                        <Breadcrumb.Item href="">
                            Calendar
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>Edit</Breadcrumb.Item>
                    </Breadcrumb>
                </Col>
                <Col span = {5}>
                    <Button className = {style.table__button_delete} size= "small" icon = {<DeleteOutlined />} > Delete Date </Button>
                    <Button className = {style.table__button_add} size= "small" icon = {<AppstoreAddOutlined />} > Add Date </Button>
                </Col>
            </Row>
            <Row className = "u-margin-t-2">    
                <Col span = {17}>
                    <Table onChange = {(tapKey) => setTap(tapKey)} onPagination = {(page,pageSize)=>{}}>
                        <Row>
                            <Col span = {24}>
                                <FormSchedule tabKey = {tab} />                               
                            </Col>
                            <Col span = {7} offset = {1}>
                                <Card title="Calendar">
                                    <div id = "calendario"></div>
                                </Card>
                            </Col>
                        </Row>
                    </Table>
                </Col>
                <Col span = {6} offset = {1} >
                                <Card title="Calendar">
                                    <div id = "calendario"></div>
                                </Card>
                            </Col>
                <Col span = {7} offset = {1}>
                    <Card title="Calendar">
                        <div id = "calendario"></div>
                    </Card>
                </Col>
            </Row>
        </Space>
    )
}

export default PageSchedule