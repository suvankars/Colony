import { Route, Switch } from "wouter";
import Layout from "../components/Layout/layout";

import { routes } from "./routes";

import { lazy, Suspense } from "react";

const DashboardModule = lazy(() => import("../pages/Dashboard/DashboardModule"));
const BookingsModule = lazy(() => import("../pages/Bookings/BookingsModule"));
export const ApplicationRouter = () => {
  return (
    <Layout>
      <Suspense fallback={<div style={{ padding: 20 }}>Loading...</div>}>
        <Switch>
          <Route path="/" component={DashboardModule} />
          <Route path={routes.BOOKINGS.path} component={BookingsModule} />
          <Route path={routes.VIEW_BOOKING.path} component={BookingsModule} />
        </Switch>
      </Suspense>
    </Layout>
  );
};
