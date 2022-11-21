import React from "react";
import {Link} from "react-router-dom"
import ReactDOM from 'react-dom';
import reportWebVitals from "../reportWebVitals";
import './sam.css';
import {useState} from "react";
import { useForm, SubmitHandler } from 'react-hook-form';


const Sam = () => {
    const aaa = () => {
        const a = document.getElementById("id");
        // @ts-ignore
        if (a.match("a")) {
            alert("true");
        } else {
            alert("false");
        }
    }

        return <>


            <input type="text" id="id"/>

            <button className="register" onClick={aaa}>登録</button>

        </>

    };
export default Sam;
