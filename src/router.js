import React from 'react';
import {Router, Route, Switch, routerRedux} from 'dva/router';
import HomePage from "./routes/HomePage/HomePage"
import PublishPage from "./routes/PublishPage/PublishPage";
import MePage from "./routes/MePage/MePage";
import DetailPage from "./routes/DetailPage/DetailPage";
import ProvidePlanPage from "./routes/ProvidePlanPage/ProvidePlanPage";
import MySolutionPage from "./routes/MySolutionPage/MySolutionPage";
import Test from "./routes/Test/Test";
// import Auth from "./components/Auth/Auth";
import dynamic from 'dva/dynamic';

const {ConnectedRouter} = routerRedux;

export default function RouterConfig({history, app}) {
  /* 定义路由配置 */
  const routes = [{
    path: "/publish",
    models: () => [import('./models/upload'),import('./models/user')],
    component: () => (PublishPage)
  }, {
    path: "/me",
    models: () => [import('./models/solutions'), import("./models/me"),import('./models/user')],
    component: () => (MePage)
  }, {
    path: "/me/req",
    models: () => [import('./models/me'),import('./models/user')],
    component: () => (DetailPage)
  },{
    path: "/me/solution",
    models: () => [import('./models/solutions'), import('./models/me')],
    component: () => (MySolutionPage)
  }, {
    path: "/provide",
    models: () => [import('./models/solutions'), import('./models/upload'), import('./models/me')],
    component: () => (ProvidePlanPage)
  }, {
    path: "/detail",
    models: () => [import('./models/me'),import('./models/user')],
    component: () => (DetailPage)
  }, {
    path: "/test",
    component: () => (Test)
  }];

  return (
    <ConnectedRouter history={history}>
      <div>
        {/*<Auth/>*/}
        <Switch>
          <Route
            exact
            path="/"
            component={dynamic({
              app,
              models: () => [
                import('./models/user'),
              ],
              component: () => (HomePage)
            })}
          />
          {
            routes.map(({path, exact, ...dynamics}, key) => {
              // console.log(path, exact);
              return (
                <Route
                  key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics
                  })}
                />
              )
            })
          }
        </Switch>
      </div>
    </ConnectedRouter>
  )
    ;
}

