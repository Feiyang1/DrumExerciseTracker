import * as React from "react";

import {ExcerciseModel} from "../models/excerciseModel";
import Excercise from "./excercise";

const ExcerciseList : React.StatelessComponent<{ excercises: ExcerciseModel[], visibilityFilter:string, onExcerciseClick }> = ({ excercises, visibilityFilter, onExcerciseClick }) => (
    <div>
        {excercises.map(excercise => 
            <Excercise key={excercise.id} model={excercise} onClick={onExcerciseClick(visibilityFilter)}/>
        )}
    </div>
);

export default ExcerciseList;