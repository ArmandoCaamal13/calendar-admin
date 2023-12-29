import React from 'react'
import { Row, Col } from 'antd'

const ContainerSideBar = ({children}) => {
    return (
        <Row className='u-container'>
            <Col span={1} className = 'u-stiky'>
                {/* <List /> */}
            </Col>
            <Col span ={20}>
                {children}
            </Col>
        </Row>            
    )
}   

export default ContainerSideBar