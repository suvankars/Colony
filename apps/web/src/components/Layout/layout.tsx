import { NavBar, SideBar } from "@repo/ui";
import styles from "./layout.module.css";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={styles.app}>
      <NavBar />
      
      <div className={styles.container}>
        <SideBar />
        <main className={styles.main}>
          <div className={styles.card}>{children}</div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
