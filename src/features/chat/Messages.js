import React, { useEffect } from 'react'
import ScrollToBottom from "react-scroll-to-bottom";

export default function Messages({ socket, user, messageList, setMessageList }) {

    useEffect(() => {
        socket.on("receive_message", (data) => {
            // console.log("data: ", data);
            setMessageList((list) => [...list, data]);
        });
    }, [socket, setMessageList]);

    return (
        <div className="chat-body">
            <ScrollToBottom className="message-container">
                {messageList.map((messageContent) => {
                    return (
                        <div
                            className="message"
                            key={messageContent.key}
                            id={user.given_names === messageContent.author ? "other" : "you"}
                        >
                            <div>
                                <div className="message-content">
                                    <p>{messageContent.message}</p>
                                </div>
                                <div className="message-meta">
                                    <p id="time">{messageContent.time}</p>
                                    <p id="author">{user.given_names === messageContent.author ? "You" : messageContent.author}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </ScrollToBottom>
        </div>
    )
}
