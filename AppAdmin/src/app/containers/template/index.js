import  React, { useState } from 'react'
import Header from 'components/header'
import Menu from 'components/menu'
import style from './style.module.scss'
import { Layout } from 'antd';
import { Provider } from 'react-redux';
import store from '../../store'

const { Sider, Content } = Layout;

const AdminTemplate = ({children}) => {
    const [collapsed,setCollapsed] = useState(false)
    const ToggleCollapsed = () => setCollapsed(!collapsed)

    return(
        <Provider store = {store}>
            <Layout>
                <Header collapsed = {ToggleCollapsed} />
                <Layout hasSider>
                    <div className = {style.template__menuContainer}>
                        <Sider 
                            collapsible
                            trigger={null} 
                            collapsed={collapsed} 
                            breakpoint="lg" 
                            theme = 'light'  
                            collapsedWidth = {0}
                            className = {style.template__menu}
                        >
                            <Menu collapsed = {collapsed} />
                        </Sider>
                    </div>
                    <Layout className = {style.template__content}>
                        <Content>
                            {children}
                        </Content>      
                    </Layout>
                </Layout>
            </Layout>
        </Provider>
    )
}

export default AdminTemplate