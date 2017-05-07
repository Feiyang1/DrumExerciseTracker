import {ExcerciseModel} from "./excerciseModel"
export interface DrumExcerciseStore{
    excercises: ExcerciseModel[],
    visibilityFilter: string
}

export default DrumExcerciseStore; 