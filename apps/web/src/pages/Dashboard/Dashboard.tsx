import { useEffect, useState, useMemo } from "react";
import { Card } from "../../components/Card";
import styles from "./dashboard.module.css";
import { Booking } from "../../type";
import { routes } from "../../routes";
import { useLocation } from "wouter";
const MAX_CARDS = 4;

export const Dashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
const [, navigate] = useLocation();

  useEffect(() => {
    const controller = new AbortController();

    const getBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await fetch("http://localhost:3000/api/bookings", {
          signal: controller.signal,
        });
        if (!resp.ok) throw new Error(`${resp.status} ${resp.statusText}`);
        const data = await resp.json();
        setBookings(Array.isArray(data) ? data : []);
      } catch (err: any) {
        if (err.name === "AbortError") return;
        console.error("Error fetching bookings", err);
        setError(err.message ?? "Failed to fetch bookings");
      } finally {
        setLoading(false);
      }
    };

    getBookings();
    return () => controller.abort();
  }, []);

  const filterByStatuses = (statuses: string[]) =>
    bookings.filter(
      (b) =>
        b.rideStatus &&
        statuses.some((s) => b.rideStatus.toLowerCase().includes(s)),
    );

  const ongoingToShow = useMemo(
    () => filterByStatuses(["ongoing"]).slice(0, MAX_CARDS),
    [bookings],
  );
  const upcomingToShow = useMemo(
    () =>
      filterByStatuses(["upcoming", "scheduled", "pending", "requested"]).slice(
        0,
        MAX_CARDS,
      ),
    [bookings],
  );

  const renderCards = (list: Booking[]) => {
    if (loading)
      return Array.from({ length: MAX_CARDS }).map((_, i) => (
        <Card key={`ph-${i}`} className={styles.cardItem} />
      ));
    if (list.length === 0) return <p className={styles.empty}>No bookings</p>;
    return list.map((b) => (
      <Card
        key={b.id}
        booking={b}
        className={styles.cardItem}
        onClick={() => console.log("open", b.id)}
      />
    ));
  };
  
  const viewAllOngoing = () => {
    navigate(routes.BOOKINGS.path);
  };
  const viewAllUpcoming = () => {
    navigate(routes.BOOKINGS.path);
  };

  return (
    <div className={styles.dashboard}>
      {error && <div className={styles.error}>{error}</div>}
      <div className={styles.topRides}>
        <div className={styles.sectionHeader}>
          <h2>Ongoing Rides</h2>
          <div>
            <span className={styles.sectionMeta}>
              {ongoingToShow.length} of{" "}
              {
                bookings.filter((b) =>
                  b.rideStatus?.toLowerCase().includes("ongoing"),
                ).length
              }
            </span>
            <span className={styles.viewAll} style={{ marginLeft: 12 }} onClick={viewAllOngoing}>
              View all
            </span>
          </div>
        </div>
        <div className={styles.cardsRow}>{renderCards(ongoingToShow)}</div>
      </div>
      <div className={styles.topRides}>
        <div className={styles.sectionHeader}>
          <h2>Upcoming Rides</h2>
          <div>
            <span className={styles.sectionMeta}>
              {upcomingToShow.length} of{" "}
              {
                bookings.filter((b) =>
                  ["upcoming", "scheduled", "pending", "requested"].some((s) =>
                    b.rideStatus?.toLowerCase().includes(s),
                  ),
                ).length
              }
            </span>
            <span className={styles.viewAll} style={{ marginLeft: 12 }} onClick={viewAllUpcoming}>
              View all
            </span>
          </div>
        </div>
        <div className={styles.cardsRow}>{renderCards(upcomingToShow)}</div>
      </div>
    </div>
  );
};
