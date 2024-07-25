import { Route, Switch } from "react-router-dom";
import "./App.css";
import routes from "./config/routes";

// naming convention adding an "I" in front, for "interface"
export interface IAppProps {}

// define functional component using typescript
// specifying the type of props component expects

// React.FunctionComponent (or React.FC for short) is a type provided by React for defining functional components.
// <IAppProps> is a generic type parameter specifying the type of props the component expects. This means Application expects props of type IAppProps.
const App: React.FunctionComponent<IAppProps> = (props) => {
  return (
    <Switch>
      {routes.map((route, index) => {
        return (
          <Route
            key={index}
            exact={route.exact}
            path={route.path}
            render={(routerProps: RouteChildrenProps<any>) => (
              <route.component {...routerProps} />
            )}
          />
        );
      })}
    </Switch>
  );
};

export default App;
