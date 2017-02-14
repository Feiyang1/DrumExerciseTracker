import * as React from "react";
import * as MUI from "material-ui";

import ExcerciseModel from "../models/excerciseModel";

interface IExcerciseProps { 
    model:ExcerciseModel 
};
interface IExcerciseState { };

export default class Excercise extends React.Component<IExcerciseProps, IExcerciseState> {
    public render(){
        
        return (
            <MUI.Paper>
                <div>{this.props.model.name}</div>
                <div>{this.props.model.time_signature}</div>
                <div>{this.props.model.bpm}</div>
                <div>{this.props.model.increment}</div>
            </MUI.Paper>
        );
    }

}