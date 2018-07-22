import {ExcerciseModel} from "./excerciseModel"
import UiStateModel from "./uiStateModel"
import Dialog from "./dialog"

export interface DrumExcerciseStore{
    excercises: ExcerciseModel[];
    visibilityFilter: string;
    dialog: Dialog;
    uiState: UiStateModel;
    userState: {
        loggedIn: boolean;
    }
}

export default DrumExcerciseStore; 