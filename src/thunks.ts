import { AuthenticationManager } from "./services/authentication";
import { INewExcercise } from "./components/addExcerciseModal";
import { ExcerciseModel } from "./models";
import { addExcercise, deleteExcercise, completeExcerciseLocal, completeExcercise, updateExcercise, receiveExcercises } from "./actions";
import excercisesService from "./services/excercisesService";

let authenticationManager: AuthenticationManager;

export function appStart() {
    return function (dispatch) {
        authenticationManager = new AuthenticationManager(dispatch);
    };
}

export function appEnd() {
    return function (dispatch) {
        // unexpected.
        if (!authenticationManager) {
            return;
        }

        authenticationManager.stopListening();
    }
}

export function tryLogOut() {
    return function (dispatch) {
        authenticationManager.logOut().then(() => {
            console.log('signed out lol');
        });
    };
}

export function tryAddExcercise(excercise: INewExcercise) {
    return async function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            const newExcercise = new ExcerciseModel("" + new Date().getTime(), excercise.name, excercise.bpm, excercise.time_signature, excercise.increment, [], true);
            dispatch(addExcercise(newExcercise));
        }
        else { // save it to database
            try {
                const response = await excercisesService.addExcercies(excercise);

                console.log("added excercise - " + JSON.stringify(response));
                const newExcercise = response ? response.excercise : undefined;
                if (newExcercise) {
                    dispatch(addExcercise(newExcercise));
                }
            } catch (e) {
                console.log("error adding excercise! ", e);
            };
        }
    };
}

export function tryDeleteExcercise(id: string) {
    return async function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(deleteExcercise(id));
        }
        else {
            try {
                const response = await excercisesService.deleteExcercise(id);
                console.log("deleted excercise - " + JSON.stringify(response));
                dispatch(deleteExcercise(id));
            } catch (e) {
                console.log("error deleting excercise!", e);
            };
        }
    };
}

export function tryCompleteExcercise(excercise_id) {
    return async function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(completeExcerciseLocal(excercise_id));
        }
        else { // prod
            try {
                const response = await excercisesService.completeExcercise(excercise_id);
                dispatch(completeExcercise(response && response.excercises && response.excercises[0]));
            } catch (e) {
                console.log("error completing excercise!", e);
            };
        }
    }
};

export function tryUpdateExcercise(excercise: ExcerciseModel) {
    return async function (dispatch) {
        if (process.env.NODE_ENV === "dev") { // dev
            dispatch(updateExcercise(excercise));
        }
        else {
            try {
                const response = await excercisesService.updateExcercise(excercise);
                console.log("updated excercise - " + JSON.stringify(response));
                dispatch(updateExcercise(excercise));
            } catch (e) {
                console.log("error updating excercise!", e);
            };
        }
    };
}

export function fetchExcercises() {
    return async function (dispatch) {
        try {
            debugger;
            const response = await excercisesService.fetchExcercises();
            debugger;
            dispatch(receiveExcercises(response ? response.excercises : null));
        } catch (e) {
            console.log("error getting excercise list!", e);
        }
    };
};

