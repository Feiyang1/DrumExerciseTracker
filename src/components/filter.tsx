import * as React from "react";

import * as styles from "./filter.css";

const Filter : React.StatelessComponent<any> = ({active, className, children, onClick}) => {
    return <div onClick={onClick} className={className + " " + styles.filter + " " + (active ? styles.active : "")}>
        {children}
    </div>
};

export default Filter;