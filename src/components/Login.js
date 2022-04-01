import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { notification, Form, Input, Typography, Button } from "antd";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useLoginMutation } from '../app/auth';
import { useTranslation } from 'react-i18next';
import './Login.css'
import { useSelector } from 'react-redux';

const { Title } = Typography;

export const Login = () => {
    const { t } = useTranslation()
    const [loading, setLoading] = useState();
    const [login, { isUninitialized }] = useLoginMutation()
    const navigate = useNavigate()
    const location = useLocation()
    const from = location.state?.from?.pathname || "/"

    const isAuth = useSelector(state=>state.auth.isAuth)

    useEffect(() => {
        if (isAuth) {
            navigate("/", { replace: true })
        }
    }, [isAuth, navigate])

    const [form] = Form.useForm();

    const handleOk = async () => {
        setLoading(true)
        let formData;
        try {
            await form.validateFields().then((values) => { formData = values }).catch(err => { console.log("Input error: ", err); })
            login(formData).unwrap()
                .then(payload => {
                    if (payload.success) {
                        setLoading(isUninitialized)
                        navigate(from, { replace: true })
                    }
                })
                .catch(err => {
                    setLoading(false)
                    form.resetFields()
                    notification.error({
                        message: err.data.message
                    })
                })
        } catch (err) { console.log("Handle err: ", err) }
    }

    return (
        <main className='login-page' >
            <Form form={form} size="large" className="login-wrap" >
                <div style={{ marginBottom: '16px' }}>
                    <Title level={3}>{t('login')}</Title>
                </div>
                <Form.Item name="login" >
                    <Input prefix={<UserOutlined className="site-form-item-icon" />} autoComplete='off' placeholder="Username" />
                </Form.Item>
                <Form.Item name="password" >
                    <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} autoComplete='off' type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item shouldUpdate className="submit">
                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={loading}
                        onClick={handleOk}
                    >
                        {t('login')}
                    </Button>
                </Form.Item>
            </Form>
        </main>
    );
};


