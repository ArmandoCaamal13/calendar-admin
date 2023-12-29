import React,{ useContext, useEffect, useState } from "react"
import { Row, Col } from 'antd'
import ContainerSideBar from "../../containers/body/sub_sidebar"
import Search from "components/search"
import Table from "../../containers/domain_file/table"
import { MetaTagsProvider } from "components/context/metaTags"
import Menu from '../../containers/domain_file/menu'
import List from "components/list/index"
import TextAreaSeo from "components/textarea-seo/index"
import CardView from "components/Cards/index"



const DomainsFile = () => {
    return(
        <MetaTagsProvider>
            <ContainerSideBar>
                <Row>
                    <Col span={16} offset={4}>                   
                        {/* <Search />
                        <Menu /> */}
                    </Col>     
                    <Col span={22} offset={1}  className = 'u-margin-t-2'>
                        {/* <List /> */}
                    
                    </Col>                                  
                </Row>
                <Row>
                    {/* <TextAreaSeo /> */}
                    <CardView/>
                </Row>                       
            </ContainerSideBar>
        </MetaTagsProvider>
    )
}

export default DomainsFile