import * as React from "react";

import AppBar from "../containers/appBarContainer";
import VisibleExcerciseList from "../containers/visibleExcerciseList";
import Header from "./header";
import Dialog from "../containers/dialogContainer";
import * as firebase from "firebase";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const authConfiguration = {
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

interface AppState {
    isSignedIn: boolean;
}

class App extends React.Component<{}, AppState> {
    unregisterAuthObserver: any;
    constructor() {
        super();
        // The component's Local state.
        this.state = {
            isSignedIn: false // Local signed-in state.
        };
    }

    componentDidMount(): void {
        this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
            (user) => this.setState({isSignedIn: !!user})
        );
      }

    render(): JSX.Element {
        return <div>
            {
                this.state.isSignedIn ?
                <div>
                    <div onClick={this.signOut}>sign out</div>
                    <AppBar />
                    <Header />
                    <VisibleExcerciseList />
                    <Dialog />
                </div> :
                <StyledFirebaseAuth uiConfig={authConfiguration} firebaseAuth={firebase.auth()} />
            }
        </div>
    }

    signOut(): void {
        firebase.auth().signOut();
    }
};

export default App;