import React, { useEffect } from 'react';
import NProgress from 'react-nprogress';
import "./nprogress/nprogress.css";

const Loader = () => {
    useEffect(() => {
        NProgress.start();
        return () => {
            NProgress.done();
        };
    }, []);
    return (
        <div className="loader">

        </div>
    )


};

export default Loader;









// import React from 'react'

// const Loader = () => {
//     return (
//         <div className="loader">

//         </div>
//     )
// }

// export default Loader
