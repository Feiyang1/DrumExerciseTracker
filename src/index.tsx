import * as React from "react";
import * as ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import { AppContainer } from "react-hot-loader";

 import App from "./components/app";
 import { fetchExcercises } from "./actions";
 import excerciseApp from "./reducers/excercises";
 import data from "./data";
 import * as Models from "./models";

let store = createStore<Models.DrumExcerciseStore>(excerciseApp, { 
    excercises: data, 
    visibilityFilter: "today", 
    dialog: { component: null, props: null, show: false},
    uiState: {showAddExcericeModal: false} }, applyMiddleware(logger, thunkMiddleware));
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
    module.hot.accept("./components/app", () => {
        const NextApp = require<RequireImport>("./components/app").default;
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