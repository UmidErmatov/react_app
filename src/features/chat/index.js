import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { useSelector } from 'react-redux';
import { Row, Col } from 'antd';
import Messages from './Messages';
import './Chat.css'


const ENDPOINT = 'http://192.168.0.108:5000'
const socket = io(ENDPOINT)

export const Chat = () => {
    const user = useSelector(state => state.auth.user)
    const [currentMessage, setCurrentMessage] = useState('')
    const [messageList, setMessageList] = useState([])

    useEffect(() => {
        socket.emit("join_room", user.role.name)
    }, [user])

    const sendMessage = async () => {
        if (currentMessage !== "") {
            const date = new Date()
            const messageData = {
                role: user.role.name,
                author: user.given_names,
                author_id: user.id,
                message: currentMessage,
                time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
                key: date + date.getMilliseconds()
            }
            await socket.emit("send_message", messageData)
            setMessageList((list) => [...list, messageData])
            setCurrentMessage("")
        }
    }

    return (
        <Row>
            <Col span={24}>
                <div className="chat-window">
                    <div className="chat-header">
                        <p>Live Chat</p>
                    </div>
                    <Messages socket={socket} user={user} messageList={messageList} setMessageList={setMessageList} />
                    <div className="chat-footer">
                        <input
                            type="text"
                            value={currentMessage}
                            placeholder="Type here..."
                            onChange={(event) => {
                                setCurrentMessage(event.target.value);
                            }}
                            onKeyPress={(event) => {
                                event.key === "Enter" && sendMessage();
                            }}
                        />
                        <button onClick={sendMessage}>&#9658;</button>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
