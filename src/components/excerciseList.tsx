import * as React from "react";

import ExcerciseModel from "../models/excerciseModel";
import Excercise from "./excercise";

const ExcerciseList : React.StatelessComponent<{ excercises: ExcerciseModel[] }> = ({ excercises }) => (
    <div>
        {excercises.map(excercise => 
            <Excercise model={excercise}/>
        )}
    </div>
);

export default ExcerciseList;