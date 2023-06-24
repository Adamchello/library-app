import { useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import UserHistoryModal from "./UserHistoryModal";

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUserHistoryModalOpen, setIsUserHistoryModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useCurrentUser();
  const navigate = useNavigate();

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const logOut = () => {
    setCurrentUser(null);
    navigate("/");
    Cookies.remove("isLogged");
  };

  return (
    <>
      <header>
        <nav className={styles.navbar}>
          <div className={styles.logoAndTitle}>
            <Link to="/">
              <h1>Online Library</h1>
            </Link>
          </div>
          <button
            className={styles.hamburger}
            onClick={handleMobileMenuToggle}
            aria-label="Menu"
          >
            ☰
          </button>

          <div
            className={`${styles.navItems} ${
              mobileMenuOpen ? styles.active : styles.deactived
            }`}
          >
            <ul>
              {currentUser === null ? (
                <li>
                  <Link to="/login">
                    <button className={styles.linkButton}>Log in</button>
                  </Link>
                </li>
              ) : (
                <>
                  <li>
                    <button
                      className={styles.linkButton}
                      onClick={() => setIsUserHistoryModalOpen(true)}
                    >
                      User history
                    </button>
                  </li>
                  {currentUser.role !== "customer" && (
                    <li>
                      <Link to="/books">
                        <button className={styles.linkButton}>Books</button>
                      </Link>
                    </li>
                  )}
                  {currentUser.role === "admin" && (
                    <li>
                      <Link to="/users">
                        <button className={styles.linkButton}>Users</button>
                      </Link>
                    </li>
                  )}
                  <li>
                    <button onClick={logOut} className={styles.linkButton}>
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </nav>
      </header>
      <UserHistoryModal
        isModalOpen={isUserHistoryModalOpen}
        closeModal={() => setIsUserHistoryModalOpen(false)}
      />
    </>
  );
}

export default Header;
