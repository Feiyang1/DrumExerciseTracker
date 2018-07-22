import * as React from "react";

import * as styles from "./header.css";
import FilterLink from "../containers/filterLink";
import { Filter } from "../models/filters";

const Header: React.StatelessComponent<any> = () => (
    <div className={styles.container}>
        <FilterLink filter={Filter.today} className={styles.item}>
            Today
        </FilterLink>
        <FilterLink filter={Filter.active} className={styles.item}>
            Active
        </FilterLink>
        <FilterLink filter={Filter.archive} className={styles.item}>
            Archive
        </FilterLink>
    </div>
);

export default Header;