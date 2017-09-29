import * as React from "react";

import Dialog from "react-toolbox/lib/dialog";
import Input from "react-toolbox/lib/input";

import ExcerciseModel from "../models/excerciseModel";

export default class EditExcerciseModal extends React.Component<{ onCancel, onConfirm, excercise: ExcerciseModel }, any>{

    constructor(props) {
        super(props);
        this.state = {...props.excercise};
    }

    handleChange(name, value) {
        this.setState({ ...this.state, [name]: value });
    }

    handleNumberChange(name, value){
        this.handleChange(name, parseFloat(value));
    }

    render() {

        let actions = [
            {
                label: "Cancel", onClick: () => {
                    this.clean(); // clean the state when window is closed.    
                    this.props.onCancel();
                }
            },
            {
                label: "Confirm", onClick: () => {
                    this.props.onConfirm(this.state);
                }
            }
        ];

        return <Dialog
            actions={actions}
            active={true}
            title='Edit'>
            <Input type="text" value={this.state.name} label="Name" onChange={this.handleChange.bind(this, "name")}></Input>
            <Input type="text" value={this.state.time_signature} label="Time Signature" onChange={this.handleChange.bind(this, "time_signature")}></Input>
            <Input type="number" value={this.state.bpm} label="BPM" onChange={this.handleNumberChange.bind(this, "bpm")}></Input>
            <Input type="number" value={this.state.increment} label="Increment Per Day" onChange={this.handleNumberChange.bind(this, "increment")}></Input>
        </Dialog>
    }

    clean() {
        this.state = {};
    }
}