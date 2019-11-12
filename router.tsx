import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';


class AppRouter extends React.Component<{}, {}> {
    public render() {
        return (
            <HashRouter>
                <Route exact path="/" component={() => <div>sss</div>} />
                <Route exact path="/waterfall" component={() => <div>aaaa</div>} />
            </HashRouter>
        );
    }
}

export default AppRouter;