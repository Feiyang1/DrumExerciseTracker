export class ExcerciseModel {
    constructor(
        public id: string,
        public name: string,
        public bpm: number,
        public time_signature: string,
        public increment: number,
        public history,
        public active: boolean) { }

    static fromJSON(object: any): ExcerciseModel {
        if (!object.id || !object.name || !object.bpm) {
            throw Error(`Object does not have required fields - ${JSON.stringify(object)}`);
        }

        return new ExcerciseModel(
            object.id,
            object.name,
            object.bpm,
            object.time_signature,
            object.increment,
            object.history || [],
            object.active
        );
    }
}

export default ExcerciseModel;