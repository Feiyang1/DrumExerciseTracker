import * as React from "react";

import AppBar from "./appBarContainer";
import VisibleExcerciseList from "./visibleExcerciseList";
import Header from "../components/header";
import { connect } from "react-redux";
import Dialog from "./dialogContainer";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { DrumExcerciseStore } from "../models";
import { authConfiguration } from "../services/authentication";
import { appStart, appEnd, tryLogOut } from "../thunks";
import { getFirebaseNamespace } from "../services/firebaseService";

interface AppProps {

    loggedIn: boolean;
    appStart(): void;
    appEnd(): void;
    logOut(): void;
}

class App extends React.Component<AppProps> {
    unregisterAuthObserver: any;
    constructor(props: AppProps) {
        super(props);
    }

    componentDidMount(): void {
        this.props.appStart();
    }

    componentWillUnmount(): void {
        this.props.appEnd();
    }

    render(): JSX.Element {
        return <div>
            {
                this.props.loggedIn ?
                    <div>
                        <div onClick={this.props.logOut}>sign out</div>
                        <AppBar />
                        <Header />
                        <VisibleExcerciseList />
                        <Dialog />
                    </div> :
                    <StyledFirebaseAuth uiConfig={authConfiguration} firebaseAuth={getFirebaseNamespace().auth()} />
            }
        </div>
    }
};

const AppContainer = connect(
    (state: DrumExcerciseStore) => {
        return {
            loggedIn: state.userState.loggedIn
        }
    },
    (dispatch) => {
        return {
            appStart: () => {
                dispatch(appStart());
            },
            appEnd: () => {
                dispatch(appEnd());
            },
            logOut: () => {
                dispatch(tryLogOut());
            }
        }
    })(App);

export default AppContainer;
