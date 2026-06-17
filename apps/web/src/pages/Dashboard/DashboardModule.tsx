import { Dashboard } from "./Dashboard";
import { routes } from "../../routes";
import { Route, Switch } from "wouter";

const DashboardModule = () => {
  return (
    <Switch>
      <Route path={routes.DASHBOARD.path} component={Dashboard} />
    </Switch>
  );
};

export default DashboardModule;
