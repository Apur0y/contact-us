import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

const Main = () => {
    return (
        <div>
            <Outlet></Outlet>
            <ToastContainer />
        </div>
    );
};

export default Main;