import * as React from "react";

export interface Dialog {
    component: typeof React.Component,
    props: any,
    show: boolean
}

export default Dialog;