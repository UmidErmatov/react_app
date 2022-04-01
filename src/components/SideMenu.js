import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { useLogoutMutation } from '../app/auth';
import { Spinner } from './Spinner';
import { logout_clear } from '../features/auth/authSlice';
import {
    UserOutlined,
    GlobalOutlined,
    LogoutOutlined,
    WechatOutlined
} from '@ant-design/icons';

const { Sider } = Layout;
const { confirm } = Modal;
const { SubMenu } = Menu;

export const SiderDemo = ({ collapsed }) => {
    const isAuth = useSelector(state => state.auth.isAuth)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
    const [logout, { isLoading }] = useLogoutMutation()
    const { t, i18n } = useTranslation()
    const currentLan = Cookies.get('i18next') || 'uz'

    useEffect(() => {
        !isAuth && navigate('/login', { replace: true })
    }, [isAuth, navigate])


    const changeLan = (lan) => {
        i18n.changeLanguage(lan)
    }

    const languages = [
        {
            code: "en",
            name: "English",
            country_code: "gb",
        },
        {
            code: "uz",
            name: "O'zbekcha",
            country_code: "uz",
        },
    ];

    const handleLogout = () => {
        confirm({
            title: t('confirm_signout'),
            onOk() {
                logout().unwrap().then((res) => {
                    if (res.success) {
                        dispatch(logout_clear())
                    }
                }).catch((err) => {
                    console.log("Logout err: ", err)
                })
            }
        })
    }

    if (isLoading) {
        return <Spinner />
    } else {
        return (
            <Sider trigger={null} collapsible collapsed={collapsed} onCollapse={collapsed} >
                <Menu theme="dark" mode="inline" selectedKeys={[location.pathname]}>
                    <Menu.Item key="/profile" icon={<UserOutlined />}>
                        <NavLink to='/profile'>{t('user')}</NavLink>
                    </Menu.Item>
                    <SubMenu key="2" icon={<GlobalOutlined />} title={t('lan')}>
                        {languages.map(({ code, name, country_code }) => (
                            <Menu.Item key={code} disabled={currentLan === code} onClick={() => { changeLan(code) }}>{name}</Menu.Item>
                        ))}
                    </SubMenu>
                    <Menu.Item key="/chat" icon={<WechatOutlined style={{ fontSize: '20px' }} />}>
                        <NavLink to='/chat'>
                            {t('chat')}
                        </NavLink>
                    </Menu.Item>
                    <Menu.Item key="4" onClick={handleLogout} icon={<LogoutOutlined />}>
                        {t('logout')}
                    </Menu.Item>
                </Menu>
            </Sider>
        )
    }
}

