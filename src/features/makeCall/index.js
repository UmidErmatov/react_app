import React, { useState, useEffect, useRef } from 'react'
import { Button, Input } from 'antd'
import { PhoneOutlined } from '@ant-design/icons';
// import { io } from 'socket.io-client'
import { Web } from 'sip.js';
import { SimpleUser, SimpleUserOptions } from "sip.js/lib/platform/web";

// const ENDPOINT = 'http://192.168.0.108:5000'
// const socket = io(ENDPOINT)
// const { SimpleUser } = Web;
const destination = "sip:1001@192.168.0.107";

export const MainCall = () => {

    const [simpleUserMain, setSimpleUserMain] = useState()
    const [value, setValue] = useState(1000)

    function getAudioElement(id) {
        const el = document.getElementById(id);
        if (!(el instanceof HTMLAudioElement)) {
            throw new Error(`Element "${id}" not found or not an audio element.`);
        }
        return el;
    }

    async function wait(ms) {
        return new Promise((resolve) => {
            setTimeout(resolve, ms);
        });
    }

    async function main() {

        const server = "wss://192.168.0.107:7443";

        const aor = "sip:1003@192.168.0.107";

        const authorizationUsername = '1003';

        const authorizationPassword = '12345';

        const options = {
            aor,
            media: {
                remote: {
                    audio: getAudioElement("remoteAudio")
                }
            },
            userAgentOptions: {
                authorizationPassword,
                authorizationUsername,
            }
        };

        const simpleUser = new SimpleUser(server, options);

        simpleUser.delegate = {
            onCallReceived: async () => {
                await simpleUser.answer();
            }
        };

        await simpleUser.connect();

        await simpleUser.register();
        setSimpleUserMain(simpleUser)

        // await simpleUser.call(destination);
        //
        // await wait(2000);
        //
        // await simpleUser.hangup();
    }

    useEffect(() => {
        main()
            .then(() => console.log(`Success`))
            .catch((error) => console.error(`Failure`, error));
    }, [])

    const call = async () => {
        try {
            simpleUserMain.call(`sip:${value}@192.168.0.107`)
        } catch (error) {

        }
    }

    return (
        <>
            <div>
                <audio id="remoteAudio" controls>
                    <p>Your browser doesn't support HTML5 audio.</p>
                </audio>
                <div>
                    <input value={value} onChange={(e) => setValue(e.target.value)} />
                    <button onClick={call}>
                        call
                    </button>
                </div>
            </div>
        </>
    )
}
