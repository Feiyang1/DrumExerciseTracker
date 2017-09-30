import * as React from "react";

import Dialog from "react-toolbox/lib/dialog";

export default class EditExcerciseModal extends React.Component<{ onCancel, onConfirm, id: string }, any>{

    constructor(props) {
        super(props);
    }

    render() {

        let actions = [
            {
                label: "Cancel", onClick: () => {
                    this.props.onCancel();
                }
            },
            {
                label: "Confirm", onClick: () => {
                    this.props.onConfirm(this.props.id);
                }
            }
        ];

        return <Dialog
            actions={actions}
            active={true}
            title='Delete'>
            Are you sure to delete this excercise?
        </Dialog>
    }
}