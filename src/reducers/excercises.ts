import * as Models from "../models";
import {
    ADD_EXCERCISE, COMPLETE_EXCERCISE, COMPLETE_EXCERCISE_LOCAL,
    DELETE_EXCERCISE, RECEIVE_EXCERCISES, SET_VISIBILITYFILTER, SHOW_ADDEXCERCISEBOX, HIDE_ADDEXCERCISEBOX
} from "../actions";

export default (state: Models.DrumExcerciseStore, action: Models.Action) => {
    let newState = { ...state };
    switch (action.type) {
        case ADD_EXCERCISE:
            newState.excercises = newState.excercises.slice(0);
            newState.excercises.push(action.excercise);
            return newState;
        case DELETE_EXCERCISE:
            return;
        case COMPLETE_EXCERCISE:
            let newExcercises = newState.excercises.map((excercise) => {
                if (excercise.id === action.excercise.id) {
                    return action.excercise;
                } else {
                    return excercise;
                }
            });

            newState.excercises = newExcercises;
            return newState;
        case COMPLETE_EXCERCISE_LOCAL:
            let newExcercisesLocal = newState.excercises.map((excercise) => {
                if (excercise.id === action.id) {
                    let newOne = { ...excercise };
                    newOne.history.push({bpm: newOne.bpm, date: new Date()});
                    newOne.bpm += excercise.increment ? excercise.increment: 1;
                    return newOne;
                } else {
                    return excercise;
                }
            });
            newState.excercises = newExcercisesLocal;
        return newState;
        case RECEIVE_EXCERCISES:
            newState.excercises = action.excercises;
            return newState;
        case SET_VISIBILITYFILTER:
            newState.visibilityFilter = action.filter;
            return newState;
        case SHOW_ADDEXCERCISEBOX:
            newState.uiState.showAddExcericeModal = true;
            return newState;
        case HIDE_ADDEXCERCISEBOX:
            newState.uiState.showAddExcericeModal = false;
            return newState;
        default:
            return state;
    }
}