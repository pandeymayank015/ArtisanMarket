import React, { useState, useEffect } from 'react';
import './ToastPopUp.css';

const ToastPopUp = (props) => {

    const { show = false } = props;
    const [showToast, setShowToast] = useState(show);
    useEffect(() => {
        setShowToast(show);

        if (show) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 5000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [show]);

    return (
        <div>
            {
                showToast && <div id="toast">
                    <div id="img">
                        Done
                    </div>
                    <div id="desc">
                        Task Completed Successfuly
                    </div>
                </div>
            }
        </div>
    )
};

export default ToastPopUp;
