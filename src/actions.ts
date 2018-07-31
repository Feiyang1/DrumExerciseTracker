import { ExcerciseModel, Action, VoidAction } from "./models";
import { Filter } from "./models/filters";

export const Actions = {
    APP_START: "APP_START",
    TRY_ADD_EXCERCISE: "TRY_ADD_EXCERCISE",
    ADD_EXCERCISE: "ADD_EXCERCISE",
    DELETE_EXCERCISE: "DELETE_EXCERCISE",
    COMPLETE_EXCERCISE: "COMPLETE_EXCERCISE",
    COMPLETE_EXCERCISE_LOCAL: "COMPLETE_EXCERCISE_LOCAL",
    UPDATE_EXCERCISE: "UPDATE_EXCERCISE",
    RECEIVE_EXCERCISES: "RECEIVE_EXCERCISES",
    SET_VISIBILITYFILTER: "SET_VISIBILITYFILTER",
    SHOW_DIALOG: "SHOW_DIALOG",
    HIDE_DIALOG: "HIDE_DIALOG",
    LOGGED_IN: "LOGGED_IN",
    LOGGED_OUT: "LOGGED_OUT",
    TRY_LOG_OUT: "TRY_LOG_OUT"
};

export function addExcercise(payload): Action<ExcerciseModel> {
    return {
        type: Actions.ADD_EXCERCISE,
        payload
    };
};

export function deleteExcercise(id): Action<string> {
    return {
        type: Actions.DELETE_EXCERCISE,
        payload: id
    };
};

export function completeExcercise(excercise): Action<ExcerciseModel> {
    return {
        type: Actions.COMPLETE_EXCERCISE,
        payload: excercise
    };
}

export function completeExcerciseLocal(excercise_id): Action<string> {
    return {
        type: Actions.COMPLETE_EXCERCISE_LOCAL,
        payload: excercise_id
    };
}

export function updateExcercise(excercise: ExcerciseModel): Action<ExcerciseModel> {
    return {
        type: Actions.UPDATE_EXCERCISE,
        payload: excercise
    };
}

export function receiveExcercises(json): Action<ExcerciseModel[]> {
    return {
        type: Actions.RECEIVE_EXCERCISES,
        payload: json
    };
}



export function setVisibilityFilter(filter: Filter): Action<Filter> {
    return {
        type: Actions.SET_VISIBILITYFILTER,
        payload: filter
    };
}

export function showDialog(payload) {
    return {
        type: Actions.SHOW_DIALOG,
        payload
    };
}

export function hideDialog(): VoidAction {
    return {
        type: Actions.HIDE_DIALOG
    };
}

export function loggedIn(): VoidAction {
    return {
        type: Actions.LOGGED_IN
    };
}

export function loggedOut(): VoidAction {
    return {
        type: Actions.LOGGED_OUT
    };
}
