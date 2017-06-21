import * as React from "react";

import AppBar from "../containers/appBarContainer";
import VisibleExcerciseList from "../containers/visibleExcerciseList";
import Header from "./header";

const App: React.StatelessComponent<any> = () => {
    return <div>
        <AppBar />
        <Header />
        <VisibleExcerciseList />
    </div>
};

export default App;