import * as React from "react";

import {ExcerciseModel} from "../models/excerciseModel";
import Excercise from "./excercise";

interface IExcerciseList {
    excercises: ExcerciseModel[], 
    visibilityFilter: string, 
    onExcerciseClick,
    onExcerciseEditClick,
    onExcerciseDeleteClick
}

const ExcerciseList : React.StatelessComponent<IExcerciseList> = ({ excercises, visibilityFilter, onExcerciseClick, onExcerciseDeleteClick, onExcerciseEditClick }) => (
    <div>
        {excercises.map(excercise => 
            <Excercise key={excercise.id} model={excercise} 
                onClick={onExcerciseClick(visibilityFilter)}
                onEditClick={onExcerciseEditClick}
                onDeleteClick={onExcerciseDeleteClick}
            />
        )}
    </div>
);

export default ExcerciseList;