import React from "react";
import s from "./Spiner.module.css"


const Spinner = () => {
    return (
        <div className={s.loader}>
            <p className={s.pLoader}></p>
        </div>
    );
};

export default Spinner;
