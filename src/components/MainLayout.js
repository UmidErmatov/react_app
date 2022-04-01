import React, { useState } from 'react';
import { SiderDemo } from './SideMenu';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Layout, Menu, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
} from '@ant-design/icons';
import logo from '../assets/img/logo_white.svg'

const { Header, Content } = Layout;

const MainLayout = () => {
    const { pathname } = useLocation()
    const { t } = useTranslation()
    const [collapsed, setCollapsed] = useState(true)

    const toggle = () => {
        setCollapsed(!collapsed)
    };

    return (
        <Layout style={{ minHeight: '100vh' }} className='site-layout'>
            <Header className="header" style={{ position: 'sticky', width: '100%' }} >
                <Row>
                    <Col flex='auto'>
                        <div className="logo" ><Link to="/"><img src={logo} alt="logo" /></Link></div>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[pathname]} selectedKeys={pathname} >
                            <Menu.Item key="/"><Link to='/' >{t("menus.home")}</Link></Menu.Item>
                            <Menu.Item key="/posts"><Link to='/posts' >{t('menus.posts')}</Link></Menu.Item>
                            <Menu.Item key="/profile"><Link to='/profile' >{t('menus.profile')}</Link></Menu.Item>
                            <Menu.Item key="/call"><Link to='/call' >{t('menus.call')}</Link></Menu.Item>
                        </Menu>
                    </Col>
                    <Col flex='0.1%'>
                        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: toggle,
                        })}
                    </Col>
                </Row>
            </Header>
            <Layout>
                <Content style={{ height: "120%" }}>
                    <Outlet />
                </Content>
                <SiderDemo collapsed={collapsed} />
            </Layout>
        </Layout>
    );
};

export default MainLayout;

