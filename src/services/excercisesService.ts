import { INewExcercise } from "../components/addExcerciseModal";
import { ExcerciseModel } from "../models";
import { AuthenticationManager } from "./authentication";
import { getFirestoreInstance, getFirebaseNamespace } from "./firebaseService";

class ExcercisesService {
    constructor() {

    }

    async fetchExcercises(): Promise<ExcerciseModel[]> {
        const excercises: ExcerciseModel[] = [];
        const firestore = getFirestoreInstance();
        const snapshots = await firestore.collection('excercises').where('user_id', '==', AuthenticationManager.getUid()).get();
        snapshots.forEach((doc) => {
            excercises.push(ExcerciseModel.fromJSON({
                id: doc.id,
                ...doc.data()
            }));
        });

        return excercises;
    }

    async addExcercies(excercise: INewExcercise): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api";
        const headers = {
            "Content-Type": "application/json",
            token: idToken
        };
        const config = {
            method: "PUT",
            headers: headers,
            body: JSON.stringify({ excercise })
        };
        return fetch(url, config).then(response => response.json());
    }

    async deleteExcercise(id: string): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api/delete";
        const headers = {
            "Content-Type": "application/json",
            token: idToken
        };
        const config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ id })
        };
        return fetch(url, config).then(response => response.json());
    }

    async completeExcercise(excercise: ExcerciseModel): Promise<ExcerciseModel> {
        const firestore = getFirestoreInstance();
        const firebase = getFirebaseNamespace();

        const docRef = firestore.collection('excercises').doc(excercise.id);
        const nextBpm = excercise.bpm + excercise.increment;
        const currentDT = new Date();
        await docRef.update({
            bpm: nextBpm,
            history: firebase.firestore.FieldValue.arrayUnion({
                // ServerTimestamp is currently not supported within an array - https://github.com/firebase/firebase-ios-sdk/issues/1164#issuecomment-384323764
                date: currentDT,
                bpm: excercise.bpm
            })
        });

        // TODO: use firestore realtime update
        return {
            ...excercise,
            bpm: nextBpm,
            history: [...excercise.history, {bpm: excercise.bpm, date: currentDT}]
        };
    }

    async updateExcercise(excercise: ExcerciseModel): Promise<any> {
        const idToken = await AuthenticationManager.getIdToken();
        const url = "api/update";
        const headers = {
            "Content-Type": "application/json",
            token: idToken
        };
        const config = {
            method: "POST",
            headers: headers,
            body: JSON.stringify({ excercise })
        };
        return fetch(url, config).then(response => response.json());
    }
}

export default new ExcercisesService();