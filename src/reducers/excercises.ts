import * as Models from "../models";
import { ADD_EXCERCISE, COMPLETE_EXCERCISE, 
    DELETE_EXCERCISE, RECEIVE_EXCERCISES, SET_VISIBILITYFILTER } from "../actions";

export default (state: Models.DrumExcerciseStore, action: Models.Action) => {
    let newState = {...state};
    switch (action.type) {
        case ADD_EXCERCISE:
            return;
        case DELETE_EXCERCISE:
            return;
        case COMPLETE_EXCERCISE:
            let newExcercises = newState.excercises.map((excercise)=>{
                if(excercise.id === action.excercise.id){
                    return action.excercise;
                }else{
                    return excercise;
                }
            });

            newState.excercises = newExcercises;
            return newState;
        case RECEIVE_EXCERCISES:
            newState.excercises = action.excercises;
            return newState;
        case SET_VISIBILITYFILTER:
            newState.visibilityFilter = action.filter;
            return newState;
        default:
            return state;
    }
}