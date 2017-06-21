import {ExcerciseModel} from "./excerciseModel"
import UiStateModel from "./uiStateModel"
export interface DrumExcerciseStore{
    excercises: ExcerciseModel[],
    visibilityFilter: string,
    uiState: UiStateModel
}

export default DrumExcerciseStore; 