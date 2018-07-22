import * as Models from "../models";
import {
    Actions
} from "../actions";

export default (state: Models.DrumExcerciseStore, action: Models.Action) => {
    let newState = { ...state };
    switch (action.type) {
        case Actions.ADD_EXCERCISE:
            newState.excercises = newState.excercises.slice(0);
            newState.excercises.push(action.excercise);
            return newState;
        case Actions.DELETE_EXCERCISE:
            newState.excercises = newState.excercises.filter((excercise) => {
                return excercise.id !== action.id;
            });
            return newState;
        case Actions.COMPLETE_EXCERCISE:
            let newExcercises = newState.excercises.map((excercise) => {
                if (excercise.id === action.excercise.id) {
                    return action.excercise;
                } else {
                    return excercise;
                }
            });
            newState.excercises = newExcercises;
            return newState;
        case Actions.COMPLETE_EXCERCISE_LOCAL:
            const newExcercisesLocal = newState.excercises.map((excercise) => {
                if (excercise.id === action.id) {
                    let newOne = { ...excercise };
                    newOne.history.push({ bpm: newOne.bpm, date: new Date() });
                    newOne.bpm += excercise.increment ? excercise.increment : 1;
                    return newOne;
                } else {
                    return excercise;
                }
            });
            newState.excercises = newExcercisesLocal;
            return newState;
        case Actions.UPDATE_EXCERCISE:
            newExcercises = newState.excercises.map((excercise) => {
                if (excercise.id === action.payload.id) {
                    return action.payload;
                }

                return excercise;
            });
            newState.excercises = newExcercises;
            return newState;
        case Actions.RECEIVE_EXCERCISES:
            newState.excercises = action.excercises;
            return newState;
        case Actions.SET_VISIBILITYFILTER:
            newState.visibilityFilter = action.filter;
            return newState;
        case Actions.SHOW_DIALOG:
            newState.dialog = { ...action.payload, show: true };
            return newState;
        case Actions.HIDE_DIALOG:
            newState.dialog = { ...newState.dialog, show: false };
            return newState;
        default:
            return state;
    }
}