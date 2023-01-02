import React from "react";

const user:{ firstName: string; lastName: string } = {
    firstName: 'Bryce',
    lastName: 'Harper'
};

function formatName(user: { firstName: string; lastName: string; }) {
    return user.firstName + ' ' + user.lastName;
}


function NameElement (){
        return <div><h1>hello,{formatName(user)}!</h1></div>;
}
export default NameElement;