import { NavBar, SideBar } from "@repo/ui";
import styles from "./layout.module.css";
import { useLocation } from "wouter";
import { routes } from "../../routes";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  const [, navigate] = useLocation();

  const handleNavigate = (label: string) => {
    switch (label) {
      case "Dashboard":
        navigate(routes.DASHBOARD.path);
        break;
      case "Rides":
        navigate(routes.BOOKINGS.path);
        break;
      case "Contacts":
        navigate("/contacts");
        break;
      default:
        break;
    }
  };

  return (
    <div className={styles.app}>
      <NavBar />

      <div className={styles.container}>
        <SideBar onNavigate={handleNavigate} />
        <main className={styles.main}>
          <div className={styles.card}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
