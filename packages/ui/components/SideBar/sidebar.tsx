import { useState } from "react";
import styles from "./sidebar.module.css";
import {
  Home,
  Folder,
  User,
  Settings,
  LogOut,
  MoveIcon,
  PowerOffIcon,
  Smile,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const SideBar = () => {
  const [expanded, setExpanded] = useState(true);

  const links = [
    { icon: <Home size={18} />, label: "Dashboard" },
    { icon: <Folder size={18} />, label: "Rides" },
    { icon: <User size={18} />, label: "Contacts" },
  ];

  const profileLink = [
    {
      icon: <PowerOffIcon size={18} />,
      label: "Profile",
    },
    {
      icon: <Settings size={18} />,
      label: "Settings",
    },
    {
      icon: <MoveIcon size={18} />,
      label: "Switch Account",
    },
    {
      icon: <LogOut size={18} />,
      label: "Logout",
    },
  ];

  const collapaseClickHandler = () => {
    setExpanded(!expanded);
  };

  return (
    <aside className={expanded ? styles.sidebar : styles.sidebarCollapsed}>
      <div className={styles.sidebarHeader}>
        <div className={styles.sidebarLogo}>
          <Smile color="#3e9392" />
          {expanded ? <span>Dashboard</span> : ""}
        </div>
        <div className={styles.collapse} onClick={collapaseClickHandler}>
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </div>
      </div>
      <nav className={styles.sidebarNav}>
        {links.map((link) => (
          <button className={styles.sidebarLink} key={link.label}>
            {link.icon}
            {expanded ? <span>{link.label}</span> : ""}
          </button>
        ))}
      </nav>

      <nav className={styles.sidebarNav}>
        {profileLink.map((link) => (
          <button className={styles.sidebarLink} key={link.label}>
            {link.icon}
            {expanded ? <span>{link.label}</span> : ""}
          </button>
        ))}
      </nav>
    </aside>
  );
};
