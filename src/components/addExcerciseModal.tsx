import * as React from "react";

import Dialog from "react-toolbox/lib/dialog";
import Input from "react-toolbox/lib/input";

export interface INewExcercise {
    name: string,
    bpm: number,
    time_signature: string,
    increment: number
}

export default class AddExcerciseModal extends React.Component<{ active, onCancel, onConfirm }, any>{

    constructor() {
        super();
        this.state = {};
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
            active={this.props.active}
            title='Add'>
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