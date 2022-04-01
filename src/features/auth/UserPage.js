import React from 'react'
import { Row, Col, Avatar, Divider, Typography, Card } from 'antd'
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const { Title } = Typography
const { Meta } = Card

export const UserPage = () => {
    const user = useSelector(state => state.auth.user)

    return (
        <>
            <Divider />
            <Row>
                <Col span={24} style={{ textAlign: 'center' }}>
                    <Title level={4}>Account Profile</Title>
                </Col>
            </Row>
            <Divider />
            <Row>
                <Col span={12} style={{ textAlign: "center" }} offset={1}>
                    <Card
                        style={{ maxWidth: 500 }}
                        title={<Avatar size={{ xs: 60, sm: 70, md: 80, lg: 100, xl: 120, xxl: 150 }} alt='User photo' src="https://joeschmoe.io/api/v1/random" />}
                        actions={[
                            <SettingOutlined key="setting" />,
                            <EditOutlined key="edit" />,
                            <EllipsisOutlined key="ellipsis" />,
                        ]}
                    >
                        <Meta
                            title={user.given_names + " " + user.sur_name}
                            description={`Role: ${user.role.name}`}
                        />
                    </Card>
                </Col>
            </Row>
        </>
    )
}
