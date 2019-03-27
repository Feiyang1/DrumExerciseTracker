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
import { initializeFirebase } from "./services/firebaseService";

initializeFirebase();

let store = createStore<Models.DrumExcerciseStore>(excerciseApp, undefined, applyMiddleware(logger, thunkMiddleware));

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