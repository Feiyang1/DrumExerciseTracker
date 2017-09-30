import * as fetch from "isomorphic-fetch";
import { ExcerciseModel } from "./models";
import { INewExcercise } from "./components/addExcerciseModal";

export const TRY_ADD_EXCERCISE = "TRY_ADD_EXCERCISE";
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

export const ADD_EXCERCISE = "ADD_EXCERCISE";
export function addExcercise(excercise) {
    return {
        type: ADD_EXCERCISE,
        excercise
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

export const DELETE_EXCERCISE = "DELETE_EXCERCISE";
export function deleteExcercise(id) {
    return {
        type: DELETE_EXCERCISE,
        id: id
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

export const COMPLETE_EXCERCISE = "COMPLETE_EXCERCISE";
export function completeExcercise(excercise) {
    return {
        type: COMPLETE_EXCERCISE,
        excercise
    };
}

export const COMPLETE_EXCERCISE_LOCAL = "COMPLETE_EXCERCISE_LOCAL";
export function completeExcerciseLocal(excercise_id) {
    return {
        type: COMPLETE_EXCERCISE_LOCAL,
        id: excercise_id
    };
}

export function tryUpdateExcercise(excercise: ExcerciseModel) {
    return function (dispatch) {
        if (process.env.NODE_ENV !== "production") { // dev
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

export const UPDATE_EXCERCISE = "UPDATE_EXCERCISE";
export function updateExcercise(excercise: ExcerciseModel) {
    return {
        type: UPDATE_EXCERCISE,
        payload: excercise
    };
}

export const RECEIVE_EXCERCISES = "RECEIVE_EXCERCISES";
export function receiveExcercises(json) {
    return {
        type: RECEIVE_EXCERCISES,
        excercises: json
    }
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

export const SET_VISIBILITYFILTER = "SET_VISIBILITYFILTER";
export function setVisibilityFilter(filter) {
    return {
        type: SET_VISIBILITYFILTER,
        filter
    };
}

export const SHOW_DIALOG = "SHOW_DIALOG";
export function showDialog(payload) {
    return {
        type: SHOW_DIALOG,
        payload
    };
}

export const HIDE_DIALOG = "HIDE_DIALOG";
export function hideDialog() {
    return {
        type: HIDE_DIALOG
    };
}
