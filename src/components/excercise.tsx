import * as React from "react";
import Ripple from "react-toolbox/lib/ripple";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";
import Swipeable from "react-swipeable";

import { ExcerciseModel } from "../models/excerciseModel";
import * as styles from "./excercise.css";

var theme = require("react-toolbox/lib/ripple/theme.css");
interface IExcerciseProps {
    model: ExcerciseModel
    onClick: any
    onEditClick: any
    onDeleteClick: any
};
interface IExcerciseState {
    editing: boolean
};

let RippleCard = Ripple({ spread: 0.3, theme: theme })(Card);

class Excercise extends React.Component<IExcerciseProps, IExcerciseState> {
    constructor() {
        super();
        this.state = {
            editing: false
        };
    }

    render() {
        return (<Swipeable className={styles.excerciseContainer} onSwipedLeft={this.onSwipedLeft.bind(this)} onSwipedRight={this.onSwipedRight.bind(this)}>
            <RippleCard style={{ position: "relative" }} onClick={() => this.props.onClick(this.props.model.id)}>
                <CardTitle title={this.props.model.name} />
                <CardText>
                    <div>time signature: {this.props.model.time_signature}</div>
                    <div>BPM: {this.props.model.bpm}</div>
                    <div>Increment: {this.props.model.increment} per day</div>
                </CardText>
            </RippleCard>
            {
                this.state.editing &&
                <div className={styles.excerciseEditContainer}>
                    <div className={styles.editButton} onClick={this.props.onEditClick.bind(this, this.props.model)}>Edit</div>
                    <div className={styles.deleteButton} onClick={this.props.onDeleteClick.bind(this, this.props.model.id)}>Delete</div>
                </div>
            }
        </Swipeable>);
    }

    private onSwipedLeft() {
        this.setState({ ...this.state, editing: true });
    }

    private onSwipedRight() {
        this.setState({ ...this.state, editing: false });
    }
}

export default Excercise;