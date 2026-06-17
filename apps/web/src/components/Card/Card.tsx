import { Booking } from "../../type";
import styles from "./card.module.css";

export const Card = ({
  booking,
  className,
  onClick,
}: {
  booking?: Booking;
  className?: string;
  onClick?: () => void;
}) => {
  const classes = [styles.card, className, !booking ? styles.skeleton : ""]
    .filter(Boolean)
    .join(" ");

  const formattedDate = booking?.createdAt
    ? new Date(booking.createdAt).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : null;

  if (!booking) {
    return (
      <div className={classes} aria-hidden>
        <div className={styles.placeholderTitle} />
        <div className={styles.placeholderLine} />
      </div>
    );
  }

  return (
    <div
      className={classes}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onKeyDown={(e) => {
        if (onClick && (e.key === "Enter" || e.key === " ")) onClick();
      }}
    >
      <div className={styles.row}>
        <h3 className={styles.title}>{booking.customerName}</h3>
        <span className={styles.badge}>{booking.rideStatus}</span>
      </div>

      <p className={styles.route}>
        {booking.pickup} → {booking.dropoff}
      </p>

      <div className={styles.footer}>
        <span className={styles.date}>{formattedDate}</span>
        <button
          className={styles.cta}
          onClick={(e) => {
            e.stopPropagation();
            if (onClick) onClick();
          }}
        >
          Details
        </button>
      </div>
    </div>
  );
};

export default Card;
