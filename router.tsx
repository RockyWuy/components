import * as React from "react";
import { HashRouter, Route } from "react-router-dom";
import CanvasTest from "@components/Canvas/testC";

class AppRouter extends React.Component<{}, {}> {
  public render() {
    return (
      <HashRouter>
        <Route exact path="/" component={() => <div>sss</div>} />
        <Route exact path="/canvas/testC" component={CanvasTest} />
      </HashRouter>
    );
  }
}

export default AppRouter;
