import { Route, Switch } from "wouter";
import { routes } from "../../routes";
import { Bookings } from "./Bookings";
import { BookingDetailsPage } from "./BookingsDetailsPage";

const BookingsModule = () => {
  return (
    <Switch>
      <Route path={routes.BOOKINGS.path} component={Bookings} />
      <Route path={routes.VIEW_BOOKING.path} component={BookingDetailsPage} />
    </Switch>
  );
};

export default BookingsModule;
