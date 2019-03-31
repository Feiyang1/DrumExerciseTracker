import { INewExcercise } from "../components/addExcerciseModal";
import { ExcerciseModel } from "../models";
import { AuthenticationManager } from "./authentication";
import { getFirestoreInstance, getFirebaseNamespace } from "./firebaseService";
import { EXCERCISE_COLLECTION, USER_ID_FIELD_NAME } from "../constants";

class ExcercisesService {
    constructor() {

    }

    async fetchExcercises(): Promise<ExcerciseModel[]> {
        const excercises: ExcerciseModel[] = [];
        const firestore = getFirestoreInstance();
        const snapshots = await firestore.collection(EXCERCISE_COLLECTION).where(USER_ID_FIELD_NAME, '==', AuthenticationManager.getUid()).get();
        snapshots.forEach((doc) => {
            excercises.push(ExcerciseModel.fromJSON({
                id: doc.id,
                ...doc.data()
            }));
        });

        return excercises;
    }

    async addExcercies(excercise: INewExcercise): Promise<ExcerciseModel> {
        const firestore = getFirestoreInstance();
        const docRef = await firestore.collection(EXCERCISE_COLLECTION).add({
            ...excercise,
            [USER_ID_FIELD_NAME]: AuthenticationManager.getUid(), 
            active: true
        });

        const docSnapshot = await docRef.get();
        const addedExcercise = ExcerciseModel.fromJSON({
            ...docSnapshot.data(),
            id: docRef.id
        });
        return addedExcercise;
    }

    deleteExcercise(id: string): Promise<void> {
        const firestore = getFirestoreInstance();
        return firestore.collection(EXCERCISE_COLLECTION).doc(id).delete();
    }

    async completeExcercise(excercise: ExcerciseModel): Promise<ExcerciseModel> {
        const firestore = getFirestoreInstance();
        const firebase = getFirebaseNamespace();

        const docRef = firestore.collection(EXCERCISE_COLLECTION).doc(excercise.id);
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
            history: [...excercise.history, { bpm: excercise.bpm, date: currentDT }]
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