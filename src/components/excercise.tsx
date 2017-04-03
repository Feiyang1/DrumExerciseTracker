import * as React from "react";
import Ripple from "react-toolbox/lib/ripple";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";

import ExcerciseModel from "../models/excerciseModel";
import * as styles from "./excercise.css";

var theme = require("react-toolbox/lib/ripple/theme.css");
interface IExcerciseProps {
    model: ExcerciseModel
};
interface IExcerciseState { };

let RippleCard = Ripple({spread: 0.3, theme: theme})(Card);
export default class Excercise extends React.Component<IExcerciseProps, IExcerciseState> {
    public render() {
        return (
            <RippleCard className={styles.excerciseContainer} style={{position: "relative"}} onClick={this.handleClick}>
                <CardTitle title={this.props.model.name} />
                <CardText>
                    <div>time signature: {this.props.model.time_signature}</div>
                    <div>BPM: {this.props.model.bpm}</div>
                    <div>Increment: {this.props.model.increment} per day</div>
                </CardText>
            </RippleCard>
        );
    }

    private handleClick(){
        //alert("yes")
    }
}