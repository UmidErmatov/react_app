import React from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';

export const NotFound = () => {
    return (
        <main className='login-page'>
            <Result
                status="404"
                title="404"
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary"><Link to='/'>Back Home</Link></Button>}
            />
        </main>
    );
};


