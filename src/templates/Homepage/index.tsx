import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import "./styles.css";

function Homepage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="App">
      <header>
        <nav className="navbar">
          <div className="logo-and-title">
            <img src={logo} alt="Logo" />
            <h1>Online Library</h1>
          </div>
          {/* Navbar */}
          <button className="hamburger" onClick={handleMobileMenuToggle} aria-label="Menu">☰</button>

          <div className={`nav-items ${mobileMenuOpen ? 'active' : ''}`}>
            <ul>
              <li><button className="btn-text"><Link to="/books">Books</Link></button></li>
            </ul>
            <ul className="nav-right">
              <li><button className="btn-text sign-in-btn"><Link to="/signin">Sign In</Link></button></li>
            </ul>
          </div>
        </nav>
      </header>
     
      {/*Search input and button*/}
      <main>
        <section>          
          <div className="search-section">
            <h3>Search Books</h3>
            <p>Take a look at our wide selection of literature. We provide you with entertainment and knowledge, the most important parts of life.</p>

            <div className="search-container">
                <input type="text" className="search-input" placeholder="Enter book title..." />
                <button className="btn-primary search-button">Search Books</button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <p>© 2023 Online Library App. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Homepage;
