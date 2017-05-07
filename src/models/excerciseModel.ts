export class ExcerciseModel {
    constructor(public id:string, public name:string, public bpm:number, public time_signature:string, public increment:number, public history, public active:boolean){
        
    }
}

export default ExcerciseModel;