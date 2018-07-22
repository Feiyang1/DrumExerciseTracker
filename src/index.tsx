import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { AppContainer } from "react-hot-loader";

import App from "./containers/appContainer";
import excerciseApp from "./reducers/excercises";
import * as Models from "./models";
import * as firebase from 'firebase';
import { fetchExcercises } from "./thunks";

// Initialize Firebase
const config = {
    apiKey: "AIzaSyB-39dPhBmprjGMhREEaKubQ9RSR0yF2SQ",
    authDomain: "meealwaysawesome.firebaseapp.com",
    databaseURL: "https://meealwaysawesome.firebaseio.com",
    projectId: "meealwaysawesome",
    storageBucket: "meealwaysawesome.appspot.com",
    messagingSenderId: "190884510771"
};
firebase.initializeApp(config);

let store = createStore<Models.DrumExcerciseStore>(excerciseApp, undefined, applyMiddleware(logger, thunkMiddleware));
store.dispatch(fetchExcercises()).then(() => {
    console.log("fetch success");
});

let rootEl = document.getElementById("app")
ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <App />
        </Provider>
    </AppContainer>,
    rootEl
);

if (module.hot) {
    module.hot.accept("./containers/appContainer", () => {
        const NextApp = require<RequireImport>("./containers/appContainer").default;
        ReactDOM.render(
            <AppContainer>
                <Provider store={store}>
                    <NextApp />
                </Provider>
            </AppContainer>,
            rootEl
        )
    });
}