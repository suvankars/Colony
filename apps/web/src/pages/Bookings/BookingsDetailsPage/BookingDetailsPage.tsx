import { useEffect, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { Booking } from "../../../type";
import styles from "./booking-details.module.css";
import { routes } from "../../../routes";

export const BookingDetailsPage = () => {
  const [match, params] = useRoute("/bookings/:id");
  const id = params?.id;
  const [, navigate] = useLocation();

  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    const fetchBooking = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch(`http://localhost:3000/api/bookings/${id}`, {
          signal: controller.signal,
        });
        if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
        const data = await resp.json();
        setBooking(data ?? null);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error(err);
        setError(err.message ?? "Failed to load booking");
      } finally {
        setLoading(false);
      }
    };
    fetchBooking();
    return () => controller.abort();
  }, [id]);

  const goBack = () => navigate(routes.DASHBOARD.path);
  

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={goBack}>
          &larr; Back
        </button>
        <h1 className={styles.title}>Booking Details</h1>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading booking…</div>
      ) : error ? (
        <div className={styles.error}>Error: {error}</div>
      ) : !booking ? (
        <div className={styles.empty}>No booking found.</div>
      ) : (
        <div className={styles.panel}>
          <div className={styles.heroMap}>
            <div className={styles.mapPlaceholder}>
              <div className={styles.mapLabel}>Map placeholder</div>
              <div className={styles.mapNote}>Show pickup & dropoff here</div>
            </div>
          </div>

          <section className={styles.detailsBox}>
            <div className={styles.details}>
              <div className={styles.row}>
                <h2 className={styles.name}>{booking.customerName}</h2>
                <span className={styles.badge}>{booking.rideStatus}</span>
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Email</div>
                <div className={styles.value}>{booking.customerEmail}</div>
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Pickup</div>
                <div className={styles.value}>{booking.pickup}</div>
              </div>

              <div className={styles.field}>
                <div className={styles.label}>Dropoff</div>
                <div className={styles.value}>{booking.dropoff}</div>
              </div>

              <div className={styles.metaRow}>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Created</div>
                  <div className={styles.metaValue}>
                    {new Date(booking.createdAt).toLocaleString()}
                  </div>
                </div>
                <div className={styles.metaItem}>
                  <div className={styles.metaLabel}>Updated</div>
                  <div className={styles.metaValue}>
                    {new Date(booking.updatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsPage;
