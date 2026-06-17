export const routes = {
  DASHBOARD: {
    path: "/"
  },
  BOOKINGS: {
    path: "/bookings"
  },
  VIEW_BOOKING: {
    path: "/bookings/:id",
    param: "id" as const,
  },
  CREATE_BOOKING: {
    path: "/bookings",
    params: {
        // Define any parameters needed for creating a booking here
    }
  }
};

export type Routes = (typeof routes)[keyof typeof routes];
