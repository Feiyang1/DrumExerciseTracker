import * as React from "react";

import Dialog from "react-toolbox/lib/dialog"

const modal: React.StatelessComponent<any> = ({active}) => {
    let actions = [
        { label: "Cancel", onClick: ()=>{} },
        { label: "Save", onClick: ()=>{} }
    ];
    return <Dialog
        actions={actions}
        active={active}
        title='Add'>
        <p>add an excercise</p>
    </Dialog>
}

export default modal;