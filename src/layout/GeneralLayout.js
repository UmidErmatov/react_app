import React from 'react';
import { Outlet } from 'react-router-dom';

export const GeneralLayout = () => {
    return <main className='login-page'>
        <Outlet />
    </main>;
};
