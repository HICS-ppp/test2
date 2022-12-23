import React from "react";
import {Link} from "react-router-dom"



const Smp = () => {

   const  ueda = sessionStorage.getItem('user')



    const session = sessionStorage.getItem("session")
    return (
        <>

            {ueda}
            {session}

            <h1>aa</h1>
        </>
    );
};
export default Smp;