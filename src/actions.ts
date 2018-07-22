import * as fetch from "isomorphic-fetch";
import { ExcerciseModel, Action, VoidAction } from "./models";
import { INewExcercise } from "./components/addExcerciseModal";
import { Filter } from "./models/filters";

export const Actions = {
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
    LOGGED_OUT: "LOGGED_OUT"
};

export function tryAddExcercise(excercise: INewExcercise) {
    return function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            const newExcercise = new ExcerciseModel("" + new Date().getTime(), excercise.name, excercise.bpm, excercise.time_signature, excercise.increment, [], true);
            dispatch(addExcercise(newExcercise));
        }
        else { // save it to database
            const url = "api";
            let headers = {
                "Content-Type": "application/json"
            };
            let config = {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({ user: "Feiyang Chen", excercise })
            };
            return fetch(url, config).then(response => response.json())
                .then(json => {
                    console.log("added excercise - " + JSON.stringify(json));
                    const newExcercise = json ? json.excercise : undefined;
                    if (newExcercise) {
                        dispatch(addExcercise(newExcercise));
                    }
                })
                .catch(() => {
                    console.log("error adding excercise!");
                });
        }
    };
}

export function addExcercise(payload): Action<ExcerciseModel> {
    return {
        type: Actions.ADD_EXCERCISE,
        payload
    };
};

export function tryDeleteExcercise(id: string) {
    return function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(deleteExcercise(id));
        }
        else {
            const url = "api/delete";
            const headers = {
                "Content-Type": "application/json"
            };
            const config = {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ user: "Feiyang Chen", id })
            };
            return fetch(url, config).then(response => response.json())
                .then(json => {
                    console.log("deleted excercise - " + JSON.stringify(json));
                    dispatch(deleteExcercise(id));
                })
                .catch(() => {
                    console.log("error updating excercise!");
                });
        }
    };
}

export function deleteExcercise(id): Action<string> {
    return {
        type: Actions.DELETE_EXCERCISE,
        payload: id
    };
};

export function tryCompleteExcercise(excercise_id) {
    return function (dispatch) {

        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(completeExcerciseLocal(excercise_id));
        }
        else { // prod
            let url = "api/complete";
            let headers = {
                "Content-Type": "application/json"
            };
            let config = {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ user: "Feiyang Chen", id: excercise_id, date: new Date() })
            };
            return fetch(url, config).then((response) => response.json())
                .then((json) => {
                    dispatch(completeExcercise(json && json.excercises && json.excercises[0]));
                })
                .catch(() => {
                    console.log("error completing excercise!");
                })
        }
    }
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

export function tryUpdateExcercise(excercise: ExcerciseModel) {
    return function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(updateExcercise(excercise));
        }
        else {
            const url = "api/update";
            let headers = {
                "Content-Type": "application/json"
            };
            let config = {
                method: "POST",
                headers: headers,
                body: JSON.stringify({ user: "Feiyang Chen", excercise })
            };
            return fetch(url, config).then(response => response.json())
                .then(json => {
                    console.log("updated excercise - " + JSON.stringify(json));
                    dispatch(updateExcercise(excercise));
                })
                .catch(() => {
                    console.log("error updating excercise!");
                });
        }
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

export function fetchExcercises() {
    return function (dispatch) {
        let url = "api?user=" + encodeURIComponent("Feiyang Chen");
        return fetch(url).then(response => response.json()).then(json => {
            dispatch(receiveExcercises(json ? json.excercises : null));
            console.log(json);
        });
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
