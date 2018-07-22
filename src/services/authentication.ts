import { Dispatch } from "../../node_modules/redux";
import * as firebase from "firebase";
import { loggedIn, loggedOut } from "../actions";

export const authConfiguration = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID
    ],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false
    }
};

export class AuthenticationManager {

    unsubscribe: any;
    constructor(private dispatch: Dispatch<any>) {
        this.startListening();
    }

    startListening(): void {
        this.unsubscribe = firebase.auth().onAuthStateChanged(
            (user) => {
                if (user) {
                    this.dispatch(loggedIn());
                } else {
                    console.log("signed out");
                    this.dispatch(loggedOut());
                }
            }
        );
    }

    stopListening(): void {
        this.unsubscribe && this.unsubscribe();
    }

    logOut(): Promise<void> {
        return firebase.auth().signOut();
    }

}