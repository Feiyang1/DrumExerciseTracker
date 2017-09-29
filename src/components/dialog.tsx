import * as React from "react";

export interface IDialog {
    show: boolean
    component: typeof React.Component
    props: any
}

export default class Dialog extends React.Component<IDialog, any>{

    constructor() {
        super();
    }

    render() {
        return this.props.show ? 
                <this.props.component {...this.props.props}>
                </this.props.component>
                : null;
    }
}