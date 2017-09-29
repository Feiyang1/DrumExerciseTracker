import * as React from "react";

import AppBar from "../containers/appBarContainer";
import VisibleExcerciseList from "../containers/visibleExcerciseList";
import Header from "./header";
import Dialog from "../containers/dialogContainer";

const App: React.StatelessComponent<any> = () => {
    return <div>
        <AppBar />
        <Header />
        <VisibleExcerciseList />
        <Dialog />
    </div>
};

export default App;