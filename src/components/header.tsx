import * as React from "react";

import * as styles from "./header.css";
import FilterLink from "../containers/filterLink";

const Header: React.StatelessComponent<any> = () => (
    <div className={styles.container}>
        <FilterLink filter="today" className={styles.item}>
            Today
        </FilterLink>
        <FilterLink filter="active" className={styles.item}>
            Active
        </FilterLink>
        <FilterLink filter="archive" className={styles.item}>
            Archive
        </FilterLink>
    </div>
);

export default Header;