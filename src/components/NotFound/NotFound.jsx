import React from 'react';
import s from './NotFound.module.css';
import notFound from './img/ic-notfound.svg';
import  Button  from '../Button/Button'
//import {Link} from "react-router-dom";


const NotFound = ({ title, children, buttonText  = "На главную", buttonAction, href }) => {
    return (
        <div className={s.notFound}>
            <img src={notFound} className={s.image} alt="ничего не найдено"/>
            <h1 className={s.title}>{title}</h1>
            {children && children}
           {/* {buttonAction ? (*/}
                <Button className={s.button} onClick={buttonAction} type="secondary" href={href}>{buttonText}</Button>
          {/*//  ):(
                //<Link to="/" className="btn">{buttonText}</Link>
            //)}*/}
        </div>
        )
};


export default NotFound;