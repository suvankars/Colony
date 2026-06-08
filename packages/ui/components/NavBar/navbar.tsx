import styles from "./navbar.module.css"

export const NavBar = () => {
    return (
        <nav className={styles.navbar} aria-label="Main navigation">
            <div className={styles.logo}>Colony</div>
            <ul className={styles.navList}>
                <li className={styles.navItem}><a className={styles.link} href="/">Home</a></li>
                <li className={styles.navItem}><a className={styles.link} href="/about">About</a></li>
                <li className={styles.navItem}><a className={styles.link} href="/contact">Contact</a></li>
            </ul>
        </nav>
    )
}