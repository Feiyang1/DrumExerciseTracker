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
    contentWidth: number,
    animation: boolean
};

let RippleCard = Ripple({ spread: 0.3, theme: theme })(Card);

class Excercise extends React.Component<IExcerciseProps, IExcerciseState> {
    private swipeInitialWidth: number = null;
    private maxSwipeX: number = 100;
    private totalDeltaX: number = 0;
    private lastDeltaX: number = 0;

    constructor() {
        super();
        this.state = {
            contentWidth: null,
            animation: false
        };
    }

    render() {
        return (
            <div className={styles.excerciseContainer}>
                <Swipeable className={`${styles.contentContainer} ${this.state.animation ? styles.contentContainerAnimation : null}`} style={{ width: this.state.contentWidth, touchAction: 'none' }} onSwipedLeft={this.onSwipedLeft.bind(this)} onSwipedRight={this.onSwipedRight.bind(this)}
                    onSwiping={this.onSwiping.bind(this)} preventDefaultTouchmoveEvent >
                    <RippleCard style={{ position: "relative" }} onClick={() => this.props.onClick(this.props.model.id)}>
                        <CardTitle title={this.props.model.name} />
                        <CardText>
                            <div>time signature: {this.props.model.time_signature}</div>
                            <div>BPM: {this.props.model.bpm}</div>
                            <div>Increment: {this.props.model.increment} per day</div>
                        </CardText>
                    </RippleCard>
                </Swipeable>
                <div className={styles.editContainer}>
                    <div className={styles.editButton} onClick={this.props.onEditClick.bind(this, this.props.model)}>Edit</div>
                    <div className={styles.divider}></div>
                    <div className={styles.deleteButton} onClick={this.props.onDeleteClick.bind(this, this.props.model.id)}>Delete</div>
                </div>
            </div>
        );
    }

    private onSwiping(e, deltaX, deltaY, absX, absY, velocity) {

        if (this.totalDeltaX <= 0 && deltaX < 0) { // can not swipe beyond the right border
            console.log(`returned with totalDeltaX ${this.totalDeltaX}`);
            return;
        }
        
        const nextWidth = (this.swipeInitialWidth ? this.swipeInitialWidth : e.currentTarget.offsetWidth) - deltaX;
        console.log(`initial width: ${this.swipeInitialWidth} delta: ${deltaX} next width: ${nextWidth}`)
        
        if (!this.swipeInitialWidth) { // the start of a swiping
            console.log("set initial width to " + e.currentTarget.offsetWidth)
            this.swipeInitialWidth = e.currentTarget.offsetWidth;
            this.setState({...this.state, contentWidth: nextWidth, animation: false}); // disable animation when user is swiping. TODO - clean up on end of animation instead
        }
        else {
            this.setState({ ...this.state, contentWidth: nextWidth });
            
        }
        this.totalDeltaX += (deltaX - this.lastDeltaX);
        this.lastDeltaX = deltaX;
    }

    private onSwipedLeft(e, deltaX) {
        console.log("swiped left " + deltaX);
        let finalWidth;
        if (this.totalDeltaX >= this.maxSwipeX / 2) { // go to fully expanded mode
            finalWidth = this.state.contentWidth + this.totalDeltaX - this.maxSwipeX;
            this.totalDeltaX = this.maxSwipeX;
        }
        else {
            finalWidth = this.state.contentWidth + this.totalDeltaX; // reset to the original width because user didn't scroll far enough
            this.totalDeltaX = 0;
        }
        this.setState({ ...this.state, contentWidth: finalWidth, animation: true });
        this.swipeInitialWidth = null;
        this.lastDeltaX = 0;
    }

    private onSwipedRight(e, deltaX) {
        console.log("swiped right " + deltaX);        
        let finalWidth;
        if (this.totalDeltaX >= this.maxSwipeX / 2) { // go back to fully expanded mode because user didn't scroll far enough        
            finalWidth = this.state.contentWidth + this.totalDeltaX - this.maxSwipeX;
            this.totalDeltaX = this.maxSwipeX;
        }
        else {
            finalWidth = this.state.contentWidth + this.totalDeltaX; // cover the edit/delete button             
            this.totalDeltaX = 0;
        }
        this.setState({ ...this.state, contentWidth: finalWidth, animation: true });
        this.swipeInitialWidth = null;
        this.lastDeltaX = 0;
    }
}

export default Excercise;