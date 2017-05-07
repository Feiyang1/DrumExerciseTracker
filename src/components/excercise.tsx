import * as React from "react";
import Ripple from "react-toolbox/lib/ripple";
import { Card, CardTitle, CardText } from "react-toolbox/lib/card";

import {ExcerciseModel} from "../models/excerciseModel";
import * as styles from "./excercise.css";

var theme = require("react-toolbox/lib/ripple/theme.css");
interface IExcerciseProps {
    model: ExcerciseModel
    onClick : any
};
interface IExcerciseState { };

let RippleCard = Ripple({ spread: 0.3, theme: theme })(Card);

const Excercise: React.StatelessComponent<IExcerciseProps> = ({ model, onClick }) => (
    <RippleCard className={styles.excerciseContainer} style={{ position: "relative" }} onClick={()=>onClick(model.id)}>
        <CardTitle title={model.name} />
        <CardText>
            <div>time signature: {model.time_signature}</div>
            <div>BPM: {model.bpm}</div>
            <div>Increment: {model.increment} per day</div>
        </CardText>
    </RippleCard>
);

export default Excercise;