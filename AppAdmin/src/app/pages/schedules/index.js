import React from 'react'
import style from './style.module.scss'
import Layout from './layout';
import SitesNavBar from 'components/sitesNavBar'
import { Row, Col, Divider } from 'antd';

const Schedules = () => {
    return(
        <Row className = {['u-container',style.container].join(" ")}>
          <Col span = {24}>
              <Layout />
          </Col>
      </Row>
    )
}

export default Schedules