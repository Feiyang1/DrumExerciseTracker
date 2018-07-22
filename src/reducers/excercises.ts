import * as Models from "../models";
import data from "../data";
import {
    Actions
} from "../actions";
import { ExcerciseModel, Action } from "../models";
import { Filter } from "../models/filters";

const initialState: Models.DrumExcerciseStore = {
    excercises: data,
    visibilityFilter: "today",
    dialog: { component: null, props: null, show: false },
    uiState: { showAddExcericeModal: false },
    userState: {
        loggedIn: false
    }
};

export default (state: Models.DrumExcerciseStore = initialState, action: Action<any>) => {
    let newState = { ...state };
    switch (action.type) {
        case Actions.ADD_EXCERCISE:
            newState.excercises = newState.excercises.slice(0);
            newState.excercises.push((action as Action<ExcerciseModel>).payload);
            return newState;
        case Actions.DELETE_EXCERCISE:
            newState.excercises = newState.excercises.filter((excercise) => {
                return excercise.id !== (action as Action<string>).payload;
            });
            return newState;
        case Actions.COMPLETE_EXCERCISE:
            let newExcercises = newState.excercises.map((excercise) => {
                const completed = (action as Action<ExcerciseModel>).payload;
                if (excercise.id === completed.id) {
                    return completed;
                } else {
                    return excercise;
                }
            });
            newState.excercises = newExcercises;
            return newState;
        case Actions.COMPLETE_EXCERCISE_LOCAL:
            const newExcercisesLocal = newState.excercises.map((excercise) => {
                if (excercise.id === (action as Action<string>).payload) {
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
                const updated = (action as Action<ExcerciseModel>).payload;
                if (excercise.id === updated.id) {
                    return updated;
                }

                return excercise;
            });
            newState.excercises = newExcercises;
            return newState;
        case Actions.RECEIVE_EXCERCISES:
            newState.excercises = action.payload;
            return newState;
        case Actions.SET_VISIBILITYFILTER:
            newState.visibilityFilter = (action as Action<Filter>).payload;
            return newState;
        case Actions.SHOW_DIALOG:
            newState.dialog = { ...action.payload, show: true };
            return newState;
        case Actions.HIDE_DIALOG:
            newState.dialog = { ...newState.dialog, show: false };
            return newState;
        case Actions.LOGGED_IN:
            newState.userState = {
                ...newState.userState,
                loggedIn: true
            }
            return newState;
        case Actions.LOGGED_OUT:
            newState.userState = {
                ...newState.userState,
                loggedIn: false
            };
            return newState;
        default:
            return state;
    }
}